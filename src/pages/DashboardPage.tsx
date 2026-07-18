import { motion } from "motion/react";
import { ArrowRight, TrendingUp, Shield, Activity, BarChart2, Briefcase, Zap } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [formState, setFormState] = useState({ name: "", email: "", message: "", status: "idle", error: "" });
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen bg-ink text-white selection:bg-gold/30 selection:text-white">
      {/* Glow effects */}
      <div className="pointer-events-none absolute -left-[20%] top-0 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-[10%] top-[40%] h-[500px] w-[500px] rounded-full bg-white/5 blur-[100px]" />

      <Nav />

      <main className="relative pt-32 pb-20">
        <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
              </span>
              <span className="text-xs font-medium tracking-wide text-gold">ACTIVE PORTFOLIO</span>
            </div>
            <h1 className="font-display text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
              Welcome back, <br className="hidden md:block" />
              <span className="italic text-white/70">let's grow your wealth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/50 leading-relaxed">
              You are now part of our exclusive institutional allocation. Discover exactly how our proprietary algorithms and staking pools work tirelessly to generate consistent yield for your portfolio.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:col-span-2 md:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xl font-light md:text-2xl">Algorithmic Arbitrage</h3>
                  <p className="mt-4 max-w-md text-sm text-white/50 leading-relaxed">
                    Our high-frequency trading bots scan 40+ centralized and decentralized exchanges simultaneously. By exploiting micro-inefficiencies in token prices, we generate risk-averse yield.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8 md:flex md:gap-16">
                  <div>
                    <div className="text-sm text-white/40 mb-1">Target APY</div>
                    <div className="text-3xl font-light text-gold">14.2%</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Win Rate</div>
                    <div className="text-3xl font-light">98.4%</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Risk Profile</div>
                    <div className="text-3xl font-light text-green-400">Low</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-gold transition-transform duration-500 group-hover:scale-110">
                <Activity className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-light">Deep Liquidity Provision</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Your capital is pooled into exclusive liquidity pairs on top-tier DEXs. We capture trading fees 24/7, compounding your returns automatically.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-white transition-transform duration-500 group-hover:scale-110">
                <Shield className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-light">Institutional Staking</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                We operate enterprise-grade validator nodes on Ethereum, Solana, and Polkadot. Your assets secure the network while earning block rewards.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:col-span-2 flex flex-col md:flex-row items-center gap-8 justify-between"
            >
              <div className="absolute inset-0 bg-gold/5" />
              <div className="relative z-10 max-w-lg">
                <h3 className="text-2xl font-light mb-4">Ready to deploy capital?</h3>
                <p className="text-sm text-white/60 mb-6">
                  Now that your account is verified, you can access the deposit portal. Start generating passive yield today with our proprietary strategies.
                </p>
                <button className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-all hover:scale-105">
                  Access Portal
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="relative z-10 w-full max-w-[200px] shrink-0">
                <div className="aspect-square rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center relative">
                   <div className="absolute inset-2 rounded-full border border-gold/20 border-t-gold animate-spin-slow" />
                   <Zap className="size-10 text-gold/50" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Exclusive Market Insights Section */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 mb-6">
              <span className="text-xs font-medium tracking-wide text-gold">ALPHA INTELLIGENCE</span>
            </div>
            <h2 className="font-display text-3xl font-light md:text-5xl">Exclusive Market Insights</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/50 text-sm md:text-base leading-relaxed">
              Current arbitrage opportunities and macro-economic signals actively being exploited by our neural networks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { asset: "ETH/USDC", signal: "Strong Buy", strategy: "DEX Arbitrage", return: "+4.2% APY Spike" },
              { asset: "SOL/USDT", signal: "Hold", strategy: "Validator Staking", return: "Steady at 7.1%" },
              { asset: "BTC/WBTC", signal: "Execute", strategy: "Cross-chain Liquidity", return: "0.8% Spread" },
            ].map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:bg-white/[0.04] transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-light font-display">{insight.asset}</h3>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] uppercase font-mono tracking-wider">{insight.signal}</span>
                  </div>
                  <p className="text-white/40 text-sm mb-6">Strategy: {insight.strategy}</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-green-400 font-medium">{insight.return}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-light md:text-5xl">Contact Your Account Manager</h2>
              <p className="mt-4 text-white/50 text-sm md:text-base leading-relaxed">
                As a verified investor, you have direct priority access to our OTC and concierge desk.
              </p>
            </div>

            <form className="space-y-6" onSubmit={async (e) => { 
              e.preventDefault(); 
              setFormState(prev => ({ ...prev, status: "loading", error: "" }));
              
              try {
                const res = await fetch("/api/crm", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    phone: "+1 000 000 0000", // Defaulting phone for contact form without it
                    message: formState.message
                  })
                });

                if (!res.ok) {
                  setFormState(prev => ({ ...prev, status: "error", error: "Une erreur est survenue lors de l'envoi." }));
                  return;
                }
                
                setFormState({ name: "", email: "", message: "", status: "success", error: "" });
              } catch (err) {
                setFormState(prev => ({ ...prev, status: "error", error: "Une erreur est survenue lors de l'envoi." }));
              }
            }}>
              {formState.status === "success" && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                  Message sent securely. Your Account Manager will contact you shortly.
                </div>
              )}
              {formState.status === "error" && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {formState.error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/70">Full Name</label>
                  <input id="name" required value={formState.name} onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-gold/60 focus:bg-white/[0.06] transition text-white placeholder:text-white/30 text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/70">Priority Email</label>
                  <input id="email" type="email" required value={formState.email} onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-gold/60 focus:bg-white/[0.06] transition text-white placeholder:text-white/30 text-sm" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">Secure Message</label>
                <textarea id="message" required value={formState.message} onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))} rows={5} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-gold/60 focus:bg-white/[0.06] transition text-white placeholder:text-white/30 text-sm resize-none" placeholder="How can we assist with your allocation?" />
              </div>
              <button type="submit" disabled={formState.status === "loading"} className="w-full bg-gold text-ink font-medium rounded-full px-6 py-4 hover:scale-[1.01] transition-transform text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {formState.status === "loading" ? "Encrypting & Sending..." : "Send Encrypted Message"}
              </button>
            </form>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
