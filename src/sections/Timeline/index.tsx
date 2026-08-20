"use client"

import { type FC, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useLang, type Lang } from "@/lib/i18n"
import { MEDIA_NOTE } from "@/lib/media"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

/**
 * The road here, as full-bleed scenes: the viewport pins (CSS sticky, like
 * the Context hold — not a second GSAP pin) and each milestone's media fills
 * the screen, cross-fading with a slight zoom while the caption hands off —
 * the Oryzo scene grammar applied to the company's own history.
 *
 * Three scenes, all real media (SharePoint Communication & Marketing/
 * Photos): the original lower-limb hero footage for the 2023 capstone, the
 * Forces AVENIR gala (finalist certificate, Québec, 2025) and the founders
 * at Centech. Later phases (pivot, clinics, 2026 survey) were cut at the
 * user's request; the story now ends where the company forms.
 *
 * Under reduced motion the scenes stack statically, one band per milestone.
 */
type Scene = {
  badge: string
  heading: string
  body: string
  /** "light" flips the caption to ink and drops the scrim (pale collage). */
  tone?: "light"
  media:
    | { type: "image"; src: string }
    | { type: "video"; src: string; poster: string }
    | {
        type: "collage"
        images: {
          src: string
          alt: string
          label: string
          className: string
          drift: number
          /** Per-photo frame: aspect class (default square) + object position. */
          ratio?: string
          position?: string
        }[]
      }
  alt: string
  /** Photo credit / honesty label. `null` falls back to MEDIA_NOTE. */
  note: string | null
}

