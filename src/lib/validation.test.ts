import { describe, expect, it } from "vitest";
import {
  ACCEPTED_CV_TYPES,
  applicationSchema,
  contactSchema,
  MAX_CV_BYTES,
  newsletterSchema,
} from "@/lib/validation";

describe("contactSchema", () => {
  it("accepts a complete valid enquiry", () => {
    expect(
      contactSchema.safeParse({
        name: "Riley Example",
        email: "riley@example.com",
        subject: "A product question",
        message: "I'd like to learn more.",
        website: "",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid email addresses and populated honeypots", () => {
    expect(
      contactSchema.safeParse({
        name: "Riley",
        email: "not-an-email",
        subject: "Hello",
        message: "A message",
        website: "",
      }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({
        name: "Riley",
        email: "riley@example.com",
        subject: "Hello",
        message: "A message",
        website: "spam",
      }).success,
    ).toBe(false);
  });
});

describe("applicationSchema", () => {
  it("accepts an application with an optional valid portfolio URL", () => {
    expect(
      applicationSchema.safeParse({
        name: "Jordan Example",
        email: "jordan@example.com",
        role: "General application",
        links: "https://example.com",
        message: "",
        cv: undefined,
        website: "",
      }).success,
    ).toBe(true);
  });

  it("rejects malformed portfolio URLs", () => {
    expect(
      applicationSchema.safeParse({
        name: "Jordan",
        email: "jordan@example.com",
        role: "General application",
        links: "example.com",
        message: "",
        cv: undefined,
        website: "",
      }).success,
    ).toBe(false);
  });

  it("limits CV uploads to five megabytes and approved document formats", () => {
    expect(MAX_CV_BYTES).toBe(5 * 1024 * 1024);
    expect(ACCEPTED_CV_TYPES.has("application/pdf")).toBe(true);
    expect(ACCEPTED_CV_TYPES.has("image/png")).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("requires a valid address and explicit consent", () => {
    expect(
      newsletterSchema.safeParse({
        email: "reader@example.com",
        consent: true,
        website: "",
      }).success,
    ).toBe(true);
    expect(
      newsletterSchema.safeParse({
        email: "reader@example.com",
        consent: false,
        website: "",
      }).success,
    ).toBe(false);
  });
});
