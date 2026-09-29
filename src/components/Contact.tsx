"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { EASE, Magnetic, Reveal, SplitWords } from "./motion";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string; fallback?: string };

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p className="break-words">
      <span className="text-lime">ayush@portfolio</span>
      <span className="text-mute">:</span>
      <span className="text-violet">~/contact</span>
      <span className="text-mute">$ </span>
      <span className="text-bone">{children}</span>
    </p>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // If the server can't send (not configured / provider down / offline), hand the visitor a pre-filled email instead.
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${data.name ?? ""}`)}&body=${encodeURIComponent(
      `${data.message ?? ""}\n\n— ${data.name ?? ""} <${data.email ?? ""}>`,
    )}`;
    setStatus({ state: "sending" });
    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      setStatus({ state: "error", message: "network error — couldn't reach the server.", fallback: mailto });
      return;
    }
    const json = (await res.json().catch(() => ({}))) as { error?: string; dev?: boolean };
    if (!res.ok) {
      setStatus({
        state: "error",
        message: `${res.status} — ${json.error ?? "something went wrong."}`,
        fallback: res.status >= 500 ? mailto : undefined,
      });
      return;
    }
    form.reset();
    setStatus(
      json.dev
        ? { state: "sent", message: "200 OK (dev) — logged to the terminal. Add RESEND_API_KEY to send real email." }
        : { state: "sent", message: "200 OK — message delivered. I'll reply within a day or two." },
    );
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const input =
    "min-w-0 flex-1 border-b border-white/15 bg-transparent py-1 text-bone caret-lime outline-none transition-colors placeholder:text-white/25 focus:border-lime";

  return (
    <section id="contact" className="dotgrid relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 size-[520px] rounded-full bg-lime/10 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 size-[420px] rounded-full bg-violet/15 blur-[120px]" />
      <div className="container-x relative flex min-h-[100svh] flex-col justify-between gap-16 pb-8 pt-24 md:pt-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-10 lg:col-span-6">
            <span className="tag text-mute">
              <span className="text-lime">05</span> — contact
            </span>
            <h2 className="display text-[14.5vw] leading-[0.86] md:text-[7.2rem]">
              <SplitWords text="Got a role that needs the" />{" "}
              <span className="mark" style={{ ["--mark" as string]: 1 }}>
                <SplitWords text="whole stack?" delay={0.2} />
              </span>
            </h2>
            <Reveal delay={0.2} className="flex flex-wrap gap-3">
              {profile.socials.map((s) => (
                <Magnetic key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-white/25 px-5 font-medium transition-colors hover:border-lime hover:bg-lime hover:text-ink">
                    {s.label} ↗
                  </a>
                </Magnetic>
              ))}
              <Magnetic>
                <a href={profile.resume} target="_blank" rel="noopener" className="inline-flex h-12 items-center rounded-full bg-bone px-5 font-semibold text-ink transition-transform hover:scale-[1.04]">
                  résumé.pdf ↗
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0c0c0e]/90 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur">
              <div className="flex h-10 items-center gap-2 border-b border-line px-4">
                <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="size-2.5 rounded-full bg-[#28c840]/80" />
                <span className="tag mx-auto pr-10 text-mute">ayush@portfolio — zsh</span>
              </div>
              <div className="flex flex-col gap-4 p-5 font-mono text-[0.82rem] leading-relaxed md:p-7 md:text-sm">
                <div className="flex flex-col gap-1">
                  <Prompt>whoami</Prompt>
                  <p className="text-soft">Ayush Yadav — full-stack software engineer, {profile.location}. {profile.status}.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Prompt>cat email.txt</Prompt>
                  <p className="flex flex-wrap items-center gap-3">
                    <a href={`mailto:${profile.email}`} className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime">
                      {profile.email}
                    </a>
                    <button type="button" onClick={copyEmail} className="rounded border border-white/20 px-2 py-0.5 text-xs text-mute transition-colors hover:border-lime hover:text-lime" aria-live="polite">
                      {copied ? "copied ✓" : "copy"}
                    </button>
                  </p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                  <Prompt>./send-message</Prompt>
                  <label className="flex items-baseline gap-3">
                    <span className="w-20 shrink-0 text-violet">name ›</span>
                    <input name="name" required maxLength={80} autoComplete="name" placeholder="your name" className={input} />
                  </label>
                  <label className="flex items-baseline gap-3">
                    <span className="w-20 shrink-0 text-violet">email ›</span>
                    <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="you@company.com" className={input} />
                  </label>
                  <label className="flex items-baseline gap-3">
                    <span className="w-20 shrink-0 text-violet">message ›</span>
                    <textarea name="message" required minLength={10} maxLength={2000} rows={3} placeholder="the role, the team, the problem…" className={`${input} resize-none`} />
                  </label>
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <button
                    type="submit"
                    disabled={status.state === "sending"}
                    className="mt-2 inline-flex h-12 w-fit items-center gap-3 rounded-lg bg-lime px-5 font-semibold text-ink transition-transform hover:scale-[1.03] disabled:opacity-60"
                  >
                    {status.state === "sending" ? "sending…" : "send"} <span className="rounded bg-ink/15 px-1.5 text-xs">⏎ enter</span>
                  </button>
                  <AnimatePresence mode="wait">
                    {status.message ? (
                      <motion.p
                        key={status.state}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        role="status"
                        className={status.state === "error" ? "text-[#FFB547]" : "text-lime"}
                      >
                        {status.state === "error" ? "✗ " : "✓ "}
                        {status.message}
                        {status.fallback && (
                          <>
                            {" "}
                            <a href={status.fallback} className="text-lime underline underline-offset-4">
                              open it in your email app instead ↗
                            </a>
                          </>
                        )}
                      </motion.p>
                    ) : (
                      <p className="text-mute">
                        <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-lime" />
                      </p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </Reveal>
        </div>

        <footer className="tag grid grid-cols-2 gap-y-3 border-t border-line pt-6 text-mute md:grid-cols-4">
          <span className="text-bone">© {new Date().getFullYear()} ayush yadav</span>
          <span className="justify-self-end md:justify-self-center">bhopal, india</span>
          <span className="md:justify-self-center">next.js · tailwind · motion</span>
          <a href="#top" className="justify-self-end text-bone transition-colors hover:text-lime">
            back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
