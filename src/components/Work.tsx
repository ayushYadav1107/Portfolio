"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { profile, projects, type Project, type Shot } from "@/data/profile";
import { Magnetic, Reveal, SplitWords } from "./motion";

function BrowserFrame({ shot, url, className, priority }: { shot: Shot; url: string; className?: string; priority?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/12 bg-panel shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)] ${className ?? ""}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="tag ml-3 truncate rounded-md bg-white/[0.06] px-2.5 py-0.5 text-[0.65rem] text-mute">{url}</span>
      </div>
      <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} priority={priority} sizes="(min-width: 1024px) 55vw, 92vw" className="block h-auto w-full" />
    </div>
  );
}

function Panel({ p, progress, idx }: { p: Project; progress?: MotionValue<number>; idx: number }) {
  const host = new URL(p.live).host;
  const fallback = useMotionValue(0);
  // inset screenshot drifts against the main one while the reel moves
  const drift = useTransform(progress ?? fallback, [idx / 3 - 0.3, idx / 3 + 0.3], [50, -50]);

  return (
    <article id={p.slug} className="grid w-full shrink-0 scroll-mt-24 items-center gap-10 lg:h-full lg:w-[86vw] lg:max-w-[1320px] lg:grid-cols-12 lg:gap-12">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <div className="tag flex items-center gap-3 text-mute">
          <span className="text-lime">{p.index}</span>
          <span className="h-px w-8 bg-white/20" />
          {p.kicker.toLowerCase()} · {p.year}
        </div>
        <h3 className="display text-[3.6rem] leading-[0.9] md:text-[5.5rem]">{p.name}</h3>
        <p className="text-xl font-medium leading-snug text-bone">{p.tagline}</p>
        <p className="leading-relaxed text-soft">{p.summary}</p>
        <dl className="flex flex-col border-t border-line font-mono text-[0.8rem]">
          {p.spec.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[88px_1fr] gap-3 border-b border-line py-2.5">
              <dt className="text-violet">{k}</dt>
              <dd className="text-soft">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full bg-lime px-6 font-semibold text-ink transition-transform hover:scale-[1.04]">
              Live demo ↗
            </a>
          </Magnetic>
          <Magnetic>
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 font-medium transition-colors hover:bg-white/5">
              Source ↗
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="relative lg:col-span-7">
        <a href={p.live} target="_blank" rel="noopener noreferrer" data-cursor="open live ↗" aria-label={`Open ${p.name} live demo`} className="block transition-transform duration-700 hover:-translate-y-1">
          <BrowserFrame shot={p.hero} url={host} priority={idx === 0} />
        </a>
        <motion.div style={{ y: drift }} className="absolute -bottom-12 -right-4 hidden w-[42%] md:block">
          <BrowserFrame shot={p.inset} url={host} className="border-white/20" />
        </motion.div>
        <div className="tag mt-6 flex flex-wrap gap-x-4 gap-y-1 text-mute md:mt-8 md:max-w-[55%]">
          {p.stack.map((s) => (
            <span key={s}>#{s.toLowerCase().replace(/\s+/g, "")}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function EndCard() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center gap-6 rounded-3xl border border-dashed border-white/20 p-8 lg:h-[70%] lg:w-[34vw]">
      <span className="tag text-lime">{"// more"}</span>
      <p className="display text-5xl leading-[0.95]">Everything else lives on GitHub.</p>
      <a href={profile.socials[1].href} target="_blank" rel="noopener noreferrer" className="tag inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-bone transition-colors hover:border-lime hover:text-lime">
        github.com/ayushYadav1107 ↗
      </a>
    </div>
  );
}

export function Work() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);
  const dist = useMotionValue(0);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      setPinned(mq.matches);
      if (track.current) {
        const d = Math.max(0, track.current.scrollWidth - window.innerWidth);
        setDistance(d);
        dist.set(d);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [dist, pinned]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const x = useTransform([smooth, dist], ([v, d]: number[]) => -v * d);
  const bar = useTransform(smooth, (v) => v);
  const [current, setCurrent] = useState(1);
  useEffect(() => smooth.on("change", (v) => setCurrent(Math.min(projects.length, Math.floor(v * (projects.length + 0.6)) + 1))), [smooth]);

  return (
    <section id="work" className="relative">
      <div className="container-x flex flex-col gap-6 pb-12 pt-24 md:flex-row md:items-end md:justify-between md:pb-16 md:pt-36">
        <h2 className="display text-[18vw] leading-[0.82] md:text-[10rem]">
          <SplitWords text="Selected" />
          <br />
          <span className="text-lime">
            <SplitWords text="work." delay={0.1} />
          </span>
        </h2>
        <Reveal className="flex max-w-sm flex-col gap-3 md:pb-3">
          <span className="tag text-mute">01 — three products, all deployed</span>
          <p className="leading-relaxed text-soft">Real screenshots from each repo. Every one has a live demo you can open right now.</p>
        </Reveal>
      </div>

      {pinned ? (
        <div ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <motion.div ref={track} style={{ x }} className="flex h-[78vh] items-center gap-[8vw] pl-[max(5rem,calc((100vw-1440px)/2+5rem))] pr-[8vw]">
              {projects.map((p, i) => (
                <Panel key={p.slug} p={p} idx={i} progress={smooth} />
              ))}
              <EndCard />
            </motion.div>
            <div className="container-x absolute inset-x-0 bottom-8 flex items-center gap-6">
              <span className="tag tabular-nums text-bone">
                0{current} <span className="text-mute">/ 0{projects.length}</span>
              </span>
              <div className="h-px flex-1 bg-white/10">
                <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-lime" />
              </div>
              <span className="tag text-mute">scroll →</span>
            </div>
          </div>
        </div>
      ) : (
        <div ref={section} className="container-x flex flex-col gap-24 pb-24">
          <div ref={track} className="flex flex-col gap-28">
            {projects.map((p, i) => (
              <Reveal key={p.slug} y={60}>
                <Panel p={p} idx={i} />
              </Reveal>
            ))}
            <EndCard />
          </div>
        </div>
      )}
    </section>
  );
}
