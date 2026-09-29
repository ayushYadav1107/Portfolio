"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { profile } from "@/data/profile";
import { EASE } from "./motion";

const links = [
  { href: "#work", label: "work", n: "01" },
  { href: "#experience", label: "experience", n: "02" },
  { href: "#toolbox", label: "toolbox", n: "03" },
  { href: "#contact", label: "contact", n: "04" },
];

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tag hidden tabular-nums text-mute lg:inline" suppressHydrationWarning>
      bhopal {now ?? "--:--:--"} ist
    </span>
  );
}

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setSolid(y > 60);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          solid && !open ? "border-b border-line bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <a href="#top" className="flex items-center gap-3" aria-label={`${profile.name} — home`}>
            <span className="display flex h-8 items-center rounded-md bg-lime px-2 text-lg leading-none text-ink">AY/</span>
            <span className="tag hidden text-bone sm:inline">ayush yadav</span>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group tag flex items-start gap-1 text-soft transition-colors hover:text-lime">
                  <span className="text-[0.6rem] text-mute group-hover:text-lime">{l.n}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5">
            <Clock />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="tag hidden h-10 items-center gap-2 rounded-full bg-lime px-4 font-medium text-ink transition-transform hover:scale-[1.04] md:inline-flex"
            >
              résumé.pdf ↗
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="tag h-11 rounded-full border border-white/25 px-5 md:hidden"
            >
              {open ? "close" : "menu"}
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-lime" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="dotgrid fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-28 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                    className="display flex items-start gap-3 text-[4.2rem] leading-[0.95]"
                  >
                    <span className="tag mt-3 text-lime">{l.n}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              <a href={profile.resume} target="_blank" rel="noopener" className="tag text-lime">
                résumé.pdf ↗
              </a>
              <a href={`mailto:${profile.email}`} className="text-lg font-medium underline underline-offset-4">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
