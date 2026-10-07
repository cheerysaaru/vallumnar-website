import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/newsletter/route";

afterEach(() => {
  vi.unstubAllEnvs();
});

beforeEach(() => {
  vi.stubEnv("RESEND_AUDIENCE_ID", "");
  vi.stubEnv("RESEND_API_KEY", "");
});

function newsletterRequest(body: unknown, address: string) {
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-real-ip": address },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  it("requires valid email and explicit consent", async () => {
    const missingConsent = await POST(
      newsletterRequest({ email: "reader@example.com", consent: false, website: "" }, "192.0.2.41"),
    );
    expect(missingConsent.status).toBe(400);
    expect((await missingConsent.json()).message).toContain("agree");

    const invalidEmail = await POST(
      newsletterRequest({ email: "invalid", consent: true, website: "" }, "192.0.2.42"),
    );
    expect(invalidEmail.status).toBe(400);
  });

  it("returns an explicit setup error when audience signup is not configured", async () => {
    const response = await POST(
      newsletterRequest({ email: "reader@example.com", consent: true, website: "" }, "192.0.2.43"),
    );
    expect(response.status).toBe(503);
    expect((await response.json()).message).toContain("not available");
  });

  it("limits repeated requests from the same address", async () => {
    const address = "192.0.2.44";
    for (let request = 0; request < 5; request += 1) {
      await POST(newsletterRequest({ email: "reader@example.com", consent: true, website: "" }, address));
    }
    const response = await POST(
      newsletterRequest({ email: "reader@example.com", consent: true, website: "" }, address),
    );
    expect(response.status).toBe(429);
  });
});
