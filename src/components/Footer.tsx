"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiLinkedin, SiFacebook } from "react-icons/si";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

type Status = "idle" | "sending" | "ok" | "error";

/* Each language links to its own legal pages — they exist as separate
   routes in both languages. */
const LEGAL = {
  en: [
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms of use" },
  ],
  fr: [
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/conditions", label: "Conditions d'utilisation" },
  ],
} as const;

const COPY = {
  en: {
    stayInformed: "Stay informed",
    /* Neutral, and localised: the list is read by clinicians, but also by
       people living with an impairment, families, funders and researchers,
       and the old "you@clinic.ca" told everyone else the form was not
       for them. */
    emailPlaceholder: "you@example.ca",
    subscribe: "Subscribe",
    thanks: "Thank you",
    onList: "You are on the list.",
    sendFailed: "That did not go through. Please try again or email us directly.",
    contact: "Contact",
    emailSr: "Email",
    basedIn: "Based in",
    location: "Sherbrooke, Québec, Canada",
    legal: "Legal",
    investigational: "Investigational device",
    regulatory:
      "ExoFlex is an investigational device. It is not cleared, licensed or approved for sale by Health Canada, the U.S. Food and Drug Administration, or any other regulatory authority, and it is not available for commercial distribution. Descriptions on this site refer to device function and to validation work in progress. As the device is still in development, the images and videos showing it in use are AI-generated visualisations, not documentary footage. Nothing here is a claim of clinical benefit, treatment outcome, cure or regulatory clearance. Survey figures reflect clinician-reported perceptions, not measured clinical effectiveness. Any use of the device occurs under the supervision of a qualified clinician within an approved study protocol.",
    rights: "All rights reserved.",
  },
  fr: {
    stayInformed: "Restez informés",
    emailPlaceholder: "vous@exemple.ca",
    subscribe: "S'abonner",
    thanks: "Merci",
    onList: "Vous êtes sur la liste.",
    sendFailed: "L'envoi a échoué. Réessayez ou écrivez-nous directement.",
    contact: "Contact",
    emailSr: "Courriel",
    basedIn: "Établis à",
    location: "Sherbrooke (Québec), Canada",
    legal: "Mentions légales",
    investigational: "Appareil expérimental",
    regulatory:
      "ExoFlex est un appareil expérimental. Il n'est ni homologué, ni autorisé, ni approuvé pour la vente par Santé Canada, la Food and Drug Administration des États-Unis ou toute autre autorité réglementaire, et il n'est pas offert en distribution commerciale. Les descriptions de ce site portent sur le fonctionnement de l'appareil et sur des travaux de validation en cours. L'appareil étant en cours de développement, les images et les vidéos qui le montrent en usage sont des visualisations générées par intelligence artificielle, et non des enregistrements documentaires. Rien ici ne constitue une allégation de bénéfice clinique, de résultat thérapeutique, de guérison ou d'homologation. Les chiffres de sondage reflètent des perceptions rapportées par des cliniciens, et non une efficacité clinique mesurée. Toute utilisation de l'appareil se fait sous la supervision d'un clinicien qualifié, dans le cadre d'un protocole d'étude approuvé.",
    rights: "Tous droits réservés.",
  },
} as const;

/**
 * Footer.
 *
 * The old revision animated itself in on every route change and swallowed
 * newsletter failures into `console.error`, so a visitor whose submission
 * failed saw nothing at all. This one reports outcome in a live region and
 * drops the entrance animation — a footer does not need to be revealed.
 */
export default function Footer() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    try {
      /* Through our own route, not straight to a provider from the browser:
         this used to POST to HubSpot client-side, which put the portal and form
         IDs in the bundle and, once that portal stopped accepting submissions,
         failed on every visitor with nothing on the server to show it. */
      const rsp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "subscribe", email }),
      });
      if (!rsp.ok) throw new Error(String(rsp.status));
      setStatus("ok");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("[newsletter] submission failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <footer className="tone-film border-t border-hair px-4 pb-10 pt-[clamp(3.5rem,8vh,6rem)] md:px-6">
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* brand + newsletter */}
          <div>
            <Image
              src="/images/logo.png"
              alt="ExoFlex"
              width={132}
              height={40}
              className="h-9 w-auto"
            />

            <form onSubmit={handleSubmit} className="mt-8 max-w-sm">
              <label htmlFor="newsletter-email" className="label block">
                {t.stayInformed}
              </label>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-hair-strong bg-raised p-1 focus-within:border-accent-ink">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  /* text-base below md: at text-sm iOS Safari zooms the page
                     into any focused field under 16px, and the visitor has to
                     pinch back out after subscribing. */
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-base text-ink outline-none placeholder:text-slate md:text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "sending" || status === "ok"}
                  className={cn(
                    "shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-medium text-on-ink",
                    "min-h-11 md:min-h-0",
                    "transition-colors duration-200 hover:bg-accent-ink",
                    "disabled:cursor-not-allowed disabled:opacity-60"
                  )}
                >
                  {status === "sending" ? "…" : status === "ok" ? t.thanks : t.subscribe}
                </button>
              </div>
              <p className="label label--plain mt-2 min-h-5 text-slate" role="status" aria-live="polite">
                {status === "error" ? t.sendFailed : status === "ok" ? t.onList : ""}
              </p>
            </form>

            <div className="mt-8 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/exoflex/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ExoFlex on LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full text-slate transition-colors hover:bg-ink/6 hover:text-ink"
              >
                <SiLinkedin aria-hidden className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/exoflex66"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ExoFlex on Facebook"
                className="grid h-11 w-11 place-items-center rounded-full text-slate transition-colors hover:bg-ink/6 hover:text-ink"
              >
                <SiFacebook aria-hidden className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* contact */}
          <div>
            <p className="label">{t.contact}</p>
            <dl className="mt-4 space-y-4 text-[length:var(--t-body)]">
              <div>
                <dt className="sr-only">{t.emailSr}</dt>
                <dd>
                  <a
                    href="mailto:info@exoflex.ca"
                    className="text-accent-ink underline decoration-hair-strong underline-offset-4 transition-colors hover:decoration-accent-ink"
                  >
                    info@exoflex.ca
                  </a>
                </dd>
              </div>
              <div>
                {/* TODO: confirm the Sherbrooke street address. The previous
                    entry (1672 Rue de l'Islet, Quebec City) predates the move. */}
                <dt className="label mb-1">{t.basedIn}</dt>
                <dd className="text-slate">{t.location}</dd>
              </div>
            </dl>
          </div>

          {/* legal */}
          <div>
            <p className="label">{t.legal}</p>
            <ul className="mt-4 space-y-3">
              {LEGAL[lang].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[length:var(--t-body)] text-slate transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory footing. The device is pre-market, the survey figures
            measure perception rather than outcomes, and nothing on the site may
            read as a claim of clinical benefit or of clearance. */}
        <div className="mt-[clamp(3rem,7vh,5rem)] border-t border-hair pt-6">
          <p className="label mb-3">{t.investigational}</p>
          <p className="max-w-[80ch] text-xs leading-relaxed text-slate">
            {t.regulatory}
          </p>
          <p className="label label--plain mt-6 text-slate">
            © {new Date().getFullYear()} ExoFlex Inc. {t.rights}
          </p>
        </div>

      </div>
    </footer>
  );
}
