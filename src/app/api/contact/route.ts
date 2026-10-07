import { NextResponse } from "next/server";
import { contactSchema, getFirstError } from "@/lib/validation";
import { getEmailSender, getResendClient } from "@/lib/email";
import { getClientAddress, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(`contact:${getClientAddress(request)}`)) {
    return NextResponse.json(
      { message: "Too many messages right now. Please try again later." },
      { status: 429 },
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit a valid message." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ message: getFirstError(parsed.error) }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: "Thanks for getting in touch." });
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to || !process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return NextResponse.json(
      { message: "The contact form is not available just yet. Please check back soon." },
      { status: 503 },
    );
  }

  try {
    const { error } = await getResendClient().emails.send({
      from: getEmailSender(),
      to,
      replyTo: parsed.data.email,
      subject: `Website enquiry: ${parsed.data.subject}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Subject: ${parsed.data.subject}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });
    if (error) {
      console.error("Contact email provider rejected a message.", error);
      return NextResponse.json(
        { message: "We couldn't send your message just now. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact email delivery failed.", error);
    return NextResponse.json(
      { message: "We couldn't send your message just now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thanks for getting in touch. We'll be in touch soon." });
}
