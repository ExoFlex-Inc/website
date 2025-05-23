"use client"

import { type FC, useRef, useState } from "react"
import type { Content } from "@prismicio/client"
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react"
import { Bounded } from "@/components/Bounded"
import { View } from "@react-three/drei"
import Scene from "./Scene"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useStore } from "@/hooks/useStore"
import { usePathname } from "next/navigation"
import { asText } from "@prismicio/client"
import LazyVideo from "@/components/LazyVideo"

gsap.registerPlugin(ScrollTrigger)

export type AlternativeTextProps = SliceComponentProps<Content.AlternativeTextSlice>

const AlternativeText: FC<AlternativeTextProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const ready = useStore((state) => state.ready)
  const pathname = usePathname()

  const videoSources = [
    "/videos/video_exercices.mp4",
    "/videos/video_serrage.mp4",
    "/videos/video_structure.mp4",
  ]

  const posterSources = [
    "/images/poster_exercices.jpg",
    "/images/poster_serrage.jpg",
    "/images/poster_structure.jpg",
  ]

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const ctx = gsap.context(() => {
        const sections = container.querySelectorAll(".alternating-section")
        const triggers: ScrollTrigger[] = []

        triggers.push(
          ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            onLeave: () => setActiveSection(null),
            onLeaveBack: () => setActiveSection(null),
          })
        )

        sections.forEach((section, index) => {
          const heading = section.querySelector(".heading-3d")
          const body = section.querySelector(".body-3d")

          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => setActiveSection(index),
              onEnterBack: () => setActiveSection(index),
            })
          )

          const textTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 50%",
              end: "bottom 40%",
              scrub: true,
            },
          })

          if (heading && body) {
            textTl.fromTo(
              heading,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
            )
            textTl.fromTo(
              body,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 0.9, duration: 1, ease: "power2.out" },
              "<0.2"
            )
            textTl.to(
              heading,
              { y: -100, opacity: 0, duration: 1, ease: "power2.in" }
            )
            textTl.to(
              body,
              { y: -50, opacity: 0, duration: 1, ease: "power2.in" },
              "<0.2"
            )
          }
        })
      }, containerRef)

      return () => ctx.revert()
    },
    { dependencies: [ready, pathname], scope: containerRef, revertOnUpdate: true }
  )

  return (
    <div ref={containerRef} className="relative text-white">
      <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
        <Scene />
      </View>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="alternating-text-container relative"
      >
        <div className="grid relative">
          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section relative flex flex-col md:grid min-h-screen gap-x-12 md:grid-cols-2 place-items-center overflow-hidden perspective-container"
              style={{ perspective: "1000px" }}
            >
              {/* Desktop video background */}
              <div
                className="absolute inset-0 -z-10 hidden md:flex items-center justify-center pointer-events-none transition-opacity duration-300"
                style={{ opacity: activeSection === index ? 1 : 0 }}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <LazyVideo
                    src={videoSources[index]}
                    poster={posterSources[index]}
                    className="absolute inset-0"
                    videoClassName="w-full h-full object-cover"
                    maskStyle={{
                      WebkitMaskImage: `
                        radial-gradient(circle at center, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0) 85%),
                        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)`,
                      WebkitMaskComposite: "intersect",
                      maskImage: `
                        radial-gradient(circle at center, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0) 85%),
                        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)`,
                      maskComposite: "intersect",
                      filter: "brightness(0.8) blur(0px)",
                      backdropFilter: "blur(50px)",
                      transition: "filter 0.5s ease-in-out",
                    }}
                  />
                </div>
              </div>

              {/* Desktop text */}
              <div className={`${index % 2 === 0 ? "col-start-1" : "md:col-start-2"} hidden md:block relative`}>
                <div className="transform-3d-container" style={{ transformStyle: "preserve-3d" }}>
                  <h2 className="text-balance text-3xl md:text-5xl lg:text-6xl font-bold heading-3d" style={{ transform: "translateZ(40px)", textShadow: "0 0 15px rgba(255, 255, 255, 0.3)" }}>{asText(item.heading)}</h2>
                  <div className="mt-4 text-md md:text-lg lg:text-xl body-3d" style={{ transform: "translateZ(0px)", opacity: 0.9 }}>
                    <PrismicRichText field={item.body} />
                  </div>
                </div>
              </div>

              {/* Mobile: text first, video after */}
              <div className="md:hidden z-10 flex flex-col items-center text-center px-6 mt-8">
                <h2 className="text-2xl sm:text-3xl font-bold heading-3d mb-4" style={{ transform: "translateZ(40px)", textShadow: "0 0 15px rgba(255, 255, 255, 0.3)" }}>{asText(item.heading)}</h2>
                <div className="text-sm body-3d mb-4" style={{ transform: "translateZ(0px)", opacity: 0.9 }}>
                  <PrismicRichText field={item.body} />
                </div>

                {activeSection === index && (
                  <LazyVideo
                    src={videoSources[index]}
                    poster={posterSources[index]}
                    className="w-full max-w-md aspect-video mt-4 rounded-xl overflow-hidden"
                    videoClassName="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </Bounded>
    </div>
  )
}

export default AlternativeText;