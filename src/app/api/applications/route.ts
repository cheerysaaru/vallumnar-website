import { NextResponse } from "next/server";
import { applicationSchema, getFirstError, MAX_CV_BYTES } from "@/lib/validation";
import { getEmailSender, getResendClient } from "@/lib/email";
import { getClientAddress, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function jsonError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(`application:${getClientAddress(request)}`)) {
    return jsonError("Too many applications right now. Please try again later.", 429);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_CV_BYTES + 65_536) {
    return jsonError("Your application must be 5 MB or smaller.", 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("Please submit a valid application.", 400);
  }

  const candidate = form.get("cv");
  const cv = candidate instanceof File && candidate.name ? candidate : undefined;
  const parsed = applicationSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    role: form.get("role") || "General application",
    links: form.get("links") || "",
    message: form.get("message") || "",
    cv,
    website: form.get("website") || "",
  });
  if (!parsed.success) return jsonError(getFirstError(parsed.error), 400);

  if (parsed.data.website) {
    return NextResponse.json({ message: "Thanks for your interest. We'll be in touch soon." });
  }

  const cvFile = parsed.data.cv;
  if (cvFile) {
    const extension = cvFile.name.split(".").pop()?.toLowerCase();
    const extensionMatchesType =
      (extension === "pdf" && cvFile.type === "application/pdf") ||
      (extension === "doc" && cvFile.type === "application/msword") ||
      (extension === "docx" &&
        cvFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    if (!extensionMatchesType) {
      return jsonError("Please attach a PDF, DOC or DOCX file.", 400);
    }
  }

  const to = process.env.APPLICATION_EMAIL;
  if (!to || !process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return jsonError("The application form is not available just yet. Please try again later.", 503);
  }

  const text = [
    `Name: ${parsed.data.name}`,
    `Email: ${parsed.data.email}`,
    `Role: ${parsed.data.role}`,
    `Links: ${parsed.data.links || "Not provided"}`,
    "",
    parsed.data.message || "No message provided.",
  ].join("\n");

  try {
    const { error } = await getResendClient().emails.send({
      from: getEmailSender(),
      to,
      replyTo: parsed.data.email,
      subject: `Careers application: ${parsed.data.role}`,
      text,
      attachments: cvFile
        ? [
            {
              filename: cvFile.name.replace(/[^\w.-]/g, "_").slice(0, 120),
              content: Buffer.from(await cvFile.arrayBuffer()),
            },
          ]
        : undefined,
    });
    if (error) {
      console.error("Application email provider rejected a submission.", error);
      return jsonError("We couldn't send your application just now. Please try again later.", 502);
    }
  } catch (error) {
    console.error("Application email delivery failed.", error);
    return jsonError("We couldn't send your application just now. Please try again later.", 502);
  }

  return NextResponse.json({ message: "Thanks for your interest. We'll be in touch soon." });
}
