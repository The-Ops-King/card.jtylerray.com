"use client";

import {
  ArrowLeft,
  Calendar,
  CalendarClock,
  Globe,
  Mail,
  MessageCircle,
  Rocket,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  CashAppIcon,
  FacebookIcon,
  InstagramIcon,
  KravokIcon,
  LinkedInIcon,
  PayPalIcon,
  VenmoIcon,
  WhatsAppIcon,
  ZelleIcon,
} from "./brand-icons";
import { CategoryTile } from "./category-tile";
import { DetailRow } from "./detail-row";
import { OnlyFansDialog } from "./onlyfans-dialog";

type View = "index" | "contact" | "calendar" | "socials" | "pay";

const PHONE = "+14805163213";
const PHONE_DISPLAY = "+1 (480) 516-3213";
const EMAIL = "jt@jtylerray.com";

export function ProfileCard() {
  const [view, setView] = useState<View>("index");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="conic-border relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-[#d4af37]/25 bg-[#070604]/85 backdrop-blur-xl shadow-[0_0_70px_-15px_rgba(212,175,55,0.5),inset_0_1px_0_rgba(245,215,110,0.08)]"
    >
      {/* Top accent line */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,215,110,0.85), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <Header />

      <div className="relative px-4 pb-4">
        <AnimatePresence mode="wait" initial={false}>
          {view === "index" ? (
            <IndexView key="index" onSelect={setView} />
          ) : (
            <DetailView
              key={view}
              view={view}
              onBack={() => setView("index")}
            />
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </motion.div>
  );
}

/* -------------------- Header -------------------- */

function Header() {
  return (
    <div className="relative px-5 pt-5 pb-3">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(212,175,55,0.18), transparent 60%)",
        }}
      />
      <div className="relative flex items-center gap-3">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 22 }}
          className="relative"
        >
          <motion.div
            aria-hidden
            className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#d4af37,#f5d76e,#8b6914,#d4af37)] opacity-50 blur-md"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#d4af37]/55 bg-[#050505]">
            <span
              aria-label="J. Tyler Ray monogram"
              role="img"
              className="block h-9 w-9"
              style={{
                WebkitMaskImage: "url(/jt-logo.png)",
                maskImage: "url(/jt-logo.png)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                background:
                  "linear-gradient(110deg, #8b6914 25%, #f5d76e 45%, #ffeaa0 55%, #f5d76e 65%, #8b6914 85%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 6s linear infinite",
              }}
            />
          </div>
          <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#050505] bg-[#0a0805]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
          </span>
        </motion.div>
        <div className="flex flex-col">
          <h1 className="gold-shimmer-text text-xl font-bold tracking-tight leading-none">
            J. Tyler Ray
          </h1>
          <p className="mt-1 text-[10.5px] font-medium tracking-[0.18em] text-[#d4af37]/85 uppercase">
            Founder · Builder · Operator
          </p>
        </div>
      </div>

      <div
        className="mt-4 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
        }}
      />
    </div>
  );
}

/* -------------------- Index (bento) -------------------- */

const indexVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, when: "beforeChildren" as const },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
};

const tileItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 26 },
  },
};

function IndexView({ onSelect }: { onSelect: (v: View) => void }) {
  return (
    <motion.div
      variants={indexVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-3 pt-3"
    >
      {/* Featured kravok pill */}
      <motion.a
        variants={tileItem}
        href="https://kravok.ai"
        target="_blank"
        rel="noreferrer noopener"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="btn-shine group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-gradient-to-r from-[#1a1408] via-[#15100a] to-[#0a0805] px-3.5 py-3 transition-colors hover:border-[#d4af37]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/60"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4af37]/40 bg-[#050505] text-[#f5d76e] transition group-hover:scale-110">
          <KravokIcon className="h-4 w-4" />
        </span>
        <span className="flex flex-1 flex-col">
          <span className="text-[14px] font-semibold tracking-[0.18em] text-[#f5e7b8] group-hover:text-white">
            KRAVOK
          </span>
          <span className="text-[11px] tracking-wide text-[#d4af37]/70 group-hover:text-[#f5d76e]/90">
            The AI copilot that closes with you
          </span>
        </span>
        <span className="flex items-center gap-1 rounded-full border border-[#d4af37]/45 bg-[#1a1408] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#f5d76e]">
          <Rocket className="h-2.5 w-2.5" /> live
        </span>
      </motion.a>

      {/* Bento 2x2 */}
      <motion.div variants={tileItem} className="grid grid-cols-2 gap-2.5">
        <CategoryTile
          icon={<Mail className="h-4 w-4" />}
          label="Contact"
          hint="Email · SMS · WhatsApp"
          count={3}
          onClick={() => onSelect("contact")}
        />
        <CategoryTile
          icon={<Calendar className="h-4 w-4" />}
          label="Book a call"
          hint="30 or 60 min"
          count={2}
          onClick={() => onSelect("calendar")}
        />
        <CategoryTile
          icon={<Users className="h-4 w-4" />}
          label="Socials"
          hint="IG · LinkedIn · FB"
          count={3}
          onClick={() => onSelect("socials")}
        />
        <CategoryTile
          icon={<Wallet className="h-4 w-4" />}
          label="Pay me"
          hint="Zelle · PayPal · Cash App · Venmo"
          count={4}
          onClick={() => onSelect("pay")}
        />
      </motion.div>
    </motion.div>
  );
}

/* -------------------- Detail views -------------------- */

const detailVariants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.18 } },
};

const rowItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 340, damping: 28 },
  },
};

function DetailView({
  view,
  onBack,
}: {
  view: Exclude<View, "index">;
  onBack: () => void;
}) {
  const meta = DETAIL_META[view];

  return (
    <motion.div
      variants={detailVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="pt-3"
    >
      <div className="mb-2.5 flex items-center justify-between px-0.5">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-1.5 rounded-lg border border-[#d4af37]/20 bg-[#0a0805] px-2 py-1 text-[11px] font-medium tracking-wide text-[#d4af37]/80 transition hover:border-[#d4af37]/55 hover:text-[#f5d76e]"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
        <span className="text-[10px] font-semibold tracking-[0.22em] text-[#d4af37]/70 uppercase">
          {meta.title}
        </span>
        <span className="w-[52px]" /> {/* spacer to balance back button */}
      </div>

      <motion.div
        variants={{
          show: { transition: { staggerChildren: 0.04 } },
        }}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {view === "contact" ? (
          <>
            <motion.div variants={rowItem}>
              <DetailRow
                href={`mailto:${EMAIL}`}
                icon={<Mail className="h-4 w-4" />}
                label={EMAIL}
                sub="Best for anything serious"
                copyValue={EMAIL}
                external={false}
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href={`sms:${PHONE}`}
                icon={<MessageCircle className="h-4 w-4" />}
                label={PHONE_DISPLAY}
                sub="Text only — I won't answer calls"
                copyValue={PHONE}
                external={false}
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href={`https://wa.me/${PHONE.replace("+", "")}`}
                icon={<WhatsAppIcon className="h-4 w-4" />}
                label="WhatsApp"
                sub={PHONE_DISPLAY}
              />
            </motion.div>
          </>
        ) : null}

        {view === "calendar" ? (
          <>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://30cal.jtylerray.com"
                icon={<Calendar className="h-4 w-4" />}
                label="30-minute call"
                sub="Networking, intros, quick chats"
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://60cal.jtylerray.com"
                icon={<CalendarClock className="h-4 w-4" />}
                label="60-minute call"
                sub="Deep dives, advisory, working sessions"
              />
            </motion.div>
          </>
        ) : null}

        {view === "socials" ? (
          <>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://instagram.com/jtylerray"
                icon={<InstagramIcon className="h-4 w-4" />}
                label="Instagram"
                sub="@jtylerray"
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://linkedin.com/in/jtylerray"
                icon={<LinkedInIcon className="h-4 w-4" />}
                label="LinkedIn"
                sub="in/jtylerray"
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://www.facebook.com/jtylerray"
                icon={<FacebookIcon className="h-4 w-4" />}
                label="Facebook"
                sub="/jtylerray"
              />
            </motion.div>
          </>
        ) : null}

        {view === "pay" ? (
          <>
            <motion.div variants={rowItem}>
              <DetailRow
                icon={<ZelleIcon className="h-4 w-4" />}
                label="Zelle"
                sub={PHONE_DISPLAY}
                copyValue={PHONE}
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://paypal.me/jtylerray"
                icon={<PayPalIcon className="h-4 w-4" />}
                label="PayPal"
                sub="@jtylerray"
                copyValue="@jtylerray"
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://cash.app/$jtylerray1"
                icon={<CashAppIcon className="h-4 w-4" />}
                label="Cash App"
                sub="$jtylerray1"
                copyValue="$jtylerray1"
              />
            </motion.div>
            <motion.div variants={rowItem}>
              <DetailRow
                href="https://venmo.com/jtylerray"
                icon={<VenmoIcon className="h-4 w-4" />}
                label="Venmo"
                sub="@jtylerray"
                copyValue="@jtylerray"
              />
            </motion.div>
          </>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

const DETAIL_META: Record<Exclude<View, "index">, { title: string }> = {
  contact: { title: "Contact" },
  calendar: { title: "Book a call" },
  socials: { title: "Socials" },
  pay: { title: "Pay me" },
};

/* -------------------- Footer -------------------- */

function Footer() {
  return (
    <div className="relative flex items-center justify-between gap-2 border-t border-[#d4af37]/15 bg-[#050505]/40 px-4 py-2.5">
      <a
        href="https://jtylerray.com"
        target="_blank"
        rel="noreferrer noopener"
        className="group flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-[#d4af37]/75 transition hover:text-[#f5d76e]"
      >
        <Globe className="h-3 w-3 transition-transform group-hover:rotate-12" />
        jtylerray.com
      </a>
      <OnlyFansDialog
        trigger={
          <button
            type="button"
            className="group flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-[#d4af37]/55 transition hover:bg-[#d4af37]/10 hover:text-[#f5d76e]"
          >
            <Sparkles className="h-3 w-3" />
            OnlyFans
          </button>
        }
      />
    </div>
  );
}
