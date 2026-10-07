"use client";

import { useState, type FormEvent } from "react";
import { applicationSchema, getFirstError } from "@/lib/validation";

type FormState = { kind: "success" | "error"; text: string } | null;

export function ApplicationForm({ roles }: { roles: string[] }) {
  const [state, setState] = useState<FormState>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = form.querySelector<HTMLInputElement>('input[name="cv"]')?.files?.[0];
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      role: String(formData.get("role") ?? "General application"),
      links: String(formData.get("links") ?? ""),
      message: String(formData.get("message") ?? ""),
      cv: file?.name ? file : undefined,
      website: String(formData.get("website") ?? ""),
    };
    const validation = applicationSchema.safeParse(values);
    if (!validation.success) {
      setState({ kind: "error", text: getFirstError(validation.error) });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/applications", { method: "POST", body: new FormData(form) });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message || "Your application could not be sent.");
      setState({ kind: "success", text: payload.message ?? "Thanks for your interest." });
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
    <form className="form-card card" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label className="field">
          Name
          <input autoComplete="name" maxLength={100} name="name" required />
        </label>
        <label className="field">
          Email
          <input autoComplete="email" maxLength={254} name="email" type="email" required />
        </label>
        <label className="field field-wide">
          Role
          <select defaultValue={roles[0] ?? "General application"} name="role">
            {roles.length ? roles.map((role) => <option key={role}>{role}</option>) : null}
            {!roles.length ? <option>General application</option> : null}
          </select>
        </label>
        <label className="field field-wide">
          Portfolio or profile link
          <input name="links" type="url" placeholder="https://" maxLength={500} />
        </label>
        <label className="field field-wide">
          CV or resume <span className="field-optional">(optional)</span>
          <input
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            name="cv"
            type="file"
          />
          <span className="field-help">PDF, DOC or DOCX · up to 5 MB</span>
        </label>
        <label className="field field-wide">
          A note about yourself
          <textarea name="message" rows={5} maxLength={5000} />
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
        {pending ? "Sending…" : "Send your details"} <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">Your information is used only to consider your application.</p>
    </form>
  );
}
