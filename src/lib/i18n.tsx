"use client"

import { createContext, useContext, useState } from "react"

export type Lang = "en" | "fr"

/**
 * Bilingual switch, the light way: a cookie decides the server-rendered
 * language (read in the root layout), this context carries it to every client
 * component, and toggling never needs a navigation because every piece of
 * translated copy lives in client components.
 *
 * Copy is co-located: each section keeps its own `COPY = { en, fr }` object
 * next to the markup that uses it, so a section's two languages never drift
 * apart in separate message files.
 */
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
})

export function LanguageProvider({
  initial,
  children,
}: {
  initial: Lang
  children: React.ReactNode
}) {
  const [lang, setLangState] = useState<Lang>(initial)

  const setLang = (l: Lang) => {
    setLangState(l)
    document.cookie = `lang=${l};path=/;max-age=31536000;samesite=lax`
    document.documentElement.lang = l
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
