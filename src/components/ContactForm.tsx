"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

type Status = "idle" | "sending" | "ok" | "error";

/* Each enquiry type carries its own role hint, message prompt and submit
   verb — the three tabs must not read as the same form. */
const INTERESTS = [
  {
    value: "clinical",
    label: { en: "Clinical partnership", fr: "Partenariat clinique" },
    rolePlaceholder: {
      en: "Physiotherapist, clinic director, OT…",
      fr: "Physiothérapeute, direction de clinique, ergothérapeute…",
    },
    message: { en: "What would you like to see", fr: "Que voudriez-vous voir" },
    submit: { en: "Request a clinical demonstration", fr: "Demander une démonstration clinique" },
  },
  {
    value: "investment",
    label: { en: "Investment", fr: "Investissement" },
    rolePlaceholder: {
      en: "Analyst, partner, fund, family office…",
      fr: "Analyste, associé, fonds, family office…",
    },
    message: { en: "Tell us about your interest", fr: "Parlez-nous de votre intérêt" },
    submit: { en: "Start the discussion", fr: "Amorcer la discussion" },
  },
  {
    value: "general",
    label: { en: "General", fr: "Général" },
    rolePlaceholder: {
      en: "Clinician, researcher, journalist…",
      fr: "Clinicien, chercheur, journaliste…",
    },
    message: { en: "Your message", fr: "Votre message" },
    submit: { en: "Send the message", fr: "Envoyer le message" },
  },
] as const;

const COPY = {
  en: {
    legend: "Nature of enquiry",
    firstname: "First name",
    lastname: "Last name",
    role: "Role",
    institution: "Institution",
    email: "Email",
    sending: "Sending…",
    thanks: "Thank you. We will be in touch.",
    /* One sentence per language rather than a prefix plus a detail: the detail
       used to be the provider's raw response, and a hardcoded separator put a
       French space before the colon in English. */
    error: "That did not go through. Please try again, or email us directly.",
  },
  fr: {
    legend: "Nature de la demande",
    firstname: "Prénom",
    lastname: "Nom",
    role: "Rôle",
    institution: "Établissement",
    email: "Courriel",
    sending: "Envoi…",
    thanks: "Merci. Nous vous écrirons.",
    error: "L'envoi a échoué. Réessayez, ou écrivez-nous directement.",
  },
} as const;

const fieldClass =
  "w-full border-0 border-b border-hair-strong bg-transparent px-0 py-3 " +
  "text-[length:var(--t-body)] text-ink outline-none transition-colors " +
  "placeholder:text-slate focus:border-accent-ink";

export default function ContactForm() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState<(typeof INTERESTS)[number]["value"]>("clinical");
  const sel = INTERESTS.find((i) => i.value === interest) ?? INTERESTS[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formEl = e.currentTarget;
    const payload = Object.fromEntries(new FormData(formEl).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, kind: "enquiry" }),
      });

      if (!res.ok) throw new Error(String(res.status));

      setStatus("ok");
      formEl.reset();

      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      /* The visitor gets the translated fallback, never the response body: the
         previous revision put `await res.text()` on screen, so while the mail
         integration was broken every visitor read a dump of provider JSON.
         The detail belongs in the server log, which the route writes. */
      console.error("[contact form] submission failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* One selector rather than three competing buttons. */}
      <fieldset className="border-0 p-0">
        <legend className="label mb-4 p-0">{t.legend}</legend>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {INTERESTS.map((i) => (
            <label key={i.value} className="group cursor-pointer">
              <input
                type="radio"
                name="interest"
                value={i.value}
                checked={interest === i.value}
                onChange={() => setInterest(i.value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "label label--plain border-b border-transparent pb-1 transition-colors",
                  "group-hover:text-ink",
                  "peer-checked:border-accent-ink peer-checked:text-ink",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4"
                )}
              >
                {i.label[lang]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="firstname" className="label block">
            {t.firstname}
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            autoComplete="given-name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="lastname" className="label block">
            {t.lastname}
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            autoComplete="family-name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="role" className="label block">
            {t.role}
          </label>
          <input
            id="role"
            name="role"
            type="text"
            autoComplete="organization-title"
            placeholder={sel.rolePlaceholder[lang]}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="institution" className="label block">
            {t.institution}
          </label>
          <input
            id="institution"
            name="institution"
            type="text"
            autoComplete="organization"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label block">
          {t.email} <span className="text-accent-ink">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="label block">
          {sel.message[lang]} <span className="text-accent-ink">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={cn(fieldClass, "resize-y leading-relaxed")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={status === "sending" || status === "ok"}
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5",
            "text-sm font-medium text-on-ink",
            "transition-colors duration-200 hover:bg-accent-ink",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {status === "sending" ? t.sending : status === "ok" ? t.thanks : sel.submit[lang]}
          {status === "idle" && <span aria-hidden="true">→</span>}
        </button>

        <p className="label label--plain text-slate" role="status" aria-live="polite">
          {status === "error" ? t.error : ""}
        </p>
      </div>
    </form>
  );
}
