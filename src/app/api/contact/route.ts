import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

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

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: "Email service not configured. Please set RESEND_API_KEY." },
        { status: 500 }
      );
    }

    if (!toEmail) {
      return NextResponse.json(
        { error: "Recipient email not configured. Please set CONTACT_TO_EMAIL." },
        { status: 500 }
      );
    }

    const payload = await request.json();
    const errors = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { name, email, message } = payload as { name: string; email: string; message: string };

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New contact message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 500 }
    );
  }
}

