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
      <ContactSection />
      <Faq />
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
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 grain overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 mx-auto h-[600px] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(233,216,74,0.12),transparent_70%)] blur-3xl animate-pulse" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex flex-col items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              Strictly Limited Allocation
            </div>
            
            <div className="flex items-center gap-4 text-sm text-white/70 bg-white/5 rounded-full px-6 py-2 border border-white/10">
               <span><strong>2,412</strong> / 2,500 Seats Filled</span>
               <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                  <div className="h-full bg-gradient-to-r from-gold to-red-500 w-[96.4%] rounded-full" />
               </div>
               <span className="text-red-400 font-medium">88 Remaining</span>
            </div>
          </motion.div>

          <h1 className="font-display mt-4 text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[1.02] tracking-tight text-white flex flex-col items-center justify-center">
            <span>Last Chance to Join.</span>
            <span className="block mt-2">
              Secure your <span className="italic text-gold font-normal">Allocation.</span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-3xl text-balance text-lg text-white/80 sm:text-xl leading-relaxed"
          >
            Aegis Crypto's exclusive institutional fund is closing its doors. Join the final 88 members to generate automated, risk-averse yield through our proprietary algorithms before capacity is reached.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={onSignUp}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4.5 text-base font-semibold text-ink transition hover:scale-[1.03] cursor-pointer"
            >
              Start Investing
              <ArrowUpRight className="size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Premium Interactive Mockup Preview */}
        <motion.div style={{ y: previewY }} className="relative mt-24">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/60 p-2 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white/40">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <div className="rounded-md bg-white/[0.04] px-16 py-1 font-mono tracking-wider">app.aegiscrypto.com</div>
              <div className="w-12" />
            </div>
            
            <div className="grid min-h-[300px] gap-6 p-6 sm:min-h-[400px] sm:grid-cols-3">
              <div className="flex flex-col justify-between rounded-2xl bg-white/[0.02] p-6 border border-white/5">
                <div>
                  <div className="inline-block rounded-lg bg-emerald-500/10 p-2 text-emerald-400"><TrendingUp className="size-5" /></div>
                  <h4 className="font-display mt-4 text-xl text-white">Portfolio Yield</h4>
                  <p className="mt-2 text-xs text-white/40">Automated staking and algorithmic yield generation.</p>
                </div>
                <div className="mt-8 font-mono text-2xl text-emerald-400">+12.4% <span className="text-xs text-white/40">APY</span></div>
              </div>
              
              <div className="relative flex flex-col justify-end rounded-2xl bg-gradient-to-br from-gold/10 to-transparent p-6 border border-white/5 sm:col-span-2">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(233,216,74,0.1),transparent_50%)]" />
                <div className="relative">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold">Real-time Analytics</span>
                  <h4 className="font-display mt-2 text-2xl sm:text-4xl text-white">Advanced market intelligence.</h4>
                  <p className="mt-3 text-sm text-white/60 max-w-md">Track your portfolio performance across all assets with precision data visualization.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
          Secured By Industry Leaders
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
      title: "Bank-Grade Security",
      body: "Your assets are protected by multi-signature cold storage, rigorous audits, and industry-leading insurance.",
      badge: "Security"
    },
    {
      icon: BarChart3,
      title: "Algorithmic Trading",
      body: "Leverage advanced execution algorithms to minimize slippage and maximize returns across global markets.",
      badge: "Performance"
    },
    {
      icon: Lock,
      title: "Regulated Custody",
      body: "We operate within strict regulatory frameworks, ensuring your capital is segregated and fully compliant.",
      badge: "Compliance"
    },
    {
      icon: Wallet,
      title: "Deep Liquidity",
      body: "Access institutional-level liquidity pools for instant settlement on major digital assets.",
      badge: "Liquidity"
    }
  ];

  return (
    <section id="features" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
              Platform Features
            </span>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
              Engineered for
              <span className="block italic text-ink/40">Excellence.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink/70">
              Everything you need to manage digital assets safely, without the technical complexity.
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
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Live Markets</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                Premium Asset <span className="italic block text-gold sm:inline">Coverage</span>
              </h2>
            </div>
            <p className="max-w-sm text-white/60 text-base leading-relaxed">
              Trade and stake top-tier cryptocurrencies with deep liquidity and tight spreads.
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
      quote: "Aegis Crypto provides the institutional security I need without sacrificing the agility of decentralized markets.",
      author: "Michael T.",
      role: "Family Office Director",
    },
    {
      quote: "Their algorithmic yield generation strategies have consistently outperformed our internal benchmarks.",
      author: "Sarah J.",
      role: "Fund Manager",
    },
    {
      quote: "The cleanest, most professional platform for high-net-worth individuals looking to diversify into digital assets.",
      author: "David R.",
      role: "Angel Investor",
    }
  ];

  return (
    <section id="testimonials" className="relative bg-bone py-32 text-ink overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">Trusted By Investors</span>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
              Capital Meets Confidence.
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
      q: "How secure are my assets?",
      a: "Client assets are stored in heavily encrypted, multi-signature cold storage vaults offline. We partner with industry-leading custodians to ensure maximum security."
    },
    {
      q: "What are the fees?",
      a: "We charge a transparent flat percentage on AUM (Assets Under Management) with zero hidden trading fees or withdrawal penalties."
    },
    {
      q: "Who is eligible to invest?",
      a: "We serve accredited investors, family offices, and institutional clients. A rigorous KYC/AML onboarding process is required."
    },
    {
      q: "Do you provide tax reporting?",
      a: "Yes, we provide comprehensive, automated tax reporting documents tailored to your jurisdiction at the end of each fiscal year."
    }
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ink py-32">
      <div className="mx-auto grid max-w-[1400px] items-start gap-16 px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Questions?</span>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl text-white">
            Common Inquiries.
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/60">
            Clear, transparent answers about how we protect and grow your capital.
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
    <section id="cta" className="relative bg-ink py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-gold to-gold-soft p-12 text-ink sm:p-20">
            <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-white/30 blur-3xl" />
            <div className="relative grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70 bg-ink/10 px-3 py-1 rounded-full border border-ink/10">Closing Soon</span>
                <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                  Final 88 <span className="italic block sm:inline">Positions.</span>
                </h2>
                <p className="mt-4 text-ink/80 max-w-xl text-base sm:text-lg font-medium">
                  Our fund is strictly capped at 2,500 members to maintain yield integrity. Secure your allocation before we close to the public indefinitely.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={onSignUp} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-gold transition hover:scale-[1.02] text-center cursor-pointer">
                  Create Your Account <ArrowUpRight className="size-4" />
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
    <section id="contact" className="relative bg-ink py-32 text-white border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Get in Touch</span>
              <h2 className="font-display mt-6 text-3xl font-light md:text-5xl">Speak with an Advisor</h2>
              <p className="mt-4 text-white/50 text-sm md:text-base leading-relaxed">
                Have questions before securing your allocation? Our concierge team is available 24/7.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

