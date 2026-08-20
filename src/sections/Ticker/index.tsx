"use client"

import Image from "next/image"
import { useLang, type Lang } from "@/lib/i18n"

/**
 * The clinical-partner marquee, sitting under Validation inside the page's
 * closing film register (motion band → evidence → here → milestones →
 * contact, all on the same dark ground). The same trimmed logo PNGs the
 * Evidence section used to show statically, as one slow kinetic line — the
 * marks appear exactly once on the page.
 *
 * The logos are dark marks drawn for a light ground, so on film they run
 * through grayscale + invert to read as light marks.
 *
 * Pure CSS motion (`.ticker-track` in globals.css). Under reduced motion the
 * track stops, the duplicate copy hides and the row wraps, centered — the
 * information survives, only the motion goes. The first copy keeps real alt
 * text; the loop duplicate is aria-hidden.
 */
const PARTNERS = [
  { src: "/images/partners/villa-medica.png", alt: "Villa Medica, hôpital de réadaptation", w: 242, h: 240, dh: 46 },
  { src: "/images/partners/uds.png", alt: "Université de Sherbrooke", w: 1044, h: 240, dh: 30 },
]

const LABEL: Record<Lang, string> = {
  en: "Research base and clinical partners",
  fr: "Base de recherche et partenaires cliniques",
}

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={
        "flex shrink-0 items-center gap-x-14 pr-14" + (hidden ? " ticker-dup" : "")
      }
    >
      {PARTNERS.map((p) => (
        <li key={p.src} className="shrink-0">
          <Image
            src={p.src}
            alt={hidden ? "" : p.alt}
            width={p.w}
            height={p.h}
            className="w-auto opacity-80 grayscale invert"
            style={{ height: p.dh }}
          />
        </li>
      ))}
    </ul>
  )
}

export default function Ticker() {
  const { lang } = useLang()

  return (
    <section
      aria-label={LABEL[lang]}
      className="tone-film relative z-10 overflow-hidden border-y border-hair pb-6 pt-5"
    >
      <p className="label text-center">{LABEL[lang]}</p>
      <div className="ticker-track mt-5">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
