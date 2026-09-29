"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { awards, education, experience, marquee, stack } from "@/data/profile";
import { EASE, Reveal, SplitWords } from "./motion";

function SectionHead({ title, index, note }: { title: string; index: string; note: string }) {
  return (
    <div className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
      <h2 className="display text-[17vw] leading-[0.82] md:text-[10rem]">
        <SplitWords text={title} />
      </h2>
      <Reveal className="tag max-w-xs text-mute md:pb-3 md:text-right">
        <span className="text-lime">{index}</span> — {note}
      </Reveal>
    </div>
  );
}

const typeColor: Record<string, string> = { feat: "#C8FF3E", fix: "#FFB547", sec: "#A58BFF", perf: "#7FD1FF", ci: "#EEEEEA" };

export function Experience() {
  const log = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: log, offset: ["start 75%", "end 55%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative border-t border-line bg-ink-2 py-24 md:py-36">
      <div className="container-x">
        <SectionHead title="Experience" index="02" note="where the full stack met production" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* left: the role + real screenshots */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
            <Reveal className="flex flex-col gap-3">
              <span className="tag flex items-center gap-2 text-lime">
                <span className="size-2 rounded-full bg-lime" /> {experience.period.toLowerCase()}
              </span>
              <span className="display text-4xl md:text-5xl">{experience.role}</span>
              <span className="text-lg text-mute">
                {experience.company} · {experience.place}
              </span>
            </Reveal>
            <Reveal delay={0.1} className="relative pb-10 pr-10 md:pr-16">
              <a href={experience.repo} target="_blank" rel="noopener noreferrer" data-cursor="view repo ↗" className="block overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)]">
                <Image src={experience.shots.main.src} alt={experience.shots.main.alt} width={experience.shots.main.w} height={experience.shots.main.h} sizes="(min-width:1024px) 45vw, 92vw" className="h-auto w-full" />
              </a>
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                className="absolute bottom-0 right-0 w-[24%] overflow-hidden rounded-[18px] border-4 border-[#1a1a1d] shadow-2xl"
              >
                <Image src={experience.shots.mobile.src} alt={experience.shots.mobile.alt} width={experience.shots.mobile.w} height={experience.shots.mobile.h} sizes="200px" className="h-auto w-full" />
              </motion.div>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-3">
              <p className="text-lg">
                <span className="font-semibold">{experience.project}</span> <span className="text-soft">— {experience.tagline}</span>
              </p>
              <div className="tag flex flex-wrap gap-x-4 gap-y-1 text-mute">
                {experience.stack.map((s) => (
                  <span key={s}>#{s.toLowerCase().replace(/\s+/g, "")}</span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* right: the work, as a commit log */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="tag mb-6 flex items-center justify-between rounded-lg border border-line bg-panel px-4 py-3 text-mute">
              <span>
                <span className="text-lime">$</span> git log --reverse taskforge
              </span>
              <span className="hidden sm:inline">{experience.commits.length} commits worth mentioning</span>
            </Reveal>
            <ol ref={log} className="relative flex flex-col">
              <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10" />
              <motion.span aria-hidden="true" style={{ scaleY: grow }} className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-lime" />
              {experience.commits.map((c, i) => (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.05 * i }}
                  className="group relative flex gap-6 pb-10 last:pb-0"
                >
                  <span className="relative z-10 mt-1.5 size-[15px] shrink-0 rounded-full border-2 bg-ink-2 transition-colors duration-500 group-hover:bg-lime" style={{ borderColor: typeColor[c.type] }} />
                  <div className="flex flex-col gap-2">
                    <span className="tag" style={{ color: typeColor[c.type] }}>
                      {c.type}({c.scope}):
                    </span>
                    <span className="text-xl font-semibold leading-snug md:text-2xl">{c.title}</span>
                    <span className="leading-relaxed text-soft">{c.body}</span>
                  </div>
                </motion.li>
              ))}
            </ol>
            <Reveal className="mt-10">
              <a href={experience.repo} target="_blank" rel="noopener noreferrer" className="tag inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 transition-colors hover:border-lime hover:text-lime">
                github.com/ayushYadav1107/TaskForge ↗
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Toolbox() {
  const row = [...marquee, ...marquee];
  const entries = Object.entries(stack);
  return (
    <section id="toolbox" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div className="container-x">
        <SectionHead title="Toolbox" index="03" note="what I reach for, as a config file" />
      </div>
      <div className="group -rotate-1 overflow-hidden border-y border-line bg-lime py-4 text-ink md:py-5">
        <div className="display flex w-max animate-marquee gap-8 whitespace-nowrap text-4xl group-hover:[animation-play-state:paused] md:text-6xl">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8">
              {t}
              <span aria-hidden="true">✳</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-x mt-16 md:mt-24">
        <Reveal className="overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="flex h-11 items-center gap-2 border-b border-line px-4">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="tag ml-3 text-mute">stack.json</span>
          </div>
          <div className="overflow-x-auto p-5 font-mono text-[0.82rem] leading-7 md:p-8 md:text-[0.95rem]" data-lenis-prevent>
            <p className="text-mute">{"{"}</p>
            {entries.map(([k, items], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="flex flex-col gap-1 py-1.5 pl-4 md:flex-row md:gap-4 md:pl-8"
              >
                <span className="shrink-0 text-violet md:w-44">&quot;{k}&quot;<span className="text-mute">: [</span></span>
                <span className="flex flex-wrap gap-x-1 gap-y-0.5">
                  {items.map((it, j) => (
                    <span key={it} className="text-bone">
                      <span className="rounded px-0.5 transition-colors hover:bg-lime hover:text-ink">&quot;{it}&quot;</span>
                      <span className="text-mute">{j < items.length - 1 ? "," : ""}</span>
                    </span>
                  ))}
                  <span className="text-mute">]{i < entries.length - 1 ? "," : ""}</span>
                </span>
              </motion.div>
            ))}
            <p className="text-mute">{"}"}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Recognition() {
  return (
    <section id="awards" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <SectionHead title="Receipts" index="04" note="awards, programs & certifications" />
        <ul className="border-b border-line">
          {awards.map((a, i) => {
            const inner = (
              <>
                <span className="tag text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl font-semibold leading-snug tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2 md:col-span-6 md:text-[1.6rem]">
                  {a.title}
                  {a.href && <span className="ml-2 text-lime">↗</span>}
                </span>
                <span className="text-soft md:col-span-3">{a.detail}</span>
                <span className="md:col-span-2 md:text-right">
                  <span className={`tag rounded-full px-3 py-1 ${a.tag === "certified" ? "bg-lime text-ink" : "border border-white/20 text-soft"}`}>{a.tag}</span>
                </span>
              </>
            );
            const cls = "relative grid gap-2 py-6 md:grid-cols-12 md:items-center md:gap-6 md:py-7";
            return (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.04 }}
                className="group relative border-t border-line"
              >
                <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-white/[0.03] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                {a.href ? (
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.08} className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-7">
              <div className="tag flex justify-between text-mute">
                <span>{i === 0 ? "education" : "school"}</span>
                <span>{e.period}</span>
              </div>
              <span className="display text-3xl">{e.school}</span>
              <span className="text-soft">{e.degree}</span>
              <span className={`tag text-sm ${i === 0 ? "text-lime" : "text-bone"}`}>{e.score}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
