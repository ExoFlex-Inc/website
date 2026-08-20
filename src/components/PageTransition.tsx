"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

/**
 * Floema-style route transition (floema.com): on an internal link click the
 * outgoing page darkens and sinks, then the incoming page RISES from the
 * bottom of the viewport over that dark ground.
 *
 * App Router swaps #main's children at push, so the "old page" the new one
 * rides over is the dim layer left at full opacity — the darkening happens
 * while the real old page is still in the DOM, which is what sells it.
 *
 * Clicks with modifier keys, other targets, downloads, external URLs and
 * same-path hash links fall through to the browser. Under reduced motion
 * nothing is intercepted and routing is native. `clearProps` restores #main
 * once the entrance ends — a transformed ancestor would re-anchor the hero's
 * pinned stage.
 */
export default function PageTransition() {
  const dimRef = useRef<HTMLDivElement>(null)
  const covering = useRef(false)
  const router = useRouter()
  const pathname = usePathname()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return
      const a = (e.target as Element).closest?.("a")
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return
      const href = a.getAttribute("href")
      if (!href || !href.startsWith("/")) return
      const url = new URL(href, location.href)
      if (url.pathname === location.pathname) return

      e.preventDefault()
      if (covering.current) return
      covering.current = true

      /* exit: the page pales to the paper ground and settles downward.
         Pixel offsets, not yPercent — #main is the whole document, so a
         percentage would translate by thousands of pixels. */
      const main = document.getElementById("main")
      gsap
        .timeline({
          defaults: { duration: 0.5 },
          onComplete: () => router.push(url.pathname + url.search),
        })
        .to(dimRef.current, { autoAlpha: 1, ease: "power2.out" }, 0)
        .to(main, { y: 80, ease: "power2.in" }, 0)
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [reduced, router])

  /* enter: the new page rises from the bottom over the dark ground */
  useEffect(() => {
    if (!covering.current) return
    covering.current = false
    const main = document.getElementById("main")
    if (!main) return
    gsap
      .timeline()
      .fromTo(
        main,
        /* 95 sits above the dim ground (90) and below the header (96) — the
           page has to rise over the pale layer without painting out the fixed
           chrome. Moving this means moving those two. */
        { y: () => window.innerHeight, position: "relative", zIndex: 95 },
        { y: 0, duration: 0.85, ease: "power4.out", delay: 0.05 }
      )
      .to(dimRef.current, { autoAlpha: 0, duration: 0.35 }, ">-0.25")
      .set(main, { clearProps: "all" })
      /* The incoming page's sections mount and build their ScrollTriggers
         while #main is still translated by up to a full viewport height, so
         every start/end they cache is measured against a document shifted by
         that much — and the hero's pin is anchored to a transformed ancestor.
         clearProps puts the layout back but tells ScrollTrigger nothing, which
         is why scroll animations stopped firing after the second route change.
         Re-measure once here, with the transform gone. */
      .call(() => ScrollTrigger.refresh())
  }, [pathname])

  return (
    <div
      ref={dimRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] bg-[#edece8] opacity-0"
    />
  )
}