const SCENES: Record<Lang, Scene[]> = {
  en: [
    {
      badge: "2023",
      heading: "Born at the university.",
      body: "The project begins as an engineering capstone at Université de Sherbrooke, a lower-limb rehabilitation station. Nine Mitacs research internships carry the first prototypes.",
      media: { type: "video", src: "/videos/capstone_station.mp4", poster: "/images/product/capstone_station.jpg" },
      alt: "The original lower-limb rehabilitation station built as the capstone project",
      note: "Capstone prototype, Université de Sherbrooke",
    },
    {
      badge: "Recognition",
      heading: "Distinctions along the way.",
      body: "Concours Créatek, OSEntreprendre, the Quebec and Canadian engineering competitions, Prix Hippocrate and Forces AVENIR. More than 21 pitch and grant competitions, contributing over $400K in non-dilutive funding.",
      media: {
        type: "collage",
        images: [
          {
            src: "/images/timeline/createk-cheque.jpg",
            alt: "The team receiving the $5,000 Relève-category cheque at Concours Créatek",
            label: "Concours Créatek – Relève category – 2022",
            className: "left-[3%] top-[12%] w-[34vw] max-w-sm -rotate-2 lg:top-[5%] lg:w-[19vw]",
            drift: 16,
            ratio: "aspect-[4/3]",
          },
          {
            src: "/images/timeline/ose-national.jpg",
            alt: "The full team with the OSEntreprendre national laureate certificate and the lower-limb prototype",
            label: "OSEntreprendre – National laureate – University category – 2024",
            className: "left-[25%] top-[26%] hidden w-[15vw] max-w-[250px] rotate-1 lg:block",
            drift: 28,
          },
          {
            src: "/images/timeline/cqi.jpg",
            alt: "On stage with the second-place innovative design trophies at the Quebec Engineering Competition",
            label: "Quebec Engineering Competition – 2025",
            className: "right-[29%] top-[6%] hidden w-[15vw] max-w-[240px] rotate-2 lg:block",
            drift: 22,
          },
          {
            src: "/images/timeline/cci-scene.jpg",
            alt: "Two founders with achievement certificates at the Canadian Engineering Competition at Dalhousie University",
            label: "Canadian Engineering Competition – 2025",
            className: "bottom-[38%] right-[27%] hidden w-[16vw] max-w-[260px] -rotate-2 lg:block",
            drift: 18,
            ratio: "aspect-[7/6]",
          },
          {
            src: "/images/timeline/forces-avenir.jpg",
            alt: "The three founders holding the ExoFlex finalist certificate at the Forces AVENIR gala",
            label: "Forces AVENIR – AVENIR Sciences and technology – 2025",
            className: "bottom-[7%] right-[4%] hidden w-[16vw] max-w-[260px] rotate-1 lg:block",
            drift: 20,
          },
          {
            src: "/images/timeline/osentreprendre-2026.jpg",
            alt: "Two founders holding the OSEntreprendre regional laureate certificate, Estrie 2026",
            label: "OSEntreprendre – Regional laureate – Business creation – 2026",
            className: "right-[4%] top-[15%] w-[36vw] max-w-xs -rotate-1 lg:top-[9%] lg:w-[16vw]",
            drift: 26,
          },
        ],
      },
      alt: "Photographs from competitions and galas",
      note: "Competition and gala photographs, 2022 to 2026",
    },
    {
      badge: "Incubation",
      heading: "From project to company.",
      body: "The founders continue at the Centech incubator in Montréal, testing every assumption against the realities of the care system rather than the lab bench.",
      media: { type: "image", src: "/images/timeline/centech.jpg" },
      alt: "The three founders on the wooden staircase at Centech",
      note: "The founders at Centech, Montréal",
    },
  ],
  fr: [
    {
      badge: "2023",
      heading: "Né à l'université.",
      body: "Le projet commence comme projet de fin de baccalauréat en génie à l'Université de Sherbrooke, une station de réadaptation du membre inférieur. Neuf stages de recherche Mitacs portent les premiers prototypes.",
      media: { type: "video", src: "/videos/capstone_station.mp4", poster: "/images/product/capstone_station.jpg" },
      alt: "La station de réadaptation du membre inférieur du projet de fin de baccalauréat",
      note: "Prototype du projet de fin de baccalauréat, Université de Sherbrooke",
    },
    {
      badge: "Distinctions",
      heading: "Reconnu en chemin.",
      body: "Concours Créatek, OSEntreprendre, les compétitions québécoise et canadienne d'ingénierie, le Prix Hippocrate et Forces AVENIR. Plus de 21 concours et bourses, pour plus de 400 k$ en financement non dilutif.",
      media: {
        type: "collage",
        images: [
          {
            src: "/images/timeline/createk-cheque.jpg",
            alt: "L'équipe recevant le chèque de 5 000 $, catégorie Relève, au Concours Créatek",
            label: "Concours Créatek – Catégorie Relève – 2022",
            className: "left-[3%] top-[12%] w-[34vw] max-w-sm -rotate-2 lg:top-[5%] lg:w-[19vw]",
            drift: 16,
            ratio: "aspect-[4/3]",
          },
          {
            src: "/images/timeline/ose-national.jpg",
            alt: "L'équipe complète avec le certificat de lauréat national OSEntreprendre et le prototype du membre inférieur",
            label: "OSEntreprendre – Lauréat national – Catégorie Universitaire – 2024",
            className: "left-[25%] top-[26%] hidden w-[15vw] max-w-[250px] rotate-1 lg:block",
            drift: 28,
          },
          {
            src: "/images/timeline/cqi.jpg",
            alt: "Sur scène avec les trophées de deuxième place en conception innovatrice à la Compétition québécoise d'ingénierie",
            label: "Compétition québécoise d'ingénierie – 2025",
            className: "right-[29%] top-[6%] hidden w-[15vw] max-w-[240px] rotate-2 lg:block",
            drift: 22,
          },
          {
            src: "/images/timeline/cci-scene.jpg",
            alt: "Deux fondateurs avec leurs certificats à la Compétition canadienne d'ingénierie, à l'Université Dalhousie",
            label: "Compétition canadienne d'ingénierie – 2025",
            className: "bottom-[38%] right-[27%] hidden w-[16vw] max-w-[260px] -rotate-2 lg:block",
            drift: 18,
            ratio: "aspect-[7/6]",
          },
          {
            src: "/images/timeline/forces-avenir.jpg",
            alt: "Les trois fondateurs tenant le certificat de finaliste ExoFlex au gala Forces AVENIR",
            label: "Forces Avenir – Catégorie AVENIR Sciences et technologies – 2025",
            className: "bottom-[7%] right-[4%] hidden w-[16vw] max-w-[260px] rotate-1 lg:block",
            drift: 20,
          },
          {
            src: "/images/timeline/osentreprendre-2026.jpg",
            alt: "Deux fondateurs tenant le certificat de lauréat régional OSEntreprendre, Estrie 2026",
            label: "OSEntreprendre – Lauréat régional – Catégorie Création d'entreprise – 2026",
            className: "right-[4%] top-[15%] w-[36vw] max-w-xs -rotate-1 lg:top-[9%] lg:w-[16vw]",
            drift: 26,
          },
        ],
      },
      alt: "Photos de concours et de galas",
      note: "Photos de concours et de galas, 2022 à 2026",
    },
    {
      badge: "Incubation",
      heading: "Du projet à l'entreprise.",
      body: "Les fondateurs poursuivent à l'incubateur Centech, à Montréal, en confrontant chaque hypothèse aux réalités du système de soins plutôt qu'au banc d'essai.",
      media: { type: "image", src: "/images/timeline/centech.jpg" },
      alt: "Les trois fondateurs dans l'escalier de bois du Centech",
      note: "Les fondateurs au Centech, à Montréal",
    },
  ],
}

