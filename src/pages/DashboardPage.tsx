import { motion } from "motion/react";
import { ArrowRight, Shield, Lock, Briefcase, AlertCircle } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ContactForm } from "@/components/site/ContactForm";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isLoading && !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen bg-ink text-white selection:bg-gold/30 selection:text-white">
      {/* Glow effects */}
      <div className="pointer-events-none absolute -left-[20%] top-0 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-gold/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-[10%] top-[40%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-white/5 blur-[100px]" />

      <Nav />

      <main className="relative pt-24 sm:pt-32 pb-16 sm:pb-20">
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-medium tracking-wide text-gold">SECURE PORTAL ACTIVE</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
              Schutz und Skalierung <br className="hidden sm:block" />
              <span className="italic text-white/70">Ihres digitalen Vermögens.</span>
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-white/50 leading-relaxed">
              Willkommen in Ihrem privaten institutionellen Zuteilungsportal. Wir nutzen hochsichere, proprietäre Frameworks, um Ihr Kapital systematisch zu schützen und es gleichzeitig kuratierten, verzinsten Wachstumsstrategien auszusetzen.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {/* FOMO / Urgency Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-gold/40 bg-gold/5 p-5 sm:p-8 md:col-span-2 md:p-12 flex flex-col gap-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-gold mb-3 sm:mb-4">
                  <AlertCircle className="size-4 sm:size-5" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">Begrenzte Verfügbarkeit</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light md:text-3xl mb-3 sm:mb-4 text-white">
                  Q3 Zuteilungsfenster schließt
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 sm:mb-6">
                  Um unseren aktuellen Partnern maximale Kapitaleffizienz und kompromisslose Sicherheit zu gewährleisten, begrenzen wir unsere gesamte verwaltete Zuteilung streng. Sobald unsere aktuelle Kapazitätsgrenze erreicht ist, werden neue Einzahlungen auf unbestimmte Zeit pausiert.
                </p>
                <button className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-ink transition-all hover:scale-105">
                  Sichern Sie Ihre Zuteilung
                  <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 sm:p-8 flex flex-col justify-center"
            >
              <div className="mb-4 sm:mb-6 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.05] text-gold transition-transform duration-500 group-hover:scale-110">
                <Shield className="size-5 sm:size-6" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-light">Kompromisslose Sicherheit</h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                Ihre Vermögenswerte werden durch Cold Storage auf Unternehmensniveau und Multi-Signatur-Verifizierung geschützt, was einen Schutz nach militärischen Standards vor allen externen Bedrohungen gewährleistet.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 sm:p-8"
            >
              <div className="mb-4 sm:mb-6 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.05] text-white transition-transform duration-500 group-hover:scale-110">
                <Lock className="size-5 sm:size-6" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-light">Risikoaverser Zinseszins</h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                Der Erhalt des Kapitals hat für uns oberste Priorität. Unsere proprietären Systeme vermehren Ihr Vermögen sicher durch sorgfältig geprüfte, risikoarme Marktumgebungen.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 sm:p-8 md:col-span-2"
            >
              <div className="mb-4 sm:mb-6 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.05] text-white transition-transform duration-500 group-hover:scale-110">
                <Briefcase className="size-5 sm:size-6" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-light">Institutionelle Strategien</h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xl">
                Erhalten Sie Zugang zu genau denselben maßgeschneiderten Wachstumsstrategien, die normalerweise extrem vermögenden Privatpersonen und erstklassigen Institutionen vorbehalten sind. Keine Spekulation, nur systematische, verifizierbare Vermögensgenerierung, die auf absolutem Vertrauen basiert.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto mt-16 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-light md:text-5xl">Kontaktieren Sie Ihren Account Manager</h2>
              <p className="mt-3 sm:mt-4 text-white/50 text-xs sm:text-sm md:text-base leading-relaxed">
                Als verifizierter Investor haben Sie direkten vorrangigen Zugang zu unserem OTC- und Concierge-Desk.
              </p>
            </div>
            <ContactForm />
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
