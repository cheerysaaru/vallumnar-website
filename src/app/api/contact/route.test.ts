import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

afterEach(() => {
  vi.unstubAllEnvs();
});

beforeEach(() => {
  vi.stubEnv("CONTACT_EMAIL", "");
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("EMAIL_FROM", "");
});

function contactRequest(body: unknown, address: string) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": address,
    },
    body: JSON.stringify(body),
  });
}

const validContact = {
  name: "Taylor Example",
  email: "taylor@example.com",
  subject: "An enquiry",
  message: "I'd like to discuss a project.",
  website: "",
};

describe("POST /api/contact", () => {
  it("rejects malformed input before attempting email delivery", async () => {
    const response = await POST(
      contactRequest({ ...validContact, email: "bad" }, "192.0.2.21"),
    );
    expect(response.status).toBe(400);
    expect((await response.json()).message).toContain("email");
  });

  it("returns an explicit setup error when email delivery is not configured", async () => {
    const response = await POST(contactRequest(validContact, "192.0.2.22"));
    expect(response.status).toBe(503);
    expect((await response.json()).message).toContain("not available");
  });

  it("limits repeated requests from the same address", async () => {
    const address = "192.0.2.23";
    for (let request = 0; request < 5; request += 1) {
      await POST(contactRequest(validContact, address));
    }
    const response = await POST(contactRequest(validContact, address));
    expect(response.status).toBe(429);
  });
});
