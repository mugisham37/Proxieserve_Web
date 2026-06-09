"use client";

import * as React from "react";
import { registerServiceWorker, setPwaToastFn } from "@/lib/pwa";
import { useToast } from "@/lib/toast-context";

export function PwaInit() {
  const { toast } = useToast();

  React.useEffect(() => {
    setPwaToastFn((message, opts) => {
      toast(message, opts as { variant?: "default" | "success" | "error" | "warning" });
    });
    registerServiceWorker();
  }, [toast]);

  return null;
}
