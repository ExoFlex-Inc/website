import type { Lang } from "@/lib/i18n"

/**
 * Canonical product reference assets, in order of authority.
 *
 *  1. `/images/product/device-white.jpg`  — the product on white, supplied by
 *     the user 2026-08-03 as THE reference element. Cleanest subject
 *     isolation, so this is the image to hand to any image or video model.
 *  2. `/images/product/device-render.png` — same device, transparent
 *     background, used by the annotated hero.
 *  3. `/videos/device_orbit.mp4`          — (1)'s sibling render composited on
 *     the hero charcoal and animated by Higgsfield image-to-video. The
 *     geometry is the device's own; only the camera moves.
 *
 * Rule for any generated media: start from one of the real renders above,
 * inspect the output frame by frame for invented mechanics, and caption it for
 * what it is. Never let a synthetic frame pass as documentary footage.
 */

/**
 * Honest labelling for the upper-limb imagery.
 *
 * The current hero footage, stage clips and product render are generative
 * visualisations, not photographs of the device in clinical use. This page also
 * carries "investigational device" language and clinician-survey figures, so
 * letting a synthetic image read as documentary evidence is a credibility risk
 * — a clinician who spots it discounts everything around it.
 *
 * Every figure that uses one of those assets renders this caption. Once real
 * photography and footage exist, set these to `null` and the captions
 * disappear everywhere at once.
 */
/* Removed at the user's request 2026-08-06 — restore the labelled objects if
   the honesty captions need to come back. */
export const MEDIA_NOTE: Record<Lang, string> | null = null

/** Same, for the white-on-transparent CAD render. */
export const RENDER_NOTE: Record<Lang, string> | null = null
