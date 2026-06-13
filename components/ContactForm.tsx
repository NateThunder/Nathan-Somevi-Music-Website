"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; theme?: "light" | "dark" | "auto" }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type FormState =
  | { kind: "idle"; message: string | null }
  | { kind: "submitting"; message: string | null }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const initialState: FormState = { kind: "idle", message: null };

export default function ContactForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!turnstileSiteKey || turnstileWidgetIdRef.current) return;

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || turnstileWidgetIdRef.current) return;
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        theme: "dark",
      });
    };

    const scriptId = "cloudflare-turnstile-script";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      renderTurnstile();
      existingScript.addEventListener("load", renderTurnstile);
      return () => existingScript.removeEventListener("load", renderTurnstile);
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderTurnstile);
    document.head.appendChild(script);

    return () => script.removeEventListener("load", renderTurnstile);
  }, [turnstileSiteKey]);

  const resetTurnstile = () => {
    if (turnstileWidgetIdRef.current) {
      window.turnstile?.reset(turnstileWidgetIdRef.current);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      enquiryType: formData.get("enquiryType"),
      eventDate: formData.get("eventDate"),
      location: formData.get("location"),
      message: formData.get("message"),
      botField: formData.get("botField"),
      source: formData.get("source"),
      turnstileToken: formData.get("cf-turnstile-response"),
    };

    setFormState({ kind: "submitting", message: "Sending enquiry..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null;

      if (!response.ok) {
        resetTurnstile();
        setFormState({
          kind: "error",
          message: body?.error ?? "We could not send that enquiry. Please try again.",
        });
        return;
      }

      form.reset();
      resetTurnstile();
      setFormState({
        kind: "success",
        message: "Thanks. Your enquiry has been sent and should land with Nathan's team shortly.",
      });
    } catch {
      resetTurnstile();
      setFormState({
        kind: "error",
        message: "We could not send that enquiry. Please try again.",
      });
    }
  };

  const statusTone =
    formState.kind === "success"
      ? "border-[#e7aa35]/40 bg-[#e7aa35]/10 text-[#e7aa35]"
      : formState.kind === "error"
        ? "border-[#e7aa35]/40 bg-[#e7aa35]/10 text-[#e7aa35]"
        : "border-[#e7aa35]/25 bg-[#e7aa35]/10 text-[#e7aa35]/80";

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form-light rounded-[8px] border border-[#e7aa35]/30 bg-[#17120b] px-5 py-6 text-[#e7aa35] shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-6"
    >
      <div className="form-grid">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="enquiryType">Enquiry Type</label>
          <select id="enquiryType" name="enquiryType" defaultValue="" required>
            <option value="" disabled>
              Select enquiry type
            </option>
            <option value="booking">Booking</option>
            <option value="collaboration">Collaboration</option>
            <option value="press">Press</option>
            <option value="general">General</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventDate">Event Date</label>
          <input id="eventDate" name="eventDate" type="date" />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input id="location" name="location" type="text" autoComplete="address-level2" />
        </div>
        <div className="span-2">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required />
        </div>
        <div aria-hidden="true" className="hidden">
          <label htmlFor="botField">Leave this field empty</label>
          <input id="botField" name="botField" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="source" value="website" />
      </div>

      {turnstileSiteKey ? <div ref={turnstileRef} className="mt-5 min-h-[65px]" /> : null}

      {formState.message ? (
        <div className={`mt-5 rounded-[8px] border px-4 py-3 text-sm leading-6 ${statusTone}`}>{formState.message}</div>
      ) : null}

      <button
        type="submit"
        disabled={formState.kind === "submitting"}
        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[#e7aa35] px-5 text-sm font-extrabold uppercase tracking-[0.16em] text-black hover:bg-white disabled:cursor-wait disabled:opacity-70"
      >
        {formState.kind === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