const COPY = {
  en: { label: "Milestones", heading: "The road here." },
  fr: { label: "Jalons", heading: "Le chemin parcouru." },
} as const

function SceneMedia({ scene, first }: { scene: Scene; first: boolean }) {
  if (scene.media.type === "collage") {
    /* the Floema device: photographs scattered around the statement, each
       drifting at its own rate (see the [data-drift] tweens) */
    return (
      <div className="relative h-full w-full bg-sunk">
        {/* the OSEntreprendre Estrie stage photo grounds the collage; the
            polaroids float over it and the scene scrim keeps them legible */}
        <Image
          src="/images/timeline/ose-estrie-scene.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        {scene.media.images.map((img) => (
          <figure
            key={img.src}
            data-drift={img.drift}
            className={cn(
              "absolute bg-white p-2.5 pb-3 shadow-2xl will-change-transform",
              img.className
            )}
          >
            <div className={cn("relative w-full overflow-hidden", img.ratio ?? "aspect-square")}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="40vw"
                className={cn("object-cover", img.position)}
              />
            </div>
            {/* the written line under a polaroid; the brand face has a slanted
                cut, which reads as a note without importing a script font */}
            <figcaption className="mt-2.5 text-center text-[0.82rem] font-semibold italic leading-snug text-neutral-800">
              {img.label}
            </figcaption>
          </figure>
        ))}
      </div>
    )
  }
  if (scene.media.type === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={scene.media.poster}
        preload="metadata"
        aria-label={scene.alt}
        className="h-full w-full object-cover"
      >
        <source src={scene.media.src} type="video/mp4" />
      </video>
    )
  }
  return (
    <Image
      src={scene.media.src}
      alt={scene.alt}
      fill
      sizes="100vw"
      priority={false}
      loading={first ? "eager" : "lazy"}
      className="object-cover"
    />
  )
}

function Caption({
  scene,
  lang,
  className,
}: {
  scene: Scene
  lang: Lang
  className?: string
}) {
  const light = scene.tone === "light"
  return (
    <div className={className}>
      <p className={cn("label", light ? "text-mute" : "text-paper/85")}>{scene.badge}</p>
      <h3
        className={cn(
          "display-lg mt-4 text-[clamp(2rem,1rem+3.6vw,4.4rem)]",
          light ? "text-ink" : "text-paper"
        )}
        style={{ maxWidth: "15ch" }}
      >
        {scene.heading}
      </h3>
      <div className="mt-6">
        <p
          className={cn(
            "text-[length:var(--t-body)] leading-relaxed",
            light ? "text-slate" : "text-paper/85"
          )}
          style={{ maxWidth: "48ch" }}
        >
          {scene.body}
        </p>
        <p className={cn("label mt-4", light ? "text-mute" : "text-paper/60")}>
          {scene.note ?? MEDIA_NOTE?.[lang]}
        </p>
      </div>
    </div>
  )
}

