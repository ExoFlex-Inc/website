import type { Metadata } from "next"
import { cookies } from "next/headers"
import { SITE_URL } from "@/lib/site"
import { LanguageProvider, type Lang } from "@/lib/i18n"
import "@/app/styles/globals.css"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import Footer from "@/components/Footer"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import SmoothScroll from "@/components/SmoothScroll"
import PageTransition from "@/components/PageTransition"
import localFont from "next/font/local"

/**
 * One typeface for the whole site.
 *
 * TomatoGrotesk is the brand face and already a tight grotesque, so display,
 * body and the uppercase label layer are treatments of it rather than three
 * families. It is self-hosted, which means the page makes no request to a font
 * CDN at all — the single biggest lever on first paint for visitors on slow
 * connections.
 */
const tomatoGrotesk = localFont({
  src: [
    { path: "/fonts/TomatoGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/TomatoGrotesk-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "/fonts/TomatoGrotesk-SemiBoldSlanted.woff2", weight: "600", style: "italic" },
    { path: "/fonts/TomatoGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "/fonts/TomatoGrotesk-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-tomato",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

/* Organization card for search engines. Deliberately only verifiable public
   facts — name, coordinates, profiles. No product claims: the regulatory
   footing in the footer applies to structured data too. */
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ExoFlex",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  email: "info@exoflex.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sherbrooke",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  sameAs: [
    "https://www.linkedin.com/company/exoflex/",
    "https://www.facebook.com/exoflex66",
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /* The cookie decides the server-rendered language; the provider carries it
     to every client component so the toggle needs no navigation. French is
     the default: Québec company, Québec audience, Charte de la langue. */
  const lang: Lang =
    (await cookies()).get("lang")?.value === "en" ? "en" : "fr"

  return (
    <html lang={lang} className={`${tomatoGrotesk.variable} scroll-smooth`}>
      {/* overflow-x-CLIP, not -hidden: hidden makes body a scroll container,
          and iOS Safari then leaves a persistent band of exposed canvas above
          the document when its toolbar collapses or expands mid-scroll — the
          beige bar over the dark hero on phones. clip clips the same overflow
          without the scroll-container semantics. */}
      <body className="relative min-h-screen max-w-full overflow-x-clip bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <LanguageProvider initial={lang}>
        <a className="skip-link" href="#main">
          {lang === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>

        {/* Reading position on a long page. Scroll-linked, so it is a response
            to input rather than autonomous motion, and stays on for
            reduced-motion visitors. */}
        <SmoothScroll />
        <ScrollProgress className="z-[100]" />
        <PageTransition />

        <Header />
        <MobileNav />

        {/* Skip-link target only. Pages own their own <main>, so this must not
            be one — contact, team and the legal pages would nest inside it. */}
        <div id="main">{children}</div>

        <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
