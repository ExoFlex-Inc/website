"use client"

import { type FC, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import LazyVideo from "@/components/LazyVideo"
import MaskReveal from "@/components/MaskReveal"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useLang } from "@/lib/i18n"

gsap.registerPlugin(ScrollTrigger)

/**
 * Full-bleed film moment between the mechanism and the evidence: one dark
 * scene, one oversized line, nothing else asking for attention.
 *
 * The footage is the real CAD render (the same asset the hero annotates)
 * animated by Higgsfield image-to-video, so the geometry on screen is the
 * device's own — only the camera moves. Encoded as a forward+reverse
 * palindrome so the loop never jumps. The caption says exactly what it is:
 * a product render with an AI camera move, not documentary footage.
 *
 * The media layer is taller than the section and scrubs vertically as the
 * band crosses the viewport (a parallax, not a pin — the page already pins
 * the hero, and one pin per page is the budget). Under reduced motion the
 * layer is simply full-size and static.
 */
const COPY = {
  en: {
    label: "The device in motion",
    heading: "Assistance that leaves the clinic.",
    body: "Worn, battery-powered and fitted without a technician, so the assistance is where life happens, not only where the equipment lives.",
    aria: "The device in motion",
    alt: "The ExoFlex device turning slowly against a dark studio background",
  },
  fr: {
    label: "L'appareil en mouvement",
    heading: "L'assistance sort de la clinique.",
    body: "Porté, alimenté par batterie et installé sans technicien, pour que l'assistance soit là où la vie se passe, pas seulement là où vit l'équipement.",
    aria: "L'appareil en mouvement",
    alt: "L'appareil ExoFlex tournant lentement sur un fond de studio sombre",
  },
} as const

const Scene: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { lang } = useLang()
  const t = COPY[lang]

  useGSAP(
    () => {
      if (!rootRef.current || reduced) return
      const media = rootRef.current.querySelector("[data-media]")
      if (!media) return

      /* the band opens from an inset card to full bleed as it enters */
      gsap.fromTo(
        rootRef.current,
        { clipPath: "inset(6% 4.5% round 28px)" },
        {
          clipPath: "inset(0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 95%",
            end: "top 25%",
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        media,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true }
  )

  return (
    <section
      ref={rootRef}
      aria-label={t.aria}
      className="relative isolate min-h-[88svh] overflow-hidden bg-[#363639] text-paper"
    >
      {/* taller than the band so the parallax never exposes an edge; under
          reduced motion the tween is skipped and the extra height is inert */}
      <div data-media className="absolute inset-x-0 -top-[8%] h-[116%]">
        <LazyVideo
          src="/videos/device_orbit.mp4"
          poster="/images/product/device-orbit-poster.jpg"
          alt={t.alt}
          className="absolute inset-0 overflow-hidden"
          /* contain below lg: the clip is 1280×720, so covering a portrait
             phone showed the central quarter of the frame — straps filling the
             screen, unreadable as a device. Contained, the whole machine is on
             screen and the letterbox disappears into the band's own ground
             (the footage's studio is a near match for #363639). Positioned at
             35% so the strip sits in the air above the copy, not behind it.
             Cover returns at lg, where the band is wide enough to hold the
             full device. */
          videoClassName="h-full w-full object-contain [object-position:50%_35%] lg:object-cover lg:object-center"
        />
      </div>

      {/* scrim so the display line holds contrast over bright frames */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25"
      />

      <div className="relative flex min-h-[88svh] flex-col justify-end px-4 pb-[clamp(2.5rem,7vh,5rem)] pt-28 md:px-6">
        <div className="mx-auto w-full max-w-screen-2xl">
          <MaskReveal
            text={t.heading}
            className="display-lg mt-5 text-[clamp(2.6rem,1.2rem+5.6vw,6.5rem)]"
            style={{ maxWidth: "14ch" }}
          />
          <div className="mt-8">
            <p
              className="text-[length:var(--t-body)] leading-relaxed text-paper/80"
              style={{ maxWidth: "44ch" }}
            >
              {t.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Scene
