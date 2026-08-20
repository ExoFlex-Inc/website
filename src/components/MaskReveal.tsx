"use client"

import { useRef, type CSSProperties, type Ref } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  text: string
  /** Keep to headline-length copy — every word becomes two spans. */
  as?: "h2" | "h3" | "p"
  className?: string
  style?: CSSProperties
}

/**
 * Masked word reveal for short display headings, after the reference sites:
 * each word rises out of an overflow-hidden slot once, on enter. The start
 * state lives in the tween (gsap.from), so without JavaScript or under
 * reduced motion the heading is simply there.
 *
 * The padding/negative-margin pair on the mask keeps descenders from being
 * clipped at rest while still hiding the word fully during the rise.
 */
export default function MaskReveal({ text, as: Tag = "h2", className, style }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || reduced) return
      gsap.from(ref.current.querySelectorAll("[data-tok]"), {
        yPercent: 115,
        duration: 0.85,
        stagger: 0.055,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      })
    },
    { scope: ref, dependencies: [reduced, text], revertOnUpdate: true }
  )

  return (
    <Tag ref={ref as Ref<never>} className={className} style={style}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
        >
          <span data-tok className="inline-block will-change-transform">
            {w}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </Tag>
  )
}
