"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Copy, Wallet } from "lucide-react";
import { useState } from "react";
import { CashAppIcon, PayPalIcon, VenmoIcon } from "./brand-icons";

type Pay = {
  name: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
  color: string;
};

const PAYMENTS: Pay[] = [
  {
    name: "PayPal",
    handle: "@jtylerray",
    href: "https://paypal.me/jtylerray",
    icon: <PayPalIcon className="h-4 w-4" />,
    color: "#f5d76e",
  },
  {
    name: "Cash App",
    handle: "$jtylerray1",
    href: "https://cash.app/$jtylerray1",
    icon: <CashAppIcon className="h-4 w-4" />,
    color: "#d4af37",
  },
  {
    name: "Venmo",
    handle: "@jtylerray",
    href: "https://venmo.com/jtylerray",
    icon: <VenmoIcon className="h-4 w-4" />,
    color: "#ffeaa0",
  },
];

export function PaymentSection() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (handle: string) => {
    try {
      await navigator.clipboard.writeText(handle);
      setCopied(handle);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="w-full">
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn-shine group relative flex w-full items-center gap-3 rounded-xl border border-[#d4af37]/25 bg-gradient-to-b from-[#0e0c06] to-[#070604] px-4 py-3.5 text-left transition-colors duration-300 hover:border-[#d4af37]/55 hover:from-[#1a1408] hover:to-[#0a0805] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60 shadow-[inset_0_1px_0_rgba(245,215,110,0.06),0_2px_18px_-12px_rgba(212,175,55,0.4)]"
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/25 bg-[#0a0805] text-[#f5d76e] transition group-hover:scale-110 group-hover:border-[#d4af37]/70 group-hover:text-[#ffeaa0]">
          <Wallet className="h-4.5 w-4.5" />
        </span>
        <span className="flex flex-1 flex-col">
          <span className="text-[15px] font-medium text-[#f5e7b8] group-hover:text-white">
            Send me money
          </span>
          <span className="text-[11.5px] tracking-wide text-[#d4af37]/60 group-hover:text-[#f5d76e]/80">
            PayPal · Cash App · Venmo
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="text-[#d4af37]/60 group-hover:text-[#f5d76e]"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="payments"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2 rounded-xl border border-[#d4af37]/15 bg-[#070604]/60 p-2 backdrop-blur-sm">
              {PAYMENTS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center gap-2 rounded-lg border border-transparent bg-[#0a0805]/60 p-2 transition hover:border-[#d4af37]/30 hover:bg-[#120e08]"
                >
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex flex-1 items-center gap-3"
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d4af37]/20 bg-[#050505] transition group-hover:scale-105"
                      style={{ color: p.color }}
                    >
                      {p.icon}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-[#f5e7b8] group-hover:text-white">
                        {p.name}
                      </span>
                      <span className="text-[11px] text-[#d4af37]/60 group-hover:text-[#f5d76e]/85">
                        {p.handle}
                      </span>
                    </span>
                  </a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => copy(p.handle)}
                    aria-label={`Copy ${p.name} handle`}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d4af37]/15 bg-[#050505] text-[#d4af37]/70 transition hover:border-[#d4af37]/60 hover:text-[#f5d76e]"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied === p.handle ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check className="h-4 w-4 text-emerald-400" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
