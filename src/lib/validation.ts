import { z } from "zod";

const requiredText = (label: string, max: number) =>
  z.string().trim().min(1, `${label} is required`).max(max);

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === "" || z.string().url().safeParse(value).success, {
    message: "Enter a valid link, including https://",
  });

export const MAX_CV_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const cvSchema = z
  .file()
  .min(1, "Your CV file cannot be empty.")
  .max(MAX_CV_BYTES, "Your CV must be 5 MB or smaller.")
  .mime([...ACCEPTED_CV_TYPES], "Please attach a PDF, DOC or DOCX file.")
  .optional();

export const contactSchema = z.object({
  name: requiredText("Name", 100),
  email: z.string().trim().email("Enter a valid email address").max(254),
  subject: requiredText("Subject", 150),
  message: requiredText("Message", 5000),
  website: z.string().max(0).optional(),
});

export const applicationSchema = z.object({
  name: requiredText("Name", 100),
  email: z.string().trim().email("Enter a valid email address").max(254),
  role: z.string().trim().max(120).default("General application"),
  links: optionalUrl,
  message: z.string().trim().max(5000).default(""),
  cv: cvSchema,
  website: z.string().max(0).optional(),
});

export function getFirstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Check the form fields and try again.";
}
