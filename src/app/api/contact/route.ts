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
  if (!oAuth2Client || !gmailUser || !gmailTo || !gmailRefreshToken) {
    throw new Error("Gmail OAuth is not fully configured on the server.");
  }

  const accessTokenResponse = await oAuth2Client.getAccessToken();
  const accessToken =
    typeof accessTokenResponse === "string"
      ? accessTokenResponse
      : accessTokenResponse?.token;

  if (!accessToken) {
    throw new Error("Unable to obtain Gmail access token.");
  }

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const subject = `New contact message from ${name}`;
  const plainText = `Name: ${name}
Email: ${email}

Message:
${message}`;

  const rawLines = [
    `From: ${name} <${gmailUser}>`,
    `To: ${gmailTo}`,
    `Reply-To: ${email}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "",
    plainText,
  ];

  const raw = Buffer.from(rawLines.join("\n"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });
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
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 500 }
    );
  }
}

