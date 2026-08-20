import { Metadata } from "next"
import { cookies } from "next/headers"
import TeamContent from "./TeamContent"

const META: Record<"en" | "fr", Metadata> = {
  en: {
    title: "ExoFlex — The team",
    description:
      "The founding team building ExoFlex and the researchers and entrepreneurs advising them.",
    openGraph: {
      title: "ExoFlex — The team",
      description:
        "The founding team building ExoFlex and the researchers and entrepreneurs advising them.",
    },
  },
  fr: {
    title: "ExoFlex — L'équipe",
    description:
      "L'équipe fondatrice qui construit ExoFlex, et les chercheurs et entrepreneurs qui la conseillent.",
    openGraph: {
      title: "ExoFlex — L'équipe",
      description:
        "L'équipe fondatrice qui construit ExoFlex, et les chercheurs et entrepreneurs qui la conseillent.",
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = (await cookies()).get("lang")?.value === "en" ? "en" : "fr"
  return META[lang]
}

export default function TeamPage() {
  return <TeamContent />
}
