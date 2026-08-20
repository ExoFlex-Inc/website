"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/nav";
import { useLang } from "@/lib/i18n";

/**
 * Floating pill navigation.
 *
 * Plain CSS transitions rather than a motion library: this is a hover and a
 * background fade, and pulling GSAP in for it would cost more than it buys.
 * The mobile toggle lives in MobileNav, which owns its own panel.
 */
export default function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  /* One sliding pill instead of a per-link background: `current` moves on
     click, before the (deliberately slow) page transition commits, so the
     highlight glides to the destination instead of blinking out and back. */
  const navRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(pathname);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => setCurrent(pathname), [pathname]);

  useEffect(() => {
    const measure = () => {
      const el = navRef.current?.querySelector<HTMLElement>(
        `a[data-nav="${current}"]`
      );
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [current, lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* 96, not 90: PageTransition lifts #main to z-index 95 for the length of
       its entrance so the incoming page rises over the dim ground, and at 90
       this bar was painted over by it — it blanked for the whole 0.85s rise
       and popped back when clearProps dropped the z-index. The header is
       chrome outside #main, so it has to outrank that transient layer. Stays
       under the scroll progress bar (100) and the mobile nav (105/110). */
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[96]">
      <div
        className={cn(
          "mx-auto flex w-full max-w-screen-2xl items-center gap-4 px-4 transition-all duration-300 md:px-6",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <Link
          href="/"
          className="pointer-events-auto mr-auto flex items-center"
          aria-label="ExoFlex, home"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={132}
            height={40}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        {/* Desktop: links in a raised pill, the way the reference groups them */}
        <nav
          ref={navRef}
          aria-label="Main"
          className={cn(
            "pointer-events-auto relative hidden items-center rounded-full p-1 lg:flex",
            "border border-hair/70 backdrop-blur-md transition-colors duration-300",
            scrolled ? "bg-raised/90" : "bg-raised/60"
          )}
        >
          {pill && (
            <span
              aria-hidden="true"
              className="absolute bottom-1 top-1 rounded-full bg-ink transition-[left,width] duration-300 ease-out"
              style={{ left: pill.left, width: pill.width }}
            />
          )}
          {navItems.map((item) => {
            const active = item.href === current;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-nav={item.href}
                onClick={() => setCurrent(item.href)}
                aria-current={item.href === pathname ? "page" : undefined}
                className={cn(
                  "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                  active
                    ? "text-paper"
                    : "text-slate hover:bg-ink/6 hover:text-ink"
                )}
              >
                {item.label[lang]}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
          aria-label={lang === "en" ? "Passer au français" : "Switch to English"}
          className={cn(
            "pointer-events-auto hidden h-10 items-center rounded-full px-4 lg:inline-flex",
            "border border-hair/70 backdrop-blur-md transition-colors duration-300",
            scrolled ? "bg-raised/90" : "bg-raised/60",
            "text-sm font-medium text-slate hover:text-ink"
          )}
        >
          {lang === "en" ? "FR" : "EN"}
        </button>

        <Link
          href="/contact"
          className={cn(
            "pointer-events-auto hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5",
            "text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-ink lg:inline-flex"
          )}
        >
          {lang === "fr" ? "Demander une démonstration" : "Request a demonstration"}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
