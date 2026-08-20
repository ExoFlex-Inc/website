"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiFacebook, SiLinkedin } from "react-icons/si";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/nav";
import { useLang } from "@/lib/i18n";

/**
 * Mobile navigation. Below `lg` only — Header carries the desktop pill.
 *
 * Accessibility the previous revision was missing:
 *  - the panel is a labelled dialog and Escape closes it
 *  - focus moves into the panel on open and back to the toggle on close, so a
 *    keyboard user is not stranded behind the overlay
 *  - the toggle is 44×44, the minimum touch target
 *  - `overflow` is restored to its previous value rather than hardcoded to
 *    `auto`, which is what the old version did and which quietly made `body`
 *    a scroll container on every route
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={
          open
            ? lang === "fr" ? "Fermer le menu" : "Close menu"
            : lang === "fr" ? "Ouvrir le menu" : "Open menu"
        }
        className={cn(
          "fixed right-4 top-4 z-[110] grid h-11 w-11 place-items-center rounded-full",
          "border border-hair/70 bg-raised/90 text-ink backdrop-blur-md",
          "transition-colors duration-200 hover:bg-raised active:bg-sunk"
        )}
      >
        <span className="relative block h-3 w-4" aria-hidden="true">
          <span
            className={cn(
              "absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300",
              open ? "top-1.5 rotate-45" : "top-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300",
              open ? "top-1.5 -rotate-45" : "top-3"
            )}
          />
        </span>
      </button>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}
        className={cn(
          "fixed inset-0 z-[105] flex flex-col justify-center bg-paper px-6",
          "transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav>
          <ul className="space-y-2">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.href === pathname ? "page" : undefined}
                  className={cn(
                    "display block py-2 text-[clamp(2.2rem,11vw,3.2rem)] transition-all duration-300",
                    item.href === pathname ? "text-ink" : "text-slate",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  )}
                  style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
                >
                  {item.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper"
        >
          {lang === "fr" ? "Demander une démonstration" : "Request a demonstration"}
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
          className="mt-8 inline-flex w-fit items-center text-sm font-medium text-slate underline decoration-hair-strong underline-offset-4 transition-colors hover:text-ink"
        >
          {lang === "en" ? "Français" : "English"}
        </button>

        <div className="mt-12 flex items-center gap-4 border-t border-hair pt-6">
          <a
            href="https://www.linkedin.com/company/exoflex/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ExoFlex on LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-full text-slate transition-colors hover:text-ink"
          >
            <SiLinkedin aria-hidden className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/exoflex66"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ExoFlex on Facebook"
            className="grid h-11 w-11 place-items-center rounded-full text-slate transition-colors hover:text-ink"
          >
            <SiFacebook aria-hidden className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
