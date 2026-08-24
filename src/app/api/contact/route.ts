import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact submissions, delivered as email. (The footer newsletter that also
 * posted here was removed 2026-08-24 at the owner's request — the subscribe
 * branch went with it.)
 *
 * Replaces the HubSpot Forms integration, which had been failing silently on
 * every submission: the portal answered "Portal isn't allowed to post
 * submissions", so nothing a visitor sent ever arrived anywhere.
 *
 * The sender's own address goes in Reply-To, so answering the notification
 * answers the person rather than the robot.
 *
 * Configuration (see .env.example): RESEND_API_KEY is required. CONTACT_FROM
 * must be an address on a domain verified in Resend — until exoflex.ca is
 * verified, Resend rejects it, and the fallback is their sandbox sender, which
 * can only deliver to the Resend account's own address.
 */

const TO = process.env.CONTACT_TO || "info@exoflex.ca";
const FROM = process.env.CONTACT_FROM || "ExoFlex <site@exoflex.ca>";

const INTEREST_LABELS: Record<string, string> = {
  clinical: "Partenariat clinique",
  investment: "Investissement",
  general: "Demande générale",
};

/* Deliberately loose: the point is to reject junk and typos, not to police
   what is a valid address — RFC 5322 in a regex is a well-known trap, and the
   real proof of an address is that a reply reaches it. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims, caps length, and drops CR/LF so nothing can inject a mail header. */
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

const escape = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  /* ponytail: no rate limit. This endpoint is public and sends mail, so it is
     an abuse vector; Resend's own monthly quota is the only ceiling today. Add
     a real limiter (Upstash, or the platform's edge middleware) the first time
     it gets hit. */
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = clean(body.email, 200);

  if (!EMAIL.test(email)) {
    return NextResponse.json({ ok: false, field: "email" }, { status: 400 });
  }

  const fields = [
    ["Nature", INTEREST_LABELS[clean(body.interest, 40)] ?? clean(body.interest, 40)],
    ["Nom", [clean(body.firstname, 100), clean(body.lastname, 100)].filter(Boolean).join(" ")],
    ["Rôle", clean(body.role, 200)],
    ["Établissement", clean(body.institution, 200)],
    ["Courriel", email],
  ];

  /* The message is the only field allowed to keep its line breaks. */
  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!message) {
    return NextResponse.json({ ok: false, field: "message" }, { status: 400 });
  }

  const rows = fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  const text = `${rows.join("\n")}\n\n${message}`;

  const subject = `${INTEREST_LABELS[clean(body.interest, 40)] ?? "Demande"} — ${
    [clean(body.firstname, 100), clean(body.lastname, 100)].filter(Boolean).join(" ") || email
  }`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set — submission dropped:", { email });
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const { error } = await new Resend(key).emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject,
      text,
      html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escape(text)}</pre>`,
    });

    if (error) {
      /* Server-side only. The visitor gets a generic failure: the previous
         revision threw the provider's raw JSON up into the page, so a broken
         integration showed the visitor a stack of API internals. */
      console.error("[contact] Resend rejected the send:", error);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] send threw:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
