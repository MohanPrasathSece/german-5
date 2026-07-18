import { useState, useEffect } from "react";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { COUNTRIES, getDefaultCountry } from "@/lib/countries";
import { formatPhoneForFrontend } from "@/lib/phone-formatter";
import { CountryDropdown } from "@/components/site/CountryDropdown";

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "idle",
    error: ""
  });
  const [countryIso, setCountryIso] = useState(getDefaultCountry().iso);

  useEffect(() => {
    const selectedCountry = COUNTRIES.find(c => c.iso === countryIso) || getDefaultCountry();
    if (!formState.phone || formState.phone === '+' || COUNTRIES.some(c => formState.phone === '+' + c.dialCode)) {
      setFormState(prev => ({ ...prev, phone: '+' + selectedCountry.dialCode }));
    }
  }, [countryIso]);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedCountry = COUNTRIES.find(c => c.iso === countryIso) || getDefaultCountry();
    setFormState(prev => ({ ...prev, phone: formatPhoneForFrontend(e.target.value, selectedCountry.dialCode) }));
  }

  return (
    <div className="relative z-10 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 sm:p-8 md:p-12 shadow-2xl backdrop-blur-xl w-full">
      <form className="space-y-4 sm:space-y-6" onSubmit={async (e) => {
        e.preventDefault();
        setFormState(prev => ({ ...prev, status: "loading", error: "" }));

        try {
          const res = await fetch("/api/crm/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formState.name,
              email: formState.email,
              phone: formState.phone,
              country: countryIso,
              message: formState.message
            })
          });

          const data = await res.json();

          if (!res.ok) {
            setFormState(prev => ({ ...prev, status: "error", error: data.error || "Something went wrong. Please try again." }));
            return;
          }

          setFormState({ name: "", email: "", phone: "+" + (COUNTRIES.find(c => c.iso === countryIso)?.dialCode || "41"), message: "", status: "success", error: "" });
        } catch (err) {
          setFormState(prev => ({ ...prev, status: "error", error: "Network error. Please check your connection." }));
        }
      }}>
        {formState.status === "success" && (
          <div className="rounded-xl sm:rounded-2xl border border-green-500/30 bg-green-500/10 p-3 sm:p-4 text-xs sm:text-sm text-green-400 text-center font-medium">
            Message sent securely. Our team will contact you shortly.
          </div>
        )}
        {formState.status === "error" && (
          <div className="rounded-xl sm:rounded-2xl border border-red-500/30 bg-red-500/10 p-3 sm:p-4 text-xs sm:text-sm text-red-400 text-center font-medium">
            {formState.error}
          </div>
        )}

        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 text-left">
            <label className="text-xs sm:text-sm font-medium text-white/70 ml-1 sm:ml-2 flex items-center gap-1.5">
              <User className="size-3.5 text-white/40" />
              Full Name
            </label>
            <input
              required
              value={formState.name}
              onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:border-gold/50 focus:bg-black transition-all duration-300 text-sm sm:text-base text-white placeholder:text-white/30 shadow-inner"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2 text-left">
            <label className="text-xs sm:text-sm font-medium text-white/70 ml-1 sm:ml-2 flex items-center gap-1.5">
              <Mail className="size-3.5 text-white/40" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:border-gold/50 focus:bg-black transition-all duration-300 text-sm sm:text-base text-white placeholder:text-white/30 shadow-inner"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5 sm:space-y-2 text-left">
          <label className="text-xs sm:text-sm font-medium text-white/70 ml-1 sm:ml-2 flex items-center gap-1.5">
            <Phone className="size-3.5 text-white/40" />
            Phone Number
          </label>
          <div className="flex items-stretch gap-2">
            <CountryDropdown value={countryIso} onChange={setCountryIso} />
            <input
              type="tel"
              required
              value={formState.phone}
              onChange={handlePhoneChange}
              className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:border-gold/50 focus:bg-black transition-all duration-300 text-sm sm:text-base text-white placeholder:text-white/30 shadow-inner"
              placeholder="+41 79 123 45 67"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5 sm:space-y-2 text-left">
          <label className="text-xs sm:text-sm font-medium text-white/70 ml-1 sm:ml-2 flex items-center gap-1.5">
            <MessageSquare className="size-3.5 text-white/40" />
            Secure Message
          </label>
          <textarea
            required
            value={formState.message}
            onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
            rows={4}
            className="w-full bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:border-gold/50 focus:bg-black transition-all duration-300 text-sm sm:text-base text-white placeholder:text-white/30 resize-none shadow-inner"
            placeholder="How can we assist with your allocation?"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formState.status === "loading"}
          className="relative w-full group overflow-hidden rounded-xl sm:rounded-2xl bg-gold text-ink font-medium px-6 py-3.5 sm:py-4 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-xs sm:text-sm tracking-wide uppercase font-semibold">
            {formState.status === "loading" ? "Encrypting & Sending..." : "Send Encrypted Message"}
          </span>
        </button>
      </form>
    </div>
  );
}
