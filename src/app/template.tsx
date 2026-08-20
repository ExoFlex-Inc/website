"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/**
 * Route transition. A template remounts on every navigation, so each page
 * (À propos, Notre équipe, Nous joindre) enters with the same gesture the
 * site uses everywhere else: a quiet rise out of opacity, nothing theatrical.
 *
 * Entrance only — exit choreography would need view-transition machinery for
 * little gain at this pace. `clearProps` removes the wrapper's transform once
 * the entrance ends: a transformed ancestor would otherwise re-anchor the
 * hero's pinned (fixed) stage and break it.
 *
 * Under reduced motion the page simply appears.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || reduced) return
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          clearProps: "all",
        }
      )
    },
    { scope: ref, dependencies: [reduced] }
  )

  return <div ref={ref}>{children}</div>
}
