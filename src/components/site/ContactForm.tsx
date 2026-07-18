import { useState } from "react";

export function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "", status: "idle", error: "" });

  return (
    <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 shadow-2xl backdrop-blur-xl w-full">
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
              phone: "+1 000 000 0000",
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
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400 text-center font-medium">
            Message sent securely. Our team will contact you shortly.
          </div>
        )}
        {formState.status === "error" && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 text-center font-medium">
            {formState.error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-left">
            <label htmlFor="name" className="text-sm font-medium text-white/70 ml-2">Full Name</label>
            <input id="name" required value={formState.name} onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-gold/50 focus:bg-black transition-all duration-300 text-white placeholder:text-white/30 shadow-inner" placeholder="John Doe" />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium text-white/70 ml-2">Priority Email</label>
            <input id="email" type="email" required value={formState.email} onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-gold/50 focus:bg-black transition-all duration-300 text-white placeholder:text-white/30 shadow-inner" placeholder="john@example.com" />
          </div>
        </div>
        <div className="space-y-2 text-left">
          <label htmlFor="message" className="text-sm font-medium text-white/70 ml-2">Secure Message</label>
          <textarea id="message" required value={formState.message} onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))} rows={5} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-gold/50 focus:bg-black transition-all duration-300 text-white placeholder:text-white/30 resize-none shadow-inner" placeholder="How can we assist with your allocation?" />
        </div>
        <button type="submit" disabled={formState.status === "loading"} className="relative w-full group overflow-hidden rounded-2xl bg-gold text-ink font-medium px-6 py-4 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-sm tracking-wide uppercase font-semibold">
            {formState.status === "loading" ? "Encrypting & Sending..." : "Send Encrypted Message"}
          </span>
        </button>
      </form>
    </div>
  );
}
