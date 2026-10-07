import { Resend } from "resend";

let resendClient: Resend | undefined;

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");
  resendClient ??= new Resend(apiKey);
  return resendClient;
}

export function getEmailSender(): string {
  const sender = process.env.EMAIL_FROM;
  if (!sender) throw new Error("EMAIL_FROM is not configured.");
  return sender;
}
