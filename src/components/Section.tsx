import { cn } from "@/lib/utils"
import ChapterMark from "@/components/ChapterMark"

type Props = {
  id?: string
  /** Eyebrow above the content, e.g. "Validation". */
  label?: string
  /** Chapter counter shown before the label, e.g. "01" — the reference
   * paces its long pages with numbered chapters. */
  index?: string
  /** `sunk` sets the alternating band, `raised` a lighter card-like band.
   * `film` keeps the section in the hero's dark register — the corridor that
   * runs from the hero through Context and Journey into the motion band; the
   * semantic tokens remap inside it (see `.tone-film` in globals.css). */
  tone?: "paper" | "sunk" | "raised" | "film"
  flush?: boolean
  className?: string
  containerClassName?: string
  children: React.ReactNode
}

const TONES = {
  paper: "bg-paper",
  sunk: "bg-sunk",
  raised: "bg-raised",
  film: "tone-film",
} as const

/**
 * Section shell.
 *
 * The previous revision put a sticky numbered label in a left rail, which
 * belonged to the editorial register it was built for. This one sets the label
 * as an eyebrow directly above the heading, which is how the reference paces a
 * long page — and it frees the full measure for content instead of spending a
 * ninth of every viewport on a rail.
 */
export default function Section({
  id,
  label,
  index,
  tone = "paper",
  flush,
  className,
  containerClassName,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 md:px-6",
        TONES[tone],
        !flush && "py-[var(--sec-y)]",
        className
      )}
    >
      <div className={cn("mx-auto w-full max-w-screen-2xl", containerClassName)}>
        {label && <ChapterMark index={index} label={label} />}
        {children}
      </div>
    </section>
  )
}
