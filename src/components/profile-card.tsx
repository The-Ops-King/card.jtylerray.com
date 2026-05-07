"use client";

import {
  Calendar,
  CalendarClock,
  Globe,
  Mail,
  MessageCircle,
  Rocket,
} from "lucide-react";
import { motion } from "motion/react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  KravokIcon,
} from "./brand-icons";
import { LinkButton } from "./link-button";
import { OnlyFansDialog } from "./onlyfans-dialog";
import { PaymentSection } from "./payment-section";

const PHONE = "+14805163213";
const PHONE_DISPLAY = "+1 (480) 516-3213";
const EMAIL = "jt@jtylerray.com";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
};

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="conic-border relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-[#d4af37]/25 bg-[#070604]/85 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(212,175,55,0.45),inset_0_1px_0_rgba(245,215,110,0.08)]"
    >
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(212,175,55,0.18), transparent 60%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 -top-px h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(245,215,110,0.8), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative flex flex-col items-center px-6 pt-9 pb-5 text-center">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="relative mb-4"
          >
            <motion.div
              aria-hidden
              className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,#d4af37,#f5d76e,#8b6914,#d4af37)] blur-md opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af37]/55 bg-[#050505]">
              <div className="gold-shimmer-text text-3xl font-bold tracking-wider">
                JT
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#050505] bg-[#0a0805]">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="gold-shimmer-text text-2xl font-bold tracking-tight"
          >
            J. Tyler Ray
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mt-1 text-[13px] font-medium tracking-wider text-[#d4af37]/85 uppercase"
          >
            Founder · Builder · Operator
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-[#f5e7b8]/70"
          >
            Pick a way to reach me. They all work — promise.
          </motion.p>
        </div>

        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
          }}
        />
      </div>

      {/* Body */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="space-y-2.5 px-5 py-5"
      >
        {/* Quick contact row */}
        <motion.div variants={item} className="grid grid-cols-3 gap-2">
          <QuickAction
            href={`mailto:${EMAIL}`}
            icon={<Mail className="h-4 w-4" />}
            label="Email"
          />
          <QuickAction
            href={`sms:${PHONE}`}
            icon={<MessageCircle className="h-4 w-4" />}
            label="SMS"
          />
          <QuickAction
            href={`https://wa.me/${PHONE.replace("+", "")}`}
            icon={<WhatsAppIcon className="h-4 w-4" />}
            label="WhatsApp"
          />
        </motion.div>

        <SectionLabel>Direct</SectionLabel>

        <motion.div variants={item}>
          <LinkButton
            href={`sms:${PHONE}`}
            icon={<MessageCircle className="h-4.5 w-4.5" />}
            label={PHONE_DISPLAY}
            hint="Text only — I won't answer calls"
            external={false}
          />
        </motion.div>

        <motion.div variants={item}>
          <LinkButton
            href={`mailto:${EMAIL}`}
            icon={<Mail className="h-4.5 w-4.5" />}
            label={EMAIL}
            hint="Best for anything serious"
            external={false}
          />
        </motion.div>

        <SectionLabel>Book a call</SectionLabel>

        <motion.div variants={item}>
          <LinkButton
            href="https://30cal.jtylerray.com"
            icon={<Calendar className="h-4.5 w-4.5" />}
            label="30-minute call"
            hint="Networking, intros, quick chats"
          />
        </motion.div>

        <motion.div variants={item}>
          <LinkButton
            href="https://60cal.jtylerray.com"
            icon={<CalendarClock className="h-4.5 w-4.5" />}
            label="60-minute call"
            hint="Deep dives, advisory, working sessions"
          />
        </motion.div>

        <SectionLabel>The work</SectionLabel>

        <motion.div variants={item}>
          <LinkButton
            href="https://kravok.ai"
            icon={<KravokIcon className="h-4.5 w-4.5" />}
            label="kravok.ai"
            hint="The SaaS I'm building"
            trailing={
              <span className="flex items-center gap-1 rounded-full border border-[#d4af37]/40 bg-[#1a1408] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#f5d76e]">
                <Rocket className="h-3 w-3" /> live
              </span>
            }
          />
        </motion.div>

        <motion.div variants={item}>
          <LinkButton
            href="https://jtylerray.com"
            icon={<Globe className="h-4.5 w-4.5" />}
            label="jtylerray.com"
            hint="Personal site"
          />
        </motion.div>

        <SectionLabel>Social</SectionLabel>

        <motion.div variants={item}>
          <LinkButton
            href="https://instagram.com/jtylerray"
            icon={<InstagramIcon className="h-4.5 w-4.5" />}
            label="Instagram"
            hint="@jtylerray"
          />
        </motion.div>

        <motion.div variants={item}>
          <LinkButton
            href="https://linkedin.com/in/jtylerray"
            icon={<LinkedInIcon className="h-4.5 w-4.5" />}
            label="LinkedIn"
            hint="in/jtylerray"
          />
        </motion.div>

        <motion.div variants={item}>
          <LinkButton
            href="https://www.facebook.com/jtylerray"
            icon={<FacebookIcon className="h-4.5 w-4.5" />}
            label="Facebook"
            hint="/jtylerray"
          />
        </motion.div>

        <SectionLabel>Pay me</SectionLabel>

        <motion.div variants={item}>
          <PaymentSection />
        </motion.div>

        <div className="pt-2">
          <motion.div variants={item}>
            <OnlyFansDialog />
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="relative px-6 pb-5 pt-1 text-center">
        <div
          className="mx-auto mb-3 h-px w-2/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
          }}
        />
        <p className="text-[11px] tracking-[0.18em] text-[#d4af37]/60 uppercase">
          © {new Date().getFullYear()} · J. Tyler Ray
        </p>
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={item}
      className="flex items-center gap-2 px-1 pt-3 pb-1"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      <span className="text-[10px] font-semibold tracking-[0.22em] text-[#d4af37]/70 uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/30 to-transparent" />
    </motion.div>
  );
}

function QuickAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="btn-shine group relative flex flex-col items-center gap-1.5 rounded-xl border border-[#d4af37]/25 bg-gradient-to-b from-[#0e0c06] to-[#070604] py-3 transition-colors hover:border-[#d4af37]/60 hover:from-[#1a1408]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d4af37]/25 bg-[#0a0805] text-[#f5d76e] transition group-hover:scale-110 group-hover:border-[#d4af37]/70 group-hover:text-[#ffeaa0]">
        {icon}
      </span>
      <span className="text-[11px] font-medium tracking-wide text-[#f5e7b8] group-hover:text-white">
        {label}
      </span>
    </motion.a>
  );
}
