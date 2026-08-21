import { Metadata } from "next";

import Hero from "@/sections/Hero";
import FadeInText from "@/sections/FadeInText";
import AlternativeText from "@/sections/AlternativeText";
import Scene from "@/sections/Scene";
import Evidence from "@/sections/Evidence";
import Timeline from "@/sections/Timeline";
import Inquiry from "@/sections/Inquiry";

/* Metadata follows the language cookie — the layout already reads it, so the
   route is dynamic either way. French is the default. */
const META: Record<"en" | "fr", Metadata> = {
  en: {
    title: "ExoFlex — Portable adaptive upper-limb orthosis for life after stroke",
    description:
      "ExoFlex is an investigational adaptive upper-limb orthosis. Surface EMG, inertial and force sensing detect the movement a person initiates, and an Assist-As-Needed controller supplies only the assistance that movement is missing.",
    openGraph: {
      title: "ExoFlex — Portable adaptive upper-limb orthosis for life after stroke",
      images: [
        {
          url: "/images/meta.jpg",
          alt: "The ExoFlex device assisting an everyday movement",
        },
      ],
    },
  },
  fr: {
    title: "ExoFlex — Orthèse d'adaptation portable du membre supérieur après un AVC",
    description:
      "ExoFlex est une orthèse d'adaptation expérimentale pour le membre supérieur. Des capteurs EMG de surface, inertiels et de force détectent le mouvement que la personne amorce, et un contrôleur Assist-As-Needed fournit uniquement l'assistance qui manque à ce mouvement.",
    openGraph: {
      title: "ExoFlex — Orthèse d'adaptation portable du membre supérieur après un AVC",
      images: [
        {
          url: "/images/meta.jpg",
          alt: "L'appareil ExoFlex assistant un geste du quotidien",
        },
      ],
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { cookies } = await import("next/headers");
  const lang = (await cookies()).get("lang")?.value === "en" ? "en" : "fr";
  return META[lang];
}

export default function Index() {
  return (
    <main>
      {/* The canvas — what Safari paints behind the status bar and in the
          rubber-band bounce — is html's background, paper by default. This
          page is charcoal at both edges (hero on top, film footer below), so
          the exposed canvas read as a beige bar on iOS. Scoped here: the
          other routes open on paper and are right already. */}
      <style>{`html{background:#363639}`}</style>
      <Hero />
      {/* Higher stacking context + opaque backgrounds: this block is what
          slides over the pinned hero. */}
      <div className="relative z-10">
        <FadeInText />
        {/* Stages 01–03 of the control loop */}
        <AlternativeText />
        <Scene />
        {/* from the motion band to the end of the page the film register
            holds: Evidence, the partner ticker, the milestones and the
            contact all stay dark */}
        {/* native sticky: Validation freezes at the top of the viewport and
            the milestones slide over it. The relative wrapper bounds the
            sticky so it releases after the milestones — without it the block
            stays pinned (and painted) over everything to the end of the page */}
        <div className="relative">
          <div data-validation className="tone-film flex min-h-svh flex-col lg:sticky lg:top-0">
            <Evidence />
          </div>
          {/* dwell: the ledger holds alone for three quarters of a viewport of
              scroll before the milestones start climbing over it. Without it
              the cover began the moment the last numeral finished counting up,
              so the figures were gone before they could be read. Desktop only
              — the sticky cover is lg-and-up, and on a phone this would just
              be dead space. */}
          <div aria-hidden="true" className="hidden lg:block lg:h-[75svh]" />
          <Timeline />
        </div>
        <Inquiry />
      </div>
    </main>
  );
}
