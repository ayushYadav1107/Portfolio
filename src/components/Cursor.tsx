"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/**
 * A trailing ring that follows the mouse (the native cursor stays visible).
 * Over links it swells; over anything with data-cursor="Label" it becomes a lime disc with that label.
 */
const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribeMq = (cb: () => void) => {
  const mq = matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function Cursor() {
  const enabled = useSyncExternalStore(subscribeMq, () => matchMedia(QUERY).matches, () => false);
  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      setLabel(tagged?.dataset.cursor ?? null);
      setHot(!!el?.closest("a, button, input, textarea, [role=button]"));
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y, enabled]);

  if (!enabled) return null;
  const size = label ? 108 : hot ? 46 : 28;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80]"
    >
      <motion.div
        animate={{ width: size, height: size, backgroundColor: label ? "#C8FF3E" : "rgba(200,255,62,0)", borderColor: label ? "#C8FF3E" : hot ? "rgba(200,255,62,0.9)" : "rgba(238,238,234,0.45)" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="px-3 text-center font-mono text-[11px] font-medium leading-tight text-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
