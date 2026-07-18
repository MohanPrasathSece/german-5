import { motion } from "motion/react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export function Nav({
  onSignIn,
  onSignUp,
}: {
  onSignIn?: () => void;
  onSignUp?: () => void;
} = {}) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 flex max-w-[1400px] items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-xl sm:mx-6 sm:px-7">
        <a href="/" className="flex items-center gap-2">
          <span className="inline-block h-6 w-6 rounded-full bg-gold animate-pulse" />
          <span className="font-display text-xl tracking-tight">Aegis Crypto</span>
        </a>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden text-sm text-gold/80 transition hover:text-gold sm:inline"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <LogOut className="size-3.5" />
                Abmelden
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSignIn}
                className="hidden text-sm text-white/70 transition hover:text-white sm:inline"
              >
                Anmelden
              </button>
              <button
                onClick={onSignUp}
                className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-ink transition hover:scale-[1.03]"
              >
                Registrieren
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}