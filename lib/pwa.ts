"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

let toastFn: ((msg: string, opts?: { variant?: string }) => void) | null = null;

export function setPwaToastFn(fn: (msg: string, opts?: { variant?: string }) => void) {
  toastFn = fn;
}

export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        // Check for updates every time the page loads
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New SW installed, notify user
              toastFn?.("A new version of ProxiServe is available — reload to update.", {
                variant: "default",
              });
            }
          });
        });
      })
      .catch(() => {
        // SW registration failed silently in dev or unsupported env
      });

    // Listen for SW messages
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "SW_UPDATE_AVAILABLE") {
        toastFn?.("ProxiServe has been updated. Reload to get the latest version.", {
          variant: "default",
        });
      }
    });
  });
}
