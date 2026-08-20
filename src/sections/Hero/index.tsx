"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Button from "@/components/Button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { RENDER_NOTE } from "@/lib/media"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useLang } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

const COPY = {
  en: {
    headBig: "Assisting",
    headRest: "the upper limb in everyday life to",
    /* Priority-3 activities from "Importance mouvements ExoFlex_VillaMedica"
       (SharePoint, R&D) — the movements clinicians ranked most important.
       Each must read naturally after headRest's trailing "to". */
    actions: [
      "drink from a glass",
      "bring a fork to the mouth",
      "do up buttons",
      "prepare a simple meal",
      "open a bottle",
      "carry a bag",
      "use a phone",
    ],
    cta: "Request a demonstration",
    cue: "Scroll to explore",
    alt: "The ExoFlex upper-limb device: harness and backpack unit, shoulder and elbow actuators, forearm cuff, wrist joint and hand mechanism",
  },
  fr: {
    headBig: "Assister",
    headRest: "le membre supérieur au quotidien pour",
    /* Chaque fin doit se lire naturellement après le « pour » de headRest. */
    actions: [
      "boire dans un verre",
      "porter la fourchette à la bouche",
      "attacher des boutons",
      "préparer un repas simple",
      "ouvrir une bouteille",
      "porter un sac",
      "utiliser un téléphone",
    ],
    cta: "Demander une démonstration",
    cue: "Défiler pour explorer",
    alt: "L'appareil ExoFlex pour le membre supérieur : harnais et unité dorsale, actionneurs d'épaule et de coude, manchette d'avant-bras, poignet et mécanisme de la main",
  },
} as const


const Hero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  /* Text swaps in place on toggle — no GSAP target changes identity, so
     `lang` is deliberately NOT a dependency: re-running would revert the pin
     mid-scroll. */
  const { lang } = useLang()
  const t = COPY[lang]

  /* Rotating slogan: the movements clinicians ranked most important, one at
     a time. Under reduced motion the first one simply stays.
     4.4s, not 2.8s: at the old pace a phrase was replaced about as soon as it
     had been read, and the churn pulled the eye away from the render. */
  const [action, setAction] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setAction((v) => v + 1), 4400)
    return () => clearInterval(id)
  }, [reduced])

  useGSAP(
    () => {
      if (!rootRef.current || reduced) return

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".h-big", { opacity: 0, y: 30, duration: 1 }, 0)
        .from(".h-rule", { scaleX: 0, duration: 0.9, ease: "power4.inOut" }, 0.25)
        .from(".h-rest > *", { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.35)
        .from(".h-art", { opacity: 0, scale: 0.97, duration: 1.4, ease: "power2.out" }, 0.15)

      /* scroll cue: slow bob, then fades over the first bit of travel */
      gsap.to("[data-cue-arrow]", {
        y: 6,
        duration: 0.9,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })
      gsap.to(".h-cue", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "+=280", scrub: true },
      })

      /* The hero-to-content slide from the Opal reference: once the hero's
         last row reaches the bottom of the viewport it pins for one viewport
         of travel, and the next section — which sits at a higher z-index with
         its own background — slides up over it. pinSpacing: false is what
         makes the following content overlap instead of waiting below.
         Skipped under reduced motion; the page then flows normally. */
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "bottom bottom",
        end: "+=90%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      })

      /* recede slightly as the cover passes, so the slide reads as depth.
         Tweens the INNER wrapper, never the pinned element itself — a
         transform on the pin target fights ScrollTrigger's own pin transform
         and snaps mid-scroll. */
      gsap.to("[data-hero-inner]", {
        scale: 0.98,
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "bottom bottom",
          end: "+=90%",
          scrub: true,
        },
      })
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true }
  )

  return (
    <div
      ref={rootRef}
      className="relative isolate z-0 overflow-hidden text-paper"
      style={{
        /* Charcoal from the Opal reference — the white render carries the
           same figure-on-dark-ground read as their product shot. */
        background:
          "radial-gradient(120% 80% at 50% 8%, #4a4a4e 0%, #404043 46%, #363639 100%)",
      }}
    >
      {/* decorative scroll cue, pinned just above the first fold; desktop
          only — phones don't need to be told to scroll */}
      <div
        aria-hidden="true"
        className="h-cue pointer-events-none absolute left-4 z-20 hidden items-center gap-3 md:left-6 lg:flex"
        style={{ top: "calc(100svh - 4.5rem)" }}
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-paper/70">
          {t.cue}
        </span>
        <span data-cue-arrow className="inline-block text-paper/70">
          ↓
        </span>
      </div>

      {/* one exact viewport: the stage flexes to whatever the headline row
          leaves, so the composition holds on any screen height */}
      <div
        data-hero-inner
        className="relative mx-auto flex min-h-svh w-full max-w-screen-2xl flex-col px-4 pb-[clamp(2.5rem,6vh,4rem)] pt-28 md:px-6 md:pt-32"
      >
        {/* split headline */}
        <div className="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <h1 className="display-lg h-big text-[length:var(--t-h1)]">{t.headBig}</h1>

          {/* on desktop this block leaves the headline row and floats at
              mid-height on the right, beside the device's shoulder */}
          <div className="h-rest lg:absolute lg:right-6 lg:top-1/2 lg:z-10 lg:max-w-lg lg:-translate-y-1/2">
            <div
              className="h-rule mb-5 h-[3px] w-14 origin-left bg-paper"
              aria-hidden="true"
            />
            {/* the sentence finishes with a rotating everyday movement,
                straight from the clinician-ranked list.
                The measure is 17ch rather than the column's own width: it is
                the only one that lands all seven actions on exactly three
                lines in both languages, so nothing below shifts as the slogan
                rotates. Tight on both sides — 16ch pushes two French phrases
                to four lines, 18ch pulls most of the English ones up to two —
                so re-measure when the list changes. `ch` and not px because
                it has to hold as --t-h3 scales down with the viewport, and it
                only works because .hero-rot is inline and can break — see
                globals.css. The min-height is the floor if a future phrase
                falls short: three lines of .display's 0.98 line-height, spelled
                out rather than `3lh`, which Chrome resolved inconsistently
                here (72px one read, 112.875px the next). */}
            <p
              className="display text-[length:var(--t-h3)] font-medium"
              style={{ maxWidth: "17ch", minHeight: "calc(3 * 0.98em)" }}
            >
              {t.headRest}{" "}
              <span key={action} className="hero-rot text-[#85b8f8]">
                {t.actions[action % t.actions.length]}
              </span>
            </p>

            <div className="mt-7">
              <Button
                href="/contact"
                className="bg-paper text-ink hover:bg-white hover:text-ink"
              >
                {t.cta}
              </Button>
            </div>
          </div>
        </div>

        {/* stage: the device at its natural size, centered in the leftover
            viewport space */}
        <div className="relative mt-6 flex min-h-0 flex-1 items-center justify-center md:mt-2">
          <div className="h-art relative mx-auto aspect-[2300/1856] w-full max-w-3xl lg:max-w-[52rem]">
            <Image
              src="/images/product/device-render.png"
              alt={t.alt}
              fill
              priority
              sizes="(min-width: 1024px) 832px, 96vw"
              className="object-contain"
            />

          </div>

          {RENDER_NOTE && (
            <p className="label mt-4 text-paper/70 lg:absolute lg:bottom-6 lg:right-0 lg:mt-0">
              {RENDER_NOTE[lang]}
            </p>
          )}

        </div>

      </div>
    </div>
  )
}

export default Hero
