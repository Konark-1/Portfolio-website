import { NextResponse } from "next/server";
import { google } from "googleapis";

// Expected environment variables:
// - GMAIL_USER: Gmail address that sends the email
// - GMAIL_CLIENT_ID: OAuth2 client ID
// - GMAIL_CLIENT_SECRET: OAuth2 client secret
// - GMAIL_REFRESH_TOKEN: OAuth2 refresh token with Gmail scope
// - GMAIL_TO (optional): recipient address; defaults to GMAIL_USER

const gmailUser = process.env.GMAIL_USER;
const gmailClientId = process.env.GMAIL_CLIENT_ID;
const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;
const gmailTo = process.env.GMAIL_TO || gmailUser;

const oAuth2Client =
  gmailClientId && gmailClientSecret
    ? new google.auth.OAuth2(gmailClientId, gmailClientSecret)
    : null;

if (oAuth2Client && gmailRefreshToken) {
  oAuth2Client.setCredentials({ refresh_token: gmailRefreshToken });
}

function validatePayload(payload: { name?: string; email?: string; message?: string }) {
  const errors: Record<string, string> = {};

  if (!payload.name || !payload.name.trim()) {
    errors.name = "Name is required";
  }

  if (!payload.email || !payload.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Please provide a valid email";
  }

  if (!payload.message || !payload.message.trim()) {
    errors.message = "Message is required";
  } else if (payload.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

async function sendGmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  // Check configuration
  if (!gmailClientId || !gmailClientSecret) {
    throw new Error("Gmail OAuth credentials (CLIENT_ID/CLIENT_SECRET) are missing.");
  }
  
  if (!gmailRefreshToken) {
    throw new Error("Gmail REFRESH_TOKEN is missing.");
  }
  
  if (!gmailUser) {
    throw new Error("Gmail USER email is missing.");
  }

  if (!oAuth2Client) {
    throw new Error("Failed to initialize OAuth2 client.");
  }

  // Set redirect URI if not already set (required for refresh token)
  oAuth2Client.setCredentials({
    refresh_token: gmailRefreshToken,
  });

  // Get access token
  let accessTokenResponse;
  try {
    accessTokenResponse = await oAuth2Client.getAccessToken();
  } catch (error: any) {
    console.error("Error getting access token:", error);
    throw new Error(`Failed to get access token: ${error.message || "Unknown error"}`);
  }

  const accessToken =
    typeof accessTokenResponse === "string"
      ? accessTokenResponse
      : accessTokenResponse?.token;

  if (!accessToken) {
    throw new Error("Unable to obtain Gmail access token. The refresh token may be invalid or expired.");
  }

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const subject = `New contact message from ${name}`;
  const plainText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  // Properly format email according to RFC 5322
  const emailContent = [
    `From: ${gmailUser}`,
    `To: ${gmailTo || gmailUser}`,
    `Reply-To: ${email}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    plainText,
  ].join("\r\n");

  // Encode to base64url format (Gmail API requirement)
  const raw = Buffer.from(emailContent)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });
  } catch (error: any) {
    console.error("Gmail API send error:", error);
    // Provide more specific error messages
    if (error.code === 401) {
      throw new Error("Authentication failed. Please check your OAuth credentials and refresh token.");
    } else if (error.code === 403) {
      throw new Error("Permission denied. Ensure Gmail API is enabled and the refresh token has the correct scopes.");
    } else if (error.message) {
      throw new Error(`Gmail API error: ${error.message}`);
    }
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const errors = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { name, email, message } = payload as {
      name: string;
      email: string;
      message: string;
    };

    await sendGmail({ name, email, message });

    return NextResponse.json({ success: true, message: "Message sent to Gmail." });
  } catch (error: any) {
    // Log detailed error for debugging
    console.error("Contact API error:", {
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
      envCheck: {
        hasClientId: !!process.env.GMAIL_CLIENT_ID,
        hasClientSecret: !!process.env.GMAIL_CLIENT_SECRET,
        hasRefreshToken: !!process.env.GMAIL_REFRESH_TOKEN,
        hasGmailUser: !!process.env.GMAIL_USER,
      }
    });

    // Return more specific error message to help debug
    const errorMessage = error?.message || "Unable to send message right now. Please try again later.";
    
    return NextResponse.json(
      { 
        error: errorMessage,
        // Include error code if available for debugging
        ...(error?.code && { code: error.code })
      },
      { status: 500 }
    );
  }
}

