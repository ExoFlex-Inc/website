import { Metadata } from "next"
import { cookies } from "next/headers"
import ContactContent from "./ContactContent"

const META: Record<"en" | "fr", Metadata> = {
  en: {
    title: "ExoFlex — Contact us",
    description:
      "Request a clinical demonstration of ExoFlex, or get in touch about clinical partnership, investment or general enquiries.",
    openGraph: {
      title: "ExoFlex — Contact us",
      description:
        "Request a clinical demonstration of ExoFlex, or get in touch about clinical partnership, investment or general enquiries.",
      images: [{ url: "/images/meta.jpg" }],
    },
  },
  fr: {
    title: "ExoFlex — Nous joindre",
    description:
      "Demandez une démonstration clinique d'ExoFlex, ou écrivez-nous pour un partenariat clinique, un investissement ou une demande générale.",
    openGraph: {
      title: "ExoFlex — Nous joindre",
      description:
        "Demandez une démonstration clinique d'ExoFlex, ou écrivez-nous pour un partenariat clinique, un investissement ou une demande générale.",
      images: [{ url: "/images/meta.jpg" }],
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = (await cookies()).get("lang")?.value === "en" ? "en" : "fr"
  return META[lang]
}

export default function ContactPage() {
  return <ContactContent />
}
