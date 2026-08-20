"use client"

import Image from "next/image"
import Link from "next/link"
import { team, advisors } from "@/lib/team"
import { useLang } from "@/lib/i18n"

const COPY = {
  en: {
    label: "Team",
    title: "Built by the founding team, steered by professionals.",
    intro:
      "The founding team carries the technical development, the regulatory file and the finances. Around them, an advisory circle of researchers and entrepreneurs keeps every design decision anchored to what daily life after a stroke actually demands.",
    advisors: "Advisors",
  },
  fr: {
    label: "Équipe",
    title: "Conçu par l'équipe fondatrice, guidé par des professionnels.",
    intro:
      "L'équipe fondatrice porte le développement technique, le dossier réglementaire et les finances. Autour d'elle, un cercle-conseil de chercheurs et d'entrepreneurs garde chaque décision de conception ancrée dans ce que le quotidien après un AVC exige réellement.",
    advisors: "Conseillers",
  },
} as const

export default function TeamContent() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <main className="mx-auto max-w-screen-2xl px-4 pt-36 pb-[var(--sec-y)] md:px-6">
      <p className="label">{t.label}</p>
      <h1
        className="display mt-6 text-[length:var(--t-h1)]"
        style={{ maxWidth: "16ch" }}
      >
        {t.title}
      </h1>
      <p
        className="mt-8 text-[length:var(--t-body)] leading-relaxed text-slate"
        style={{ maxWidth: "58ch" }}
      >
        {t.intro}
      </p>

      <ul className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => {
          const card = (
            <>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] bg-raised">
                <Image
                  src={m.avatar}
                  alt={`${m.firstName} ${m.lastName}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  priority
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {m.firstName} {m.lastName}
                {m.credentials && (
                  <span className="font-normal text-slate">, {m.credentials}</span>
                )}
              </h2>
              <p className="label mt-2">{m.role[lang]}</p>
              <p className="label label--plain mt-3 leading-relaxed text-slate">
                {m.bio[lang]}
              </p>
            </>
          )

          return (
            <li key={m.avatar} className="border-t border-hair-strong pt-6">
              {m.linkedin ? (
                <Link
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {card}
                </Link>
              ) : (
                <div>{card}</div>
              )}
            </li>
          )
        })}
      </ul>

      <section aria-labelledby="advisors-h" className="mt-24">
        <h2 id="advisors-h" className="label">
          {t.advisors}
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* same pattern as the founders above: the whole card is the link,
              and the colour returning on hover is the affordance */}
          {advisors.map((a) => {
            const card = (
              <>
                <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius)] bg-raised">
                  <Image
                    src={a.avatar}
                    alt={a.name}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 text-base font-semibold">{a.name}</p>
                {a.org && (
                  <p className="label label--plain mt-1 text-ink/80">{a.org}</p>
                )}
                <p className="label label--plain mt-1 text-slate">{a.role[lang]}</p>
              </>
            )

            return (
              <li key={a.name} className="border-t border-hair pt-5">
                {a.link ? (
                  <Link
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {card}
                  </Link>
                ) : (
                  <div>{card}</div>
                )}
              </li>
            )
          })}
        </ul>
      </section>

    </main>
  )
}
