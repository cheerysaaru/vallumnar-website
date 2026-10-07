"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getFirstError, newsletterSchema } from "@/lib/validation";

type FormState = { kind: "success" | "error"; text: string } | null;

export function NewsletterForm() {
  const [state, setState] = useState<FormState>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const validation = newsletterSchema.safeParse({
      email: String(data.get("email") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    });
    if (!validation.success) {
      setState({ kind: "error", text: getFirstError(validation.error) });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message || "We couldn't sign you up.");
      setState({ kind: "success", text: payload.message ?? "You're on the list." });
      form.reset();
    } catch (error) {
      setState({
        kind: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="newsletter-form" onSubmit={submit} noValidate>
      <div className="newsletter-input-row">
        <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" autoComplete="email" maxLength={254} name="email" type="email" placeholder="Your email address" required />
        <button type="submit" aria-label="Subscribe to the newsletter" disabled={pending}>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
      <label className="newsletter-consent">
        <input type="checkbox" name="consent" required />
        <span>{siteConfig.newsletterConsent}</span>
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      {state ? <p className="newsletter-message" data-kind={state.kind} role="status">{state.text}</p> : null}
    </form>
  );
}
