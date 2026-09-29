"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { layers } from "@/data/profile";

/* ---------- the little schematic drawn on each glass plane ---------- */

function Schematic({ kind, color }: { kind: string; color: string }) {
  const line = { background: color, opacity: 0.35 };
  const fill = { background: color, opacity: 0.16 };
  if (kind === "ui")
    return (
      <div className="absolute inset-[9%] flex flex-col gap-[5%]">
        <div className="h-[9%] rounded-sm" style={fill} />
        <div className="flex flex-1 gap-[5%]">
          <div className="w-[24%] rounded-sm" style={fill} />
          <div className="grid flex-1 grid-cols-2 gap-[6%]">
            <div className="rounded-sm border" style={{ borderColor: color, opacity: 0.5 }} />
            <div className="rounded-sm" style={fill} />
            <div className="rounded-sm" style={fill} />
            <div className="rounded-sm border" style={{ borderColor: color, opacity: 0.5 }} />
          </div>
        </div>
      </div>
    );
  if (kind === "api")
    return (
      <div className="absolute inset-[11%] flex flex-col justify-between">
        {[70, 52, 84, 60, 44].map((w, i) => (
          <div key={i} className="flex items-center gap-[4%]">
            <div className="h-2 w-[16%] rounded-sm" style={{ background: color, opacity: i === 2 ? 0.7 : 0.3 }} />
            <div className="h-px" style={{ ...line, width: `${w}%` }} />
          </div>
        ))}
      </div>
    );
  if (kind === "data")
    return (
      <div className="absolute inset-[12%] grid grid-cols-4 grid-rows-4 gap-[5%]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="rounded-[2px]" style={i % 5 === 0 ? { background: color, opacity: 0.35 } : fill} />
        ))}
      </div>
    );
  // agents: a supervisor node wired to five specialists
  const pts = [0, 72, 144, 216, 288].map((a) => [50 + 34 * Math.cos(((a - 90) * Math.PI) / 180), 50 + 34 * Math.sin(((a - 90) * Math.PI) / 180)]);
  return (
    <div className="absolute inset-0">
      {pts.map(([x, y], i) => {
        const dx = x - 50;
        const dy = y - 50;
        return (
          <div
            key={`l${i}`}
            className="absolute left-1/2 top-1/2 h-px origin-left"
            style={{ ...line, width: `${Math.hypot(dx, dy)}%`, transform: `rotate(${Math.atan2(dy, dx)}rad)` }}
          />
        );
      })}
      {pts.map(([x, y], i) => (
        <div key={i} className="absolute size-[11%] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ left: `${x}%`, top: `${y}%`, borderColor: color, background: "rgba(9,9,10,0.9)" }} />
      ))}
      <div className="absolute left-1/2 top-1/2 size-[17%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: color, boxShadow: `0 0 30px ${color}` }} />
    </div>
  );
}

function Layer({
  i,
  total,
  gap,
  size,
  active,
  layer,
}: {
  i: number;
  total: number;
  gap: MotionValue<number>;
  size: number;
  active: boolean;
  layer: (typeof layers)[number];
}) {
  // i = 0 is the top layer
  const lift = useSpring(0, { stiffness: 160, damping: 18 });
  useEffect(() => lift.set(active ? size * 0.09 : 0), [active, lift, size]);
  const z = useTransform([gap, lift], ([g, l]: number[]) => ((total - 1) / 2 - i) * g + l);

  return (
    <motion.div
      style={{ z, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderColor: layer.color }}
      animate={{ opacity: active ? 1 : 0.72 }}
      className="absolute left-1/2 top-1/2 rounded-[18px] border [transform-style:preserve-3d]"
    >
      <div className="absolute inset-0 rounded-[18px]" style={{ background: `linear-gradient(135deg, ${layer.color}22, ${layer.color}08 60%)` }} />
      <Schematic kind={layer.key} color={layer.color} />
      <motion.span
        animate={{ opacity: active ? 1 : 0 }}
        className="absolute left-[4%] top-[-10%] font-mono text-[10px] uppercase tracking-wider md:text-[12px]"
        style={{ color: layer.color }}
      >
        0{total - i} / {layer.label}
      </motion.span>
    </motion.div>
  );
}

