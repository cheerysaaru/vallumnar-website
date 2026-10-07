"use client";

import { useState, type FormEvent } from "react";
import { contactSchema, getFirstError } from "@/lib/validation";

type FormState = { kind: "success" | "error"; text: string } | null;

export function ContactForm() {
  const [state, setState] = useState<FormState>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(null);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
    };
    const validation = contactSchema.safeParse(values);
    if (!validation.success) {
      setState({ kind: "error", text: getFirstError(validation.error) });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message || "Your message could not be sent.");
      setState({ kind: "success", text: payload.message ?? "Thanks for getting in touch." });
      formElement.reset();
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
    <form className="form-card card" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label className="field">
          Name
          <input autoComplete="name" maxLength={100} name="name" required />
        </label>
        <label className="field">
          Work email
          <input autoComplete="email" maxLength={254} name="email" type="email" required />
        </label>
        <label className="field field-wide">
          What can we help with?
          <input maxLength={150} name="subject" required />
        </label>
        <label className="field field-wide">
          A little more about it
          <textarea maxLength={5000} name="message" rows={5} required />
        </label>
        <label className="honeypot" aria-hidden="true">
          Leave this field empty
          <input autoComplete="off" name="website" tabIndex={-1} />
        </label>
      </div>
      {state ? (
        <p className="form-message" data-kind={state.kind} role="status">
          {state.text}
        </p>
      ) : null}
      <button className="button" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">We&apos;ll only use your details to respond to your enquiry.</p>
    </form>
  );
}
