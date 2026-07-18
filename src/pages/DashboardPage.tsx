import { motion } from "motion/react";
import { ArrowRight, Shield, Lock, Briefcase, AlertCircle } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [formState, setFormState] = useState({ name: "", email: "", message: "", status: "idle", error: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isLoading && !user) {
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
              <span className="text-xs font-medium tracking-wide text-gold">SECURE PORTAL ACTIVE</span>
            </div>
            <h1 className="font-display text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
              Protecting and scaling <br className="hidden md:block" />
              <span className="italic text-white/70">your digital wealth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/50 leading-relaxed">
              Welcome to your private institutional allocation portal. We utilize highly secure, proprietary frameworks to systematically protect your capital while exposing it to curated, compounded growth strategies.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* FOMO / Urgency Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-gold/40 bg-gold/5 p-8 md:col-span-2 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 max-w-lg">
                <div className="flex items-center gap-2 text-gold mb-4">
                  <AlertCircle className="size-5" />
                  <span className="text-sm font-semibold tracking-wider uppercase">Limited Availability</span>
                </div>
                <h3 className="text-2xl font-light md:text-3xl mb-4 text-white">
                  Q3 Allocation Window Closing
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  To ensure maximum capital efficiency and uncompromising security for our current partners, we strictly cap our total managed allocation. Once our current capacity threshold is reached, new deposits will be paused indefinitely. Secure your position before the remaining spots are filled.
                </p>
                <button className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-all hover:scale-105">
                  Secure Your Allocation
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-gold transition-transform duration-500 group-hover:scale-110">
                <Shield className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-light">Uncompromising Security</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Your assets are protected by enterprise-grade cold storage and multi-signature verification, ensuring military-grade protection against all external threats.
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
                <Lock className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-light">Risk-Averse Compounding</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                We prioritize capital preservation above all else. Our proprietary systems safely compound your wealth through meticulously audited, low-risk market environments.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:col-span-2"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-white transition-transform duration-500 group-hover:scale-110">
                <Briefcase className="size-6" />
              </div>
              <h3 className="mb-3 text-xl font-light">Institutional Grade Strategies</h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-xl">
                Gain access to the exact same bespoke growth strategies typically reserved for ultra-high-net-worth individuals and tier-one institutions. No speculation, just systematic, verifiable wealth generation built on absolute trust.
              </p>
            </motion.div>
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
                  <input id="name" required value={formState.name} onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-gold/60 focus:bg-black transition text-white placeholder:text-white/30 text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/70">Priority Email</label>
                  <input id="email" type="email" required value={formState.email} onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-gold/60 focus:bg-black transition text-white placeholder:text-white/30 text-sm" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">Secure Message</label>
                <textarea id="message" required value={formState.message} onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))} rows={5} className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3.5 outline-none focus:border-gold/60 focus:bg-black transition text-white placeholder:text-white/30 text-sm resize-none" placeholder="How can we assist with your allocation?" />
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
