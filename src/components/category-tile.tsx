"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  hint: string;
  count?: number;
  accent?: string;
  onClick: () => void;
};

export function CategoryTile({
  icon,
  label,
  hint,
  count,
  accent = "#f5d76e",
  onClick,
}: Props) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${mx}% ${my}%, rgba(245,215,110,0.22), transparent 60%)`;

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouse}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="btn-shine group relative flex h-full min-h-[104px] w-full flex-col items-start justify-between rounded-2xl border border-[#d4af37]/25 bg-gradient-to-b from-[#0e0c06] to-[#070604] p-3.5 text-left shadow-[inset_0_1px_0_rgba(245,215,110,0.06),0_2px_18px_-12px_rgba(212,175,55,0.4)] transition-colors duration-300 hover:border-[#d4af37]/55 hover:from-[#1a1408] hover:to-[#0a0805] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60"
      aria-label={`Open ${label}`}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <span
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4af37]/25 bg-[#0a0805] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#d4af37]/60"
        style={{ color: accent }}
      >
        {icon}
      </span>

      <span className="relative flex w-full items-end justify-between">
        <span className="flex flex-col">
          <span className="text-[14px] font-semibold leading-tight text-[#f5e7b8] group-hover:text-white">
            {label}
          </span>
          <span className="text-[11px] tracking-wide text-[#d4af37]/60 group-hover:text-[#f5d76e]/85">
            {hint}
          </span>
        </span>
        {typeof count === "number" ? (
          <span className="ml-2 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#1a1408] px-1.5 text-[10px] font-semibold tabular-nums text-[#f5d76e]">
            {count}
          </span>
        ) : null}
      </span>
    </motion.button>
  );
}