const Timeline: FC = () => {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { lang } = useLang()
  const t = COPY[lang]
  const scenes = SCENES[lang]

  useGSAP(
    () => {
      if (!rootRef.current || reduced) return
      const hold = rootRef.current.querySelector("[data-hold]")
      const layers = gsap.utils.toArray<HTMLElement>("[data-scene]", rootRef.current)
      const caps = gsap.utils.toArray<HTMLElement>("[data-caption]", rootRef.current)
      const count = rootRef.current.querySelector("[data-count]")
      if (!hold || layers.length < 2) return

      /* entry: Validation holds still underneath (CSS sticky, see page.tsx)
         while this section arrives as an inset card and grows to full bleed
         as it covers it (ethnocare.ca/pages/about-us). Top origin: the
         leading edge tracks the scroll, only the width opens up. */
      gsap.fromTo(
        rootRef.current,
        { scale: 0.85, transformOrigin: "50% 0%" },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      )

      gsap.set(layers.slice(1), { autoAlpha: 0 })
      gsap.set(caps.slice(1), { autoAlpha: 0 })

      const n = layers.length
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hold,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (!count) return
            const i = Math.min(n - 1, Math.floor(self.progress * n))
            count.textContent = String(i + 1).padStart(2, "0")
          },
        },
      })

      for (let i = 1; i < n; i++) {
        /* hold the current scene, then hand off: the outgoing frame keeps
           zooming as it fades — the incoming one settles from a deeper zoom */
        tl.to({}, { duration: 1 })
        tl.add(`t${i}`)
        /* sequential, not a crossfade: the outgoing frame settles to the dark
           ground before the next one rises, so two scenes never superimpose
           (a crossfade turned the collage into a double exposure) */
        tl.to(layers[i - 1], { autoAlpha: 0, scale: 1.06, duration: 0.5, ease: "power1.in" }, `t${i}`)
        tl.fromTo(
          layers[i],
          { autoAlpha: 0, scale: 1.1 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power1.out" },
          `t${i}+=0.5`
        )
        tl.to(caps[i - 1], { autoAlpha: 0, y: -28, duration: 0.4, ease: "power2.in" }, `t${i}`)
        tl.fromTo(
          caps[i],
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          `t${i}+=0.45`
        )
      }
      tl.to({}, { duration: 1 })

      /* the polaroids pop in one after another while the pale scene holds
         (times sit inside scene 2's window: fade-in ends at 2, exit at 3) */
      const cards = gsap.utils.toArray<HTMLElement>("[data-drift]", rootRef.current)
      gsap.set(cards, { autoAlpha: 0, scale: 0.85 })
      cards.forEach((c, idx) => {
        tl.to(
          c,
          { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" },
          1.65 + idx * 0.22
        )
      })

      /* collage cards drift at their own rates for the whole hold */
      gsap.utils.toArray<HTMLElement>("[data-drift]", rootRef.current).forEach((el) => {
        const d = parseFloat(el.dataset.drift || "20")
        gsap.fromTo(
          el,
          { yPercent: d },
          {
            yPercent: -d,
            ease: "none",
            scrollTrigger: { trigger: hold, start: "top bottom", end: "bottom top", scrub: true },
          }
        )
      })

      gsap.fromTo(
        "[data-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: hold, start: "top top", end: "bottom bottom", scrub: true },
        }
      )
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true }
  )

  return (
    <section
      ref={rootRef}
      id="milestones"
      aria-label={t.heading}
      className="tone-film relative z-10"
    >
      {reduced ? (
        /* static fallback: one full-width band per milestone, no hold */
        <div>
          {scenes.map((s, i) => (
            <div key={i} className="relative isolate min-h-[72svh] overflow-hidden">
              <div className="absolute inset-0">
                <SceneMedia scene={s} first={i === 0} />
              </div>
              {s.tone !== "light" && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/25"
                />
              )}
              <div className="relative flex min-h-[72svh] items-end px-4 pb-12 pt-24 md:px-6">
                <div className="mx-auto w-full max-w-screen-2xl">
                  <Caption scene={s} lang={lang} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* the hold: n screens of travel; the stage stays pinned via sticky */
        <div data-hold className="relative" style={{ height: `${scenes.length * 110}vh` }}>
          <div data-stage className="sticky top-0 h-svh overflow-hidden will-change-transform">
            {/* media layers, stacked; the master timeline cross-fades them */}
            {scenes.map((s, i) => (
              <div key={i} data-scene className="absolute inset-0 will-change-transform">
                <SceneMedia scene={s} first={i === 0} />
                {/* scrim lives inside the frame so pale scenes can skip it */}
                {s.tone !== "light" && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/25"
                  />
                )}
              </div>
            ))}

            {/* captions, stacked at the same anchor */}
            <div className="absolute inset-x-0 bottom-0">
              <div className="relative mx-auto w-full max-w-screen-2xl px-4 md:px-6">
                {scenes.map((s, i) => (
                  <div
                    key={i}
                    data-caption
                    className={cn(
                      "pb-[clamp(2.5rem,8vh,5rem)]",
                      i === 0 ? "relative" : "absolute inset-x-4 bottom-0 md:inset-x-6"
                    )}
                  >
                    <Caption scene={s} lang={lang} />
                  </div>
                ))}
              </div>
            </div>

            {/* progress: counter + hairline that fills as the story advances */}
            {/* bottom-right: the fixed header owns the top edge */}
            <div className="absolute bottom-6 right-4 flex items-center gap-3 mix-blend-difference md:right-6">
              <p aria-hidden="true" className="font-mono text-[0.68rem] tracking-[0.14em] text-paper/80">
                <span data-count>01</span>
                <span className="text-paper/45"> / {String(scenes.length).padStart(2, "0")}</span>
              </p>
              <div className="relative h-px w-24 overflow-hidden bg-paper/25">
                {/* blue rather than paper: this is the one element on the band
                    that reports state, and the brand colour is what separates
                    it from the neutral rule it fills */}
                <div
                  data-progress
                  className="absolute inset-0 origin-left bg-accent"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Timeline
