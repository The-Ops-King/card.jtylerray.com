"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { LinkButton } from "./link-button";

export function OnlyFansDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div>
          <LinkButton
            label="My OnlyFans"
            hint="exclusive content 🔞"
            icon={<Sparkles className="h-4.5 w-4.5" />}
            onClick={() => setOpen(true)}
          />
        </div>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#d4af37]/40 bg-gradient-to-b from-[#15100a] to-[#070604] p-6 shadow-[0_0_60px_-10px_rgba(245,215,110,0.4)]"
                initial={{ opacity: 0, scale: 0.92, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <div className="conic-border absolute inset-0 rounded-2xl" />

                <Dialog.Close asChild>
                  <button
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-[#d4af37]/70 transition hover:bg-[#d4af37]/10 hover:text-[#f5d76e]"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>

                <div className="relative space-y-4 pt-2 text-center">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.7 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#0a0805]"
                  >
                    <span className="text-3xl">😏</span>
                  </motion.div>

                  <Dialog.Title className="gold-shimmer-text text-2xl font-bold">
                    Nice try.
                  </Dialog.Title>

                  <Dialog.Description className="text-[15px] leading-relaxed text-[#f5e7b8]/85">
                    I don&apos;t have an OnlyFans, you perv.
                  </Dialog.Description>

                  <p className="text-xs text-[#d4af37]/55">
                    But you can hit me up on the other links. Or don&apos;t.
                  </p>

                  <Dialog.Close asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-shine mt-2 w-full rounded-xl border border-[#d4af37]/40 bg-gradient-to-b from-[#1a1408] to-[#0a0805] py-2.5 text-sm font-medium text-[#f5d76e] transition hover:border-[#d4af37] hover:text-[#ffeaa0]"
                    >
                      Forgive me
                    </motion.button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
