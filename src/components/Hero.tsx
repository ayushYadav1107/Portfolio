"use client";

import { motion } from "motion/react";
import { profile, stats } from "@/data/profile";
import { StackScene } from "./StackScene";
import { CountUp, EASE, Magnetic, SplitWords, useBooted } from "./motion";

export function Hero() {
  const booted = useBooted();
  const fade = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: booted ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay: d },
  });

  return (
    <section id="top" className="dotgrid relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      <div className="container-x relative flex min-h-[100svh] flex-col gap-12 pb-10 pt-28 md:pt-32">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-7 lg:col-span-7">
            <motion.p {...fade(0.05)} className="tag flex flex-wrap items-center gap-x-3 gap-y-1 text-mute">
              <span className="text-lime">{"//"}</span> full-stack software engineer
              <span className="text-white/20">—</span> {profile.location.toLowerCase()}
            </motion.p>

            <div className="flex flex-col gap-5">
              <h1 className="display flex items-end gap-[0.12em] text-[15.5vw] leading-[0.84] sm:text-[12.5vw] lg:text-[8.2vw] 2xl:text-[8.6rem]">
                <span>
                  <SplitWords text="Ayush Yadav" play={booted} delay={0.1} stagger={0.1} />
                </span>
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  animate={booted ? { scaleY: 1 } : undefined}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                  className="mb-[0.08em] inline-block h-[0.62em] w-[0.14em] origin-bottom bg-lime"
                />
              </h1>
              <p className="display text-[8.4vw] leading-[0.98] text-soft sm:text-[6vw] lg:text-[3.3vw] 2xl:text-[3.4rem]">
                <SplitWords text="I build the whole stack —" play={booted} delay={0.3} stagger={0.04} />
                <br />
                <SplitWords text="and the" play={booted} delay={0.45} />{" "}
                <span className="mark" style={{ ["--mark" as string]: booted ? 1 : 0, transitionDelay: "0.9s" }}>
                  <SplitWords text="agents" play={booted} delay={0.5} />
                </span>{" "}
                <SplitWords text="on top." play={booted} delay={0.55} />
              </p>
            </div>

            <motion.p {...fade(0.6)} className="max-w-xl text-lg leading-relaxed text-soft md:text-xl">
              Typed React interfaces, secured REST APIs, relational schemas and containerized deploys — plus multi-agent LLM systems on LangGraph and the Model Context Protocol.
            </motion.p>

            <motion.div {...fade(0.7)} className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#work" className="inline-flex h-13 items-center gap-2 rounded-full bg-lime px-6 font-semibold text-ink transition-transform hover:scale-[1.03]">
                  See the work <span aria-hidden="true">↓</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="inline-flex h-13 items-center rounded-full border border-white/25 px-6 font-medium transition-colors hover:border-bone hover:bg-white/5">
                  Get in touch
                </a>
              </Magnetic>
              <a
                href={profile.resume}
                download={profile.resumeFile}
                className="tag inline-flex h-13 items-center gap-2 px-2 text-bone underline decoration-white/30 underline-offset-[6px] transition-colors hover:text-lime hover:decoration-lime"
              >
                résumé.pdf <span aria-hidden="true">↓</span>
              </a>
              <span className="tag ml-1 flex items-center gap-2 text-mute">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-lime opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-lime" />
                </span>
                {profile.status.toLowerCase()}
              </span>
            </motion.div>
          </div>

          <div className="mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:col-span-5 lg:max-w-none">
            <StackScene play={booted} />
          </div>
        </div>

        <motion.dl {...fade(0.9)} className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-1 py-5 pr-4 ${i % 2 === 1 ? "pl-4 md:pl-6" : ""} ${i > 0 ? "md:border-l md:border-line md:pl-6" : ""} ${i === 1 ? "border-l border-line" : ""} ${i === 3 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}>
              <dt className="order-2 tag text-mute">{s.label}</dt>
              <dd className="display order-1 text-4xl md:text-5xl">
                <CountUp to={s.value} decimals={s.decimals ?? 0} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
