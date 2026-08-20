import type { Lang } from "@/lib/i18n"

export const navItems: { href: string; label: Record<Lang, string> }[] = [
  { href: "/", label: { en: "About", fr: "À propos" } },
  { href: "/team", label: { en: "Our Team", fr: "Notre équipe" } },
  { href: "/contact", label: { en: "Contact us", fr: "Nous joindre" } },
]
