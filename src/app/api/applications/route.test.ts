import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { MAX_CV_BYTES } from "@/lib/validation";
import { POST } from "@/app/api/applications/route";

afterEach(() => {
  vi.unstubAllEnvs();
});

beforeEach(() => {
  vi.stubEnv("APPLICATION_EMAIL", "");
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("EMAIL_FROM", "");
});

function applicationRequest(fields: Record<string, string>, address: string) {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  return new Request("http://localhost/api/applications", {
    method: "POST",
    headers: { "x-real-ip": address },
    body: form,
  });
}

const validApplication = {
  name: "Casey Example",
  email: "casey@example.com",
  role: "General application",
  links: "",
  message: "I enjoy building thoughtful software.",
  website: "",
};

describe("POST /api/applications", () => {
  it("rejects malformed application fields", async () => {
    const response = await POST(
      applicationRequest({ ...validApplication, email: "bad" }, "192.0.2.31"),
    );
    expect(response.status).toBe(400);
    expect((await response.json()).message).toContain("email");
  });

  it("rejects unsupported CV types", async () => {
    const form = new FormData();
    for (const [key, value] of Object.entries(validApplication)) form.set(key, value);
    form.set("cv", new File(["not a CV"], "notes.txt", { type: "text/plain" }));
    const response = await POST(
      new Request("http://localhost/api/applications", {
        method: "POST",
        headers: { "x-real-ip": "192.0.2.32" },
        body: form,
      }),
    );
    expect(response.status).toBe(400);
    expect((await response.json()).message).toContain("PDF, DOC or DOCX");
  });

  it("returns an explicit setup error when email delivery is not configured", async () => {
    const response = await POST(applicationRequest(validApplication, "192.0.2.33"));
    expect(response.status).toBe(503);
    expect((await response.json()).message).toContain("not available");
  });

  it("rejects uploads larger than the configured CV limit", async () => {
    const form = new FormData();
    for (const [key, value] of Object.entries(validApplication)) form.set(key, value);
    form.set(
      "cv",
      new File([new Uint8Array(MAX_CV_BYTES + 1)], "resume.pdf", { type: "application/pdf" }),
    );
    const response = await POST(
      new Request("http://localhost/api/applications", {
        method: "POST",
        headers: {
          "x-real-ip": "192.0.2.34",
          "content-length": String(MAX_CV_BYTES + 65_537),
        },
        body: form,
      }),
    );
    expect(response.status).toBe(413);
  });
});
