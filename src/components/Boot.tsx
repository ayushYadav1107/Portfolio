"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./motion";

const LINES = [
  { t: "resolving stack", v: "ui · api · data · agents" },
  { t: "linking agents", v: "langgraph · mcp" },
  { t: "loading work", v: "aerocode · voyagen · resumetrics" },
];

/** A one-second "npm run dev" boot sequence, shown once per browser session. */
export function Boot() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.boot === "done") {
      const id = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(id);
    }
    const timers = [
      setTimeout(() => setStep(1), 180),
      setTimeout(() => setStep(2), 420),
      setTimeout(() => setStep(3), 660),
      setTimeout(() => setStep(4), 900),
      setTimeout(() => {
        root.dataset.boot = "done";
        window.dispatchEvent(new Event("boot:done"));
        setShow(false);
        try {
          sessionStorage.setItem("booted", "1");
        } catch {}
      }, 1250),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {/* Runs before paint: skip the intro for returning visitors and reduced-motion users. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('booted')||matchMedia('(prefers-reduced-motion: reduce)').matches)(document.documentElement.classList.add('booted'),document.documentElement.dataset.boot='done')}catch(e){}`,
        }}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            aria-hidden="true"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="boot fixed inset-0 z-[90] flex flex-col justify-end bg-ink p-5 font-mono text-[13px] text-mute [html.booted_&]:hidden md:p-10 md:text-sm"
            style={{ clipPath: "inset(0 0 0% 0)" }}
          >
            <div className="flex flex-col gap-1.5">
              <p className="text-bone">
                <span className="text-lime">ayush@portfolio</span> ~ % npm run dev
              </p>
              {LINES.map((l, i) =>
                step > i ? (
                  <p key={l.t} className="flex gap-3">
                    <span className="text-lime">▲</span>
                    <span className="w-40 shrink-0">{l.t}</span>
                    <span className="truncate text-soft">{l.v}</span>
                  </p>
                ) : null,
              )}
              {step > 3 && (
                <p className="text-bone">
                  <span className="text-lime">✓</span> ready — welcome in.
                </p>
              )}
            </div>
            <div className="mt-6 h-px w-full bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: EASE }}
                className="h-px origin-left bg-lime"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
