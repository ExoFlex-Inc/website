"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

/* iOS Safari fires resize as its toolbar collapses and expands on every
   scroll; each one made every trigger re-measure mid-flight against a
   viewport that was about to change back. Skip those — real rotations and
   window resizes still refresh. */
ScrollTrigger.config({ ignoreMobileResize: true })

/**
 * Lenis smooth scrolling, synced to GSAP's ticker so every ScrollTrigger on
 * the page scrubs against the eased position instead of raw wheel events.
 * This is most of what makes the reference sites feel expensive.
 *
 * Lenis keeps native scrolling on touch devices and leaves the scrollbar
 * real, so sticky/pinned sections keep working. Under reduced motion we never
 * instantiate it — the page scrolls exactly as the OS wants it to.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ lerp: 0.12 })
    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [reduced])

  return null
}
