import type Lenis from "lenis"

/* The live Lenis instance, for the one consumer outside SmoothScroll:
   PageTransition has to reset the scroll THROUGH Lenis before a route push —
   a raw window.scrollTo lasts exactly one frame before Lenis's raf writes its
   own remembered position back. */
let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}

export const getLenis = () => instance
