import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

/**
 * True when the visitor has asked for reduced motion.
 *
 * This is a rehabilitation product: part of its audience is recovering from a
 * stroke or a vestibular injury, and pinned, scroll-scrubbed motion is exactly
 * what that preference exists to switch off. Sections use this to skip pinning
 * and scrubbing altogether rather than to shorten the animation — which also
 * means no element is left holding an animated-from opacity of zero.
 *
 * Defaults to `true` during server render so the first client paint is the
 * static layout, never a frame of motion that then gets cancelled.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true
  )
}
