import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ShieldCheck,
  Plus,
  Minus,
  TrendingUp,
  BarChart3,
  Lock,
  Wallet
} from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";
import { ContactForm } from "@/components/site/ContactForm";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };
  return (
    <div id="top" className="relative overflow-x-clip bg-ink text-white">
      <Nav onSignIn={() => openAuth("signin")} onSignUp={() => openAuth("signup")} />
      
      <Hero onSignUp={() => openAuth("signup")} />
      <TrustedBy />
      <Features />
      <Performance />
      <Testimonials />
      <Faq />
      <ContactSection />
      <CTA onSignUp={() => openAuth("signup")} />
      <Footer />

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitch={setAuthMode}
      />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onSignUp }: { onSignUp: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const candles = [
    { h: 55, body: 28, top: 12, green: true },
    { h: 72, body: 22, top: 28, green: false },
    { h: 64, body: 32, top: 10, green: true },
    { h: 48, body: 18, top: 18, green: false },
    { h: 80, body: 38, top: 14, green: true },
    { h: 56, body: 20, top: 22, green: false },
    { h: 88, body: 44, top: 10, green: true },
    { h: 44, body: 16, top: 16, green: true },
    { h: 70, body: 28, top: 20, green: false },
    { h: 92, body: 48, top: 8,  green: true },
    { h: 60, body: 26, top: 14, green: true },
    { h: 52, body: 18, top: 24, green: false },
    { h: 78, body: 36, top: 12, green: true },
    { h: 40, body: 14, top: 18, green: false },
    { h: 85, body: 40, top: 10, green: true },
    { h: 58, body: 22, top: 16, green: true },
    { h: 68, body: 30, top: 14, green: false },
    { h: 90, body: 46, top: 8,  green: true },
    { h: 50, body: 20, top: 20, green: true },
    { h: 76, body: 34, top: 12, green: false },
    { h: 94, body: 50, top: 6,  green: true },
    { h: 62, body: 24, top: 18, green: true },
    { h: 82, body: 38, top: 10, green: true },
    { h: 46, body: 16, top: 22, green: false },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center grain overflow-hidden">

      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 py-32 sm:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex flex-col items-start gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-red-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                Streng limitierte Zuteilung
              </div>
              
              <div className="flex items-center gap-4 text-sm text-white/70 bg-white/5 rounded-full px-5 py-2 border border-white/10">
                 <span><strong>2.412</strong> / 2.500 Plätze besetzt</span>
                 <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                   <div className="h-full bg-gradient-to-r from-gold to-red-500 w-[96.4%] rounded-full" />
                 </div>
                 <span className="text-red-400 font-medium">88 verbleibend</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              Institutionelle Krypto<br />
              Investment <span className="italic text-gold font-normal">Plattform.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg text-white/60 leading-relaxed"
            >
              Der exklusive institutionelle Fonds von Velora Assets schließt seine Pforten. Schließen Sie sich den letzten 88 Mitgliedern an, um durch unsere proprietären Algorithmen automatisierte, risikoarme Renditen zu erzielen, bevor die Kapazität erreicht ist.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onSignUp}
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4.5 text-base font-semibold text-ink transition hover:scale-[1.03] cursor-pointer"
              >
                Jetzt Investieren
                <ArrowUpRight className="size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href="#features" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition font-medium">
                Erfahren Sie, wie es funktioniert
                <ArrowUpRight className="size-4" />
              </a>
            </motion.div>
          </div>

          {/* Right: Live stats dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Mini candlestick chart card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-display font-bold text-sm">B</div>
                  <div>
                    <div className="text-sm font-medium text-white">BTC/USDT</div>
                    <div className="text-xs text-white/40">Bitcoin</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg text-white">$67,420</div>
                  <div className="font-mono text-xs text-emerald-400">+2.84%</div>
                </div>
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-1 h-20">
                {candles.slice(0, 16).map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 flex flex-col items-center justify-end"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'bottom', height: `${c.h}%` }}
                  >
                    <div className={`w-[1px] ${c.green ? 'bg-emerald-500/50' : 'bg-red-500/50'}`} style={{ height: `${c.top}%` }} />
                    <motion.div
                      className={`w-full max-w-[6px] rounded-[1px] ${c.green ? 'bg-emerald-500' : 'bg-red-500'}`}
                      style={{ height: `${c.body}%`, minHeight: 2 }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                    <div className={`w-[1px] flex-1 ${c.green ? 'bg-emerald-500/50' : 'bg-red-500/50'}`} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6"
              >
                <div className="text-xs text-white/40 mb-2 font-mono uppercase tracking-wider">Ziel-APY</div>
                <div className="font-display text-3xl font-light text-gold">14.2%</div>
                <div className="mt-2 text-xs text-emerald-400/80">Kontinuierlich geliefert</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6"
              >
                <div className="text-xs text-white/40 mb-2 font-mono uppercase tracking-wider">Gewinnrate</div>
                <div className="font-display text-3xl font-light text-white">98.4%</div>
                <div className="mt-2 text-xs text-white/40">Über alle Strategien hinweg</div>
              </motion.div>
            </div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5 flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Unternehmenssicherheit</div>
                <div className="text-xs text-white/40 mt-0.5">Multi-Sig Cold Storage - SOC 2 konform - Vollständig versichert</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRUSTED BY ---------------- */
function TrustedBy() {
  const brands = [
    "Fireblocks", "Chainalysis", "BitGo", "Coinbase Custody", "Gemini Trust", "Ledger Enterprise"
  ];
  return (
    <section className="relative border-y border-white/10 bg-ink py-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <h3 className="text-center font-mono text-xs uppercase tracking-[0.25em] text-white/40">
          Gesichert durch Branchenführer
        </h3>
        <div className="overflow-hidden mt-8">
          <div className="marquee flex w-max gap-16 whitespace-nowrap font-display text-xl sm:text-2xl font-light text-white/30">
            {[...brands, ...brands, ...brands].map((b, i) => (
              <span key={i} className="flex items-center gap-16">
                {b}
                <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const featuresList = [
    {
      icon: ShieldCheck,
      title: "Bankübliche Sicherheit",
      body: "Ihre Vermögenswerte werden durch Multi-Sig Cold Storage, strenge Audits und branchenführende Versicherungen geschützt.",
      badge: "Sicherheit"
    },
    {
      icon: BarChart3,
      title: "Algorithmischer Handel",
      body: "Nutzen Sie fortschrittliche Ausführungsalgorithmen, um Slippage zu minimieren und Renditen auf globalen Märkten zu maximieren.",
      badge: "Leistung"
    },
    {
      icon: Lock,
      title: "Regulierte Verwahrung",
      body: "Wir operieren innerhalb strenger regulatorischer Rahmenbedingungen, um sicherzustellen, dass Ihr Kapital getrennt und vollständig konform ist.",
      badge: "Compliance"
    },
    {
      icon: Wallet,
      title: "Hohe Liquidität",
      body: "Greifen Sie auf Liquiditätspools auf institutionellem Niveau zu, um wichtige digitale Assets sofort abzuwickeln.",
      badge: "Liquidität"
    }
  ];

  return (
    <section id="features" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
              Plattform-Funktionen
            </span>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
              Entwickelt für
              <span className="block italic text-ink/40">Spitzenleistungen.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink/70">
              Alles, was Sie brauchen, um digitale Vermögenswerte sicher zu verwalten, ohne technische Komplexität.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuresList.map((s, i) => (
               <Reveal key={s.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group h-full rounded-3xl border border-ink/10 bg-white p-8 transition hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-gold transition group-hover:rotate-6">
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="font-display mt-8 text-2xl tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-ink/70">{s.body}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-ink/5 flex items-center justify-between text-sm font-mono text-ink/50">
                    <span>{s.badge}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PERFORMANCE ---------------- */
function Performance() {
  const assets = [
    { sym: "BTC", name: "Bitcoin", price: "67,420", chg: "+1.84%", up: true },
    { sym: "ETH", name: "Ethereum", price: "3,842", chg: "+2.41%", up: true },
    { sym: "SOL", name: "Solana", price: "184.3", chg: "+5.10%", up: true },
    { sym: "LINK", name: "Chainlink", price: "18.42", chg: "-0.42%", up: false },
  ];

  return (
    <section id="markets" className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Live-Märkte</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                Premium-Asset <span className="italic block text-gold sm:inline">Abdeckung</span>
              </h2>
            </div>
            <p className="max-w-sm text-white/60 text-base leading-relaxed">
              Handeln und staken Sie erstklassige Kryptowährungen mit hoher Liquidität und engen Spreads.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {assets.map((c, i) => (
            <Reveal key={c.sym} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] transition hover:shadow-2xl flex flex-col justify-between p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] font-display text-gold text-xl">{c.sym[0]}</div>
                  <span className={`font-mono text-sm ${c.up ? "text-emerald-400" : "text-red-400"}`}>{c.chg}</span>
                </div>
                <div className="mt-6">
                  <div className="font-display text-sm text-white/60 uppercase tracking-wider">{c.name}</div>
                  <div className="mt-2 font-display text-3xl font-light">${c.price}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const reviews = [
    {
      quote: "Velora Assets bietet die institutionelle Sicherheit, die ich brauche, ohne die Agilität dezentralisierter Märkte zu opfern.",
      author: "Michael T.",
      role: "Family-Office-Direktor",
    },
    {
      quote: "Ihre algorithmischen Strategien zur Renditegenerierung haben unsere internen Benchmarks kontinuierlich übertroffen.",
      author: "Sarah J.",
      role: "Fondsmanager",
    },
    {
      quote: "Die sauberste und professionellste Plattform für vermögende Privatkunden, die in digitale Vermögenswerte diversifizieren möchten.",
      author: "David R.",
      role: "Angel-Investor",
    }
  ];

  return (
    <section id="testimonials" className="relative bg-bone py-32 text-ink overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">Von Investoren vertraut</span>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
              Kapital trifft Vertrauen.
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="overflow-hidden mt-16 w-full relative py-4">
        {/* Soft edge masking */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bone to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bone to-transparent z-10" />
        
        <div className="marquee flex w-max gap-8 whitespace-nowrap">
          {[...reviews, ...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="w-[360px] sm:w-[420px] shrink-0 whitespace-normal flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-8 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.06)] hover:border-gold transition-colors duration-350"
            >
              <blockquote className="font-display text-lg sm:text-xl font-light leading-relaxed text-ink/80">
                "{r.quote}"
              </blockquote>
              <div className="mt-8 flex items-center gap-3 border-t border-ink/5 pt-5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-ink/20 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-ink">{r.author}</div>
                  <div className="text-xs text-ink/50">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const faqItems = [
    {
      q: "Wie sicher sind meine Vermögenswerte?",
      a: "Kundenvermögenswerte werden in stark verschlüsselten, offline Multi-Sig Cold-Storage-Tresoren gespeichert. Wir arbeiten mit branchenführenden Verwahrern zusammen, um maximale Sicherheit zu gewährleisten."
    },
    {
      q: "Wie hoch sind die Gebühren?",
      a: "Wir berechnen einen transparenten pauschalen Prozentsatz auf das AUM (Assets Under Management) ohne versteckte Handelsgebühren oder Auszahlungsstrafen."
    },
    {
      q: "Wer ist berechtigt zu investieren?",
      a: "Wir bedienen akkreditierte Investoren, Family Offices und institutionelle Kunden. Ein strenger KYC/AML-Onboarding-Prozess ist erforderlich."
    },
    {
      q: "Bieten Sie Steuerberichte an?",
      a: "Ja, wir stellen am Ende jedes Geschäftsjahres umfassende, automatisierte Steuerberichte zur Verfügung, die auf Ihre Gerichtsbarkeit zugeschnitten sind."
    }
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ink py-32">
      <div className="mx-auto grid max-w-[1400px] items-start gap-16 px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Fragen?</span>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl text-white">
            Häufige Fragen.
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/60">
            Klare, transparente Antworten darauf, wie wir Ihr Kapital schützen und vermehren.
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqItems.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="block w-full py-6 text-left"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="font-display text-2xl sm:text-3xl tracking-tight text-white hover:text-gold transition-colors">{it.q}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-6 max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed">{it.a}</p>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA({ onSignUp }: { onSignUp: () => void }) {
  return (
    <section id="cta" className="relative bg-ink py-16 sm:py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[36px] bg-gradient-to-r from-gold to-gold-soft p-8 sm:p-12 text-ink md:p-20">
            <div className="absolute -right-20 -top-20 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] rounded-full bg-white/30 blur-3xl" />
            <div className="relative grid items-end gap-8 sm:gap-12 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-ink/70 bg-ink/10 px-3 py-1 rounded-full border border-ink/10">Schließt bald</span>
                <h2 className="font-display mt-4 sm:mt-6 text-3xl sm:text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
                  Letzte 88 <span className="italic block sm:inline">Positionen.</span>
                </h2>
                <p className="mt-3 sm:mt-4 text-ink/80 max-w-xl text-sm sm:text-base md:text-lg font-medium">
                  Unser Fonds ist strikt auf 2.500 Mitglieder begrenzt, um die Renditeintegrität aufrechtzuerhalten. Sichern Sie sich Ihre Zuteilung, bevor wir auf unbestimmte Zeit für die Öffentlichkeit schließen.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={onSignUp} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-gold transition hover:scale-[1.02] text-center cursor-pointer">
                  Konto Erstellen <ArrowUpRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function ContactSection() {
  return (
    <section id="contact" className="relative bg-ink py-16 sm:py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold">Kontakt aufnehmen</span>
              <h2 className="font-display mt-4 sm:mt-6 text-2xl sm:text-3xl font-light md:text-5xl">Sprechen Sie mit einem Berater</h2>
              <p className="mt-3 sm:mt-4 text-white/50 text-xs sm:text-sm md:text-base leading-relaxed">
                Haben Sie Fragen, bevor Sie sich Ihre Zuteilung sichern? Unser Concierge-Team steht Ihnen rund um die Uhr zur Verfügung.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
