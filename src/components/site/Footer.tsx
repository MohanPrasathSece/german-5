export function Footer() {
  return (
    <footer className="relative bg-ink pb-12 pt-24 text-white">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="font-display text-[clamp(3.5rem,14vw,14rem)] font-light leading-[0.85] tracking-tighter text-white/5 select-none text-center sm:text-left">
          AEGIS CRYPTO
        </div>
        
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span>© {new Date().getFullYear()} Aegis Crypto. Alle Rechte vorbehalten.</span>
        </div>
      </div>
    </footer>
  );
}
