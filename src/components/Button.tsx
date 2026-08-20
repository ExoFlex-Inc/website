import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  /** `solid` is the one primary action; `quiet` is a rule-underlined text link. */
  variant?: "solid" | "quiet";
  className?: string;
};

/**
 * The primary action is ink on paper, not brand blue on paper.
 *
 * The ExoFlex blue only reaches 4.05:1 behind white text, which fails AA at
 * body size. Ink reaches 15:1, and reserving the blue for focus rings, active
 * states and small accents is also what keeps it reading as an accent by the
 * time you get to the bottom of the page.
 */
export default function Button({
  href,
  children,
  variant = "solid",
  className,
}: Props) {
  if (variant === "quiet") {
    return (
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-2 text-sm font-medium text-slate",
          "border-b border-hair-strong pb-1 transition-colors duration-200",
          "hover:border-accent-ink hover:text-ink",
          className
        )}
      >
        {children}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5",
        "text-sm font-medium text-on-ink transition-colors duration-200",
        "hover:bg-accent-ink",
        className
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