/** Four glass planes — agents, interface, API, data — that pull apart as you scroll, with a request packet dropping through them. */
export function StackScene({ play }: { play: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [w, setW] = useState(0);
  const wMV = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setW(e.contentRect.width);
      wMV.set(e.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [wMV]);

  // separation: closed → open on load, wider as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 30%", "end start"] });
  const open = useMotionValue(0);
  useEffect(() => {
    if (!play) return;
    const c = animate(open, 1, { duration: reduce ? 0 : 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 });
    return () => c.stop();
  }, [play, open, reduce]);
  const rawGap = useTransform([open, scrollYProgress, wMV], ([o, s, width]: number[]) => width * (0.03 + 0.1 * o + 0.1 * s));
  const gap = useSpring(rawGap, { stiffness: 120, damping: 24 });

  // tilt toward the pointer
  const mx = useSpring(0, { stiffness: 60, damping: 18 });
  const my = useSpring(0, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);
  const rotateX = useTransform(my, (v) => 57 - v * 10);
  const rotateZ = useTransform(mx, (v) => -40 + v * 14);

  // request packet dropping from agents to data
  const t = useMotionValue(0);
  useEffect(() => {
    if (reduce || !play) return;
    const c = animate(t, [0, 1], { duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.1, delay: 1.6 });
    return () => c.stop();
  }, [t, reduce, play]);
  const packetZ = useTransform([gap, t], ([g, p]: number[]) => (1.5 - 3 * p) * g + 6);
  const packetOpacity = useTransform(t, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const threadH = useTransform(gap, (g) => 3 * g);
  const threadMt = useTransform(threadH, (h) => -h / 2);
  const shadowZ = useTransform(gap, (g) => -1.5 * g - 30);

  // cycle the highlighted layer until someone takes over
  useEffect(() => {
    if (hovering || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % layers.length), 2600);
    return () => clearInterval(id);
  }, [hovering, reduce]);

  const size = w * 0.54;

  return (
    <div className="flex flex-col gap-6">
      <div ref={wrap} className="relative aspect-square w-full [perspective:2000px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-[12%] rounded-full bg-lime/10 blur-[80px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[10%] top-[8%] h-1/3 w-1/3 rounded-full bg-violet/20 blur-[70px]" />
        {w > 0 && (
          <motion.div
            aria-hidden="true"
            style={{ rotateX, rotateZ }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={play ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            {/* ground shadow */}
            <motion.div
              style={{ z: shadowZ, width: size * 1.1, height: size * 1.1, marginLeft: -size * 0.55, marginTop: -size * 0.55 }}
              className="absolute left-1/2 top-1/2 rounded-[30px] bg-black/60 blur-2xl"
            />
            {/* vertical thread linking the planes */}
            <motion.div
              style={{ height: threadH, marginTop: threadMt }}
              className="absolute left-1/2 top-1/2 w-px origin-center bg-gradient-to-b from-violet via-lime to-bone/40 [transform:rotateX(-90deg)]"
            />
            {layers.map((l, i) => (
              <Layer key={l.key} i={i} total={layers.length} gap={gap} size={size} active={active === i} layer={l} />
            ))}
            <motion.div
              style={{ z: packetZ, opacity: packetOpacity }}
              className="absolute left-1/2 top-1/2 -ml-2 -mt-2 size-4 rounded-full bg-lime shadow-[0_0_24px_6px_rgba(200,255,62,0.7)]"
            />
          </motion.div>
        )}
      </div>

      <motion.ul
        initial={{ opacity: 0, y: 12 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
        onPointerLeave={() => setHovering(false)}>
        {layers.map((l, i) => (
          <li key={l.key}>
            <button
              type="button"
              onPointerEnter={() => {
                setHovering(true);
                setActive(i);
              }}
              onFocus={() => {
                setHovering(true);
                setActive(i);
              }}
              onBlur={() => setHovering(false)}
              aria-pressed={active === i}
              className={`flex w-full flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition-colors duration-300 ${
                active === i ? "border-white/25 bg-white/[0.06]" : "border-line"
              }`}
            >
              <span className="tag flex items-center gap-2" style={{ color: l.color }}>
                <span className="size-1.5 rounded-full" style={{ background: l.color }} />0{layers.length - i} {l.label.toLowerCase()}
              </span>
              <span className="text-[0.8rem] leading-snug text-soft">{l.tech}</span>
            </button>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
