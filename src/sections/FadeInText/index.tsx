"use client";

import { FC, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Section from "@/components/Section";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven reveal, after the Opal reference the user supplied: the
 * paragraph's words resolve from faint to full ink as you scroll, the block
 * holding on screen while the reveal completes. Per the user, no inline
 * images — the words carry it alone.
 *
 * The hold is `position: sticky` inside a tall wrapper, not a GSAP pin — same
 * visual, cheaper, and under reduced motion the wrapper collapses to natural
 * height. The faint start state lives in the tween, never in the markup, so
 * without animation the paragraph is simply legible.
 */
const COPY = {
  en: {
    label: "Context",
    body: "After a stroke, the upper-limb impairment does not end when the clinic stay does. It is measured in everyday movements like eating, dressing and cooking, long after therapy ends.",
    /* 80% and 65% are cited epidemiology from the CRSNG/PSO application; 63%
       is from the ExoFlex clinician survey. See that document before touching
       these — the previous 720k/50%/80% row was unsourced. */
    stats: [
      { value: 80, suffix: "%", label: "of stroke survivors present an upper-limb impairment" },
      { value: 65, suffix: "%", label: "still show motor deficits six months after the event" },
      { value: 63, suffix: "%", label: "of patients show moderate-to-low adherence to home exercise programs, as clinicians report" },
    ],
  },
  fr: {
    label: "Contexte",
    body: "Après un AVC, l'atteinte du membre supérieur ne s'arrête pas à la sortie de la clinique. Elle se mesure dans les gestes du quotidien, comme manger, s'habiller et cuisiner, longtemps après la fin des thérapies.",
    stats: [
      { value: 80, suffix: "\u00A0%", label: "des survivants d'un AVC présentent une atteinte du membre supérieur" },
      { value: 65, suffix: "\u00A0%", label: "conservent des déficits moteurs six mois après l'événement" },
      { value: 63, suffix: "\u00A0%", label: "des patients ont une adhérence modérée à faible aux exercices à domicile, selon les cliniciens" },
    ],
  },
} as const

const FadeInText: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const t = COPY[lang];

  useGSAP(
    () => {
      if (!containerRef.current || reduced) return;

      const wrap = containerRef.current.querySelector("[data-hold]");
      const toks = containerRef.current.querySelectorAll(".fade-tok");
      if (!wrap || !toks.length) return;

      gsap.fromTo(
        toks,
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 62%",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      /* Ledger rows: each draws its rule, rises, and counts from zero. The
         markup holds the final value, so no-JS and reduced motion read it. */
      containerRef.current
        .querySelectorAll<HTMLElement>("[data-stat]")
        .forEach((row) => {
          const num = row.querySelector<HTMLElement>("[data-count]");
          const target = Number(num?.dataset.target ?? 0);
          const proxy = { v: 0 };
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          });
          tl.from(row.querySelector("[data-rule]"), {
            scaleX: 0,
            duration: 0.9,
            ease: "power4.inOut",
          }, 0)
            .from(row.querySelectorAll("[data-rise]"), {
              opacity: 0,
              y: 26,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            }, 0.1)
            .to(proxy, {
              v: target,
              duration: 1.3,
              ease: "power2.out",
              onUpdate: () => {
                if (num) num.textContent = String(Math.round(proxy.v));
              },
            }, 0.15);
        });
    },
    { dependencies: [pathname, reduced, lang], scope: containerRef, revertOnUpdate: true }
  );

  return (
    <Section id="context">
      <div ref={containerRef}>
        {/* Tall wrapper + sticky block = the hold. Collapses under reduced
            motion so a static paragraph costs no extra scroll. */}
        <div data-hold className={cn(!reduced && "h-[150vh] lg:h-[185vh]")}>
          <div
            className={cn(
              "flex",
              !reduced && "sticky top-0 min-h-[88svh] items-center"
            )}
          >
            <div>
              <p
                className="display text-[clamp(1.7rem,1.1rem+2.6vw,3.4rem)] leading-[1.22]"
                style={{ maxWidth: "34ch" }}
              >
                {t.body.split(" ").map((w, i) => (
                  <span key={i} className="fade-tok inline-block">
                    {w}
                    <span>&nbsp;</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Plain divs, not a <dl>: this was a definition list with <dd> before
            <dt>, nested two divs deep — which fails both of axe's list audits
            (definition-list and dlitem). A big numeral and its sentence are
            not a term/definition pair anyway, so the honest fix is to stop
            claiming the semantics rather than contort the markup to keep them. */}
        <div data-stats className="mt-[clamp(3.5rem,9vh,6rem)]">
          {t.stats.map((s) => (
            <div key={s.label} data-stat className="relative">
              {/* drawn rule instead of a border, so it can animate */}
              <div
                data-rule
                aria-hidden="true"
                className="h-px w-full origin-left bg-hair-strong"
              />
              <div className="grid items-end gap-x-12 gap-y-4 py-[clamp(1.6rem,4.5vh,3rem)] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)]">
                <p data-rise className="m-0">
                  <span
                    data-count
                    data-target={s.value}
                    className="display tnum text-[clamp(4.5rem,3rem+8vw,11rem)] leading-[0.9] tracking-[-0.03em]"
                  >
                    {s.value}
                  </span>
                  {/* the unit carries the brand blue while the numeral stays
                      ink: the first content screen after the hero gets a touch
                      of the logo colour without an 11rem numeral turning blue.
                      32-72px is large type, where the graphic tuning is cleared
                      to run (3.38:1 on paper). */}
                  <span className="display text-[clamp(2rem,1.4rem+3vw,4.5rem)] leading-none text-accent">
                    {s.suffix}
                  </span>
                </p>
                <p
                  data-rise
                  className="m-0 pb-2 text-[clamp(1.1rem,0.95rem+0.9vw,1.65rem)] leading-relaxed text-slate lg:justify-self-end lg:text-right"
                  style={{ maxWidth: "30ch" }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
};

export default FadeInText;
