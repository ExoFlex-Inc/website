import Section from "@/components/Section"

/**
 * Clinician voices, one per view, with the attribution set large in the way a
 * printed interview credits its subject.
 *
 * IMPORTANT — these are bracketed placeholders on purpose. Publishing invented
 * attributed quotes for a medical device is both a credibility and a regulatory
 * problem, so the intended theme is stated instead of a fabricated sentence.
 * Replace `quote` with real, consent-given wording and set `pending` to false.
 */
type Voice = {
  quote: string
  role: string
  setting: string
  pending: boolean
}

const VOICES: Voice[] = [
  {
    quote:
      "Intended theme — the device sustains the patient's own effort rather than replacing it, and the therapist can see that in the session data.",
    role: "Physiotherapist",
    setting: "Inpatient neurological rehabilitation",
    pending: true,
  },
  {
    quote:
      "Intended theme — what changes for a caseload when high-repetition practice can continue after discharge.",
    role: "Occupational therapist",
    setting: "Outpatient neuro clinic",
    pending: true,
  },
  {
    quote:
      "Intended theme — fit with existing workflow, setup time, and what a clinic director needs before adopting a new device.",
    role: "Clinical director",
    setting: "Private rehabilitation group",
    pending: true,
  },
]

export default function Voices() {
  return (
    <Section id="clinicians" label="Clinicians" tone="sunk">
      <h2 className="label">What clinicians say</h2>

      <div className="mt-4 divide-y divide-hair-strong">
        {VOICES.map((v) => (
          <figure key={v.role + v.setting} className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-16">
            <blockquote>
              {v.pending && (
                <span className="label label--accent mb-5 inline-block border border-hair-strong px-2 py-1">
                  Placeholder · pending clinician review
                </span>
              )}
              <p
                className={`display text-[length:var(--t-h3)] leading-snug ${
                  v.pending ? "display-italic text-slate" : ""
                }`}
                style={{ maxWidth: "38ch" }}
              >
                {v.quote}
              </p>
            </blockquote>

            <figcaption className="lg:pt-2">
              <p className="text-xl font-semibold uppercase leading-tight tracking-tight">
                {v.role}
              </p>
              <p className="label label--plain mt-2 text-slate" style={{ maxWidth: "26ch" }}>
                {v.setting}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
