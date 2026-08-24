"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { getLenis } from "@/lib/lenis"

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
          onComplete: () => {
            /* To the top BEFORE the push, while the dim layer covers the
               swap. The incoming page's ScrollTriggers are created during
               React's commit, which runs at whatever scroll position the
               OLD page left — arrive from the bottom of a long page and
               every once:true trigger whose start is above that offset
               fires and kills itself while another trigger's init is still
               iterating the trigger list, which is the "Application error"
               (reading 'pin' / 'end' inside ScrollTrigger.refresh) on
               team → home. Next scrolls to top itself, but only after the
               commit — too late. Through Lenis, not window.scrollTo: a raw
               scroll lasts one frame before Lenis's raf writes its own
               remembered position back. */
            const lenis = getLenis()
            if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
            else window.scrollTo(0, 0)
            router.push(url.pathname + url.search)
          },
        })
        .to(dimRef.current, { autoAlpha: 1, ease: "power2.out" }, 0)
        .to(main, { y: 80, ease: "power2.in" }, 0)
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [reduced, router])

  /* Back/forward take the same protection as pushes, for the same reason:
     the browser hands the App Router a popstate while the page still sits at
     the OLD route's scroll offset, the new tree's ScrollTriggers get created
     against it, and deep offsets crash refresh (see onComplete above).
     Trade-off, measured: back now lands at the top of the previous page —
     with Lenis in the loop the router's own post-commit restoration does not
     survive. Accepted: a story-scroll page restarting from its top beats an
     "Application error" screen. Runs under reduced motion too — the crash
     has nothing to do with animation. */
  useEffect(() => {
    const onPop = () => {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
      else window.scrollTo(0, 0)
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

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
