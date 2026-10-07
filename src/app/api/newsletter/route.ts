import { NextResponse } from "next/server";
import { newsletterSchema, getFirstError } from "@/lib/validation";
import { getResendClient } from "@/lib/email";
import { getClientAddress, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(`newsletter:${getClientAddress(request)}`)) {
    return NextResponse.json(
      { message: "Too many requests right now. Please try again later." },
      { status: 429 },
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ message: getFirstError(parsed.error) }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: "Thanks for signing up." });
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId || !process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { message: "Newsletter signup is not available just yet. Please check back soon." },
      { status: 503 },
    );
  }

  try {
    const { error } = await getResendClient().contacts.create({
      email: parsed.data.email,
      unsubscribed: false,
      audienceId,
    });
    if (error) {
      if (error.name === "validation_error" && /already exists/i.test(error.message)) {
        return NextResponse.json({ message: "You're already on the list. Thanks for your interest." });
      }
      console.error("Newsletter provider rejected a subscription.", error);
      return NextResponse.json(
        { message: "We couldn't save your signup just now. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Newsletter subscription failed.", error);
    return NextResponse.json(
      { message: "We couldn't save your signup just now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thanks for signing up. You're on the list." });
}
