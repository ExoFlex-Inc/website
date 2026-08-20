"use client";

import { type FC, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import Section from "@/components/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HEADING = "Every session leaves a record.";
const SUBHEADING =
  "Repetitions, active range, effort distribution and the quantity of assistance supplied are captured per session. The clinician reads a measurable trace between appointments instead of a recollection at the next one.";

const SCREENS = [
  {
    key: "plans",
    tab: "Personalized plans",
    image: "/images/interface/planning.png",
    alt: "Planning screen showing per-joint angle, torque and repetition targets",
    body: "A specialist configures personalized exercise plans by setting angles, torque, repetitions and speed for each joint movement.",
  },
  {
    key: "monitoring",
    tab: "Live monitoring",
    image: "/images/interface/hmi.png",
    alt: "Live monitoring screen with real-time motor data during a session",
    body: "Real-time monitoring with progress tracking, live motor data and session controls for the person using the device.",
  },
  {
    key: "insights",
    tab: "Performance insights",
    image: "/images/interface/activity.png",
    alt: "Activity screen graphing amplitude trends and average joint angles over time",
    body: "Interactive graphs show performance over time, including amplitude trends, missed sessions and average joint angles.",
  },
];

const Interface: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || reduced) return;

      const rows = containerRef.current.querySelectorAll("[data-reveal]");
      if (!rows.length) return;

      /* from() rather than set()+to(), so a trigger that never resolves leaves
         the content at its natural, visible state. */
      gsap.from(rows, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
    },
    { dependencies: [pathname, reduced], scope: containerRef, revertOnUpdate: true }
  );

  const current = SCREENS[active];

  return (
    <Section id="software" label="Session data">
      <div ref={containerRef}>
        <h2
          data-reveal
          className="display text-[length:var(--t-h2)]"
          style={{ maxWidth: "22ch" }}
        >
          {HEADING}
        </h2>
        <p
          data-reveal
          className="mt-6 text-[length:var(--t-body)] leading-relaxed text-slate"
          style={{ maxWidth: "60ch" }}
        >
          {SUBHEADING}
        </p>

        {/* Segmented control. Radio semantics rather than buttons, because this
            selects between views of one thing. */}
        <div
          data-reveal
          role="tablist"
          aria-label="Application screens"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-hair pb-px"
        >
          {SCREENS.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`screen-${s.key}`}
              onClick={() => setActive(i)}
              className={`label label--plain relative -mb-px border-b pb-3 transition-colors ${
                active === i
                  ? "border-accent text-ink"
                  : "border-transparent hover:text-ink"
              }`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div
          data-reveal
          id={`screen-${current.key}`}
          role="tabpanel"
          className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-hair bg-raised">
            {SCREENS.map((s, i) => (
              <Image
                key={s.key}
                src={s.image}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority={i === 0}
                className={`object-contain transition-opacity duration-500 ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="lg:pt-2">
            <p className="text-[length:var(--t-body)] leading-relaxed text-slate">
              {current.body}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Interface;
