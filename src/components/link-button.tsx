"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  icon?: ReactNode;
  label: string;
  hint?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  asChild?: boolean;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "ref" | "onClick">;

export function LinkButton({
  href,
  icon,
  label,
  hint,
  trailing,
  onClick,
  external = true,
  className,
  ...rest
}: Props) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, rgba(245,215,110,0.18), transparent 60%)`;

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const Comp: React.ElementType = href ? "a" : "button";
  const linkProps = href
    ? {
        href,
        target: external ? "_blank" : undefined,
        rel: external ? "noreferrer noopener" : undefined,
      }
    : { type: "button" as const };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="group relative w-full"
    >
      <Comp
        {...linkProps}
        {...(rest as Record<string, unknown>)}
        onMouseMove={handleMouse}
        onClick={onClick}
        className={cn(
          "btn-shine relative flex w-full items-center gap-3 rounded-xl border border-[#d4af37]/20 bg-gradient-to-b from-[#0e0c06] to-[#070604] px-4 py-3.5 text-left transition-colors duration-300",
          "hover:border-[#d4af37]/55 hover:from-[#1a1408] hover:to-[#0a0805]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60",
          "shadow-[inset_0_1px_0_rgba(245,215,110,0.06),0_2px_18px_-12px_rgba(212,175,55,0.4)]",
          className
        )}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {icon ? (
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/25 bg-[#0a0805] text-[#f5d76e] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#d4af37]/70 group-hover:text-[#ffeaa0]">
            <span className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_50%_0%,rgba(245,215,110,0.3),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative [&>svg]:h-4.5 [&>svg]:w-4.5">{icon}</span>
          </span>
        ) : null}

        <span className="relative flex flex-1 flex-col">
          <span className="text-[15px] font-medium text-[#f5e7b8] transition-colors group-hover:text-white">
            {label}
          </span>
          {hint ? (
            <span className="text-[11.5px] tracking-wide text-[#d4af37]/60 transition-colors group-hover:text-[#f5d76e]/80">
              {hint}
            </span>
          ) : null}
        </span>

        {trailing ?? (
          <ArrowUpRight
            className="relative h-4 w-4 text-[#d4af37]/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f5d76e]"
            strokeWidth={2}
          />
        )}
      </Comp>
    </motion.div>
  );
}
