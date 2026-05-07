"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  href?: string;
  icon: ReactNode;
  label: string;
  sub?: string;
  accent?: string;
  copyValue?: string;
  external?: boolean;
  onClick?: () => void;
};

export function DetailRow({
  href,
  icon,
  label,
  sub,
  accent = "#f5d76e",
  copyValue,
  external = true,
  onClick,
}: Props) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(160px circle at ${mx}% ${my}%, rgba(245,215,110,0.18), transparent 60%)`;
  const [copied, setCopied] = useState(false);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const copy = async (e: React.MouseEvent) => {
    if (!copyValue) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch {
      /* noop */
    }
  };

  const Inner = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <span
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#d4af37]/25 bg-[#0a0805] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#d4af37]/65"
        style={{ color: accent }}
      >
        {icon}
      </span>
      <span className="relative flex flex-1 flex-col">
        <span className="text-[13px] font-medium leading-tight text-[#f5e7b8] group-hover:text-white">
          {label}
        </span>
        {sub ? (
          <span className="text-[11px] tracking-wide text-[#d4af37]/65 group-hover:text-[#f5d76e]/85">
            {sub}
          </span>
        ) : null}
      </span>
      {copyValue ? (
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label}`}
          className="relative flex h-7 w-7 items-center justify-center rounded-md border border-[#d4af37]/20 bg-[#050505] text-[#d4af37]/70 transition hover:scale-105 hover:border-[#d4af37]/55 hover:text-[#f5d76e]"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </button>
      ) : (
        <ArrowUpRight className="relative h-3.5 w-3.5 text-[#d4af37]/55 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f5d76e]" />
      )}
    </>
  );

  const className =
    "btn-shine group relative flex w-full items-center gap-3 rounded-xl border border-[#d4af37]/20 bg-gradient-to-b from-[#0e0c06] to-[#070604] px-3 py-2.5 text-left transition-colors duration-300 hover:border-[#d4af37]/55 hover:from-[#1a1408] hover:to-[#0a0805] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 shadow-[inset_0_1px_0_rgba(245,215,110,0.05),0_2px_14px_-12px_rgba(212,175,55,0.35)]";

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        onMouseMove={handleMouse}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className={className}
      >
        {Inner}
      </motion.a>
    );
  }

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        onMouseMove={handleMouse}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className={className}
      >
        {Inner}
      </motion.button>
    );
  }

  // No primary action — render as div so the inner copy button is valid HTML.
  return (
    <motion.div
      onMouseMove={handleMouse}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={className}
    >
      {Inner}
    </motion.div>
  );
}
