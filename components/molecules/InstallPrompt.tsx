"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { getItem, setItem } from "@/lib/storage";

const DISMISSED_KEY = "proxi:installDismissed";
const INTERACTED_KEY = "proxi:installInteracted";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // Don't show if already dismissed
    if (getItem(DISMISSED_KEY) === "true") return;

    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Only show after user has interacted with the app
      const interacted = sessionStorage.getItem(INTERACTED_KEY);
      if (interacted) setVisible(true);
    }

    // Track first interaction
    function handleInteraction() {
      sessionStorage.setItem(INTERACTED_KEY, "1");
      if (deferredPrompt) setVisible(true);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, [deferredPrompt]);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setItem(DISMISSED_KEY, "true");
    }
    setVisible(false);
    setDeferredPrompt(null);
  }

  function handleDismiss() {
    setItem(DISMISSED_KEY, "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="banner"
          aria-label="Install ProxiServe app"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          onKeyDown={(e) => { if (e.key === "Escape") handleDismiss(); }}
          className={cn(
            "fixed bottom-[20px] left-1/2 -translate-x-1/2 z-[9000]",
            "w-[calc(100vw-40px)] max-w-[440px]",
            "bg-[var(--ink)] text-[var(--cream)]",
            "rounded-[var(--r-xl)] shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
            "px-[20px] py-[16px]",
            "flex items-center gap-[12px]"
          )}
        >
          {/* App icon */}
          <div
            className={cn(
              "shrink-0 w-[44px] h-[44px] rounded-[var(--r-lg)]",
              "bg-[var(--brand)] flex items-center justify-center"
            )}
            aria-hidden="true"
          >
            <span className="font-serif italic text-white text-[18px] font-medium">P</span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-serif italic text-[14px] text-[var(--cream)] leading-snug">
              Install ProxiServe
            </p>
            <p className="font-sans text-[12px] text-[var(--cream-2)] leading-snug mt-[1px]">
              Add to your home screen for quick access
            </p>
          </div>

          {/* Install button */}
          <button
            type="button"
            onClick={handleInstall}
            aria-label="Install ProxiServe app"
            className={cn(
              "shrink-0 flex items-center gap-[6px] px-[14px] py-[7px]",
              "bg-[var(--brand)] text-white rounded-[var(--r-pill)]",
              "font-sans text-[12px] font-medium",
              "hover:opacity-90 transition-opacity",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            )}
          >
            <Download size={13} aria-hidden="true" />
            Install
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            className={cn(
              "shrink-0 w-[28px] h-[28px] flex items-center justify-center",
              "rounded-full text-[var(--cream-2)] opacity-60",
              "hover:opacity-100 hover:bg-white/10 transition-opacity",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            )}
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
