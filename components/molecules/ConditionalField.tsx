"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConditionalFieldProps {
  visible: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ConditionalField({ visible, children, className }: ConditionalFieldProps) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div
            className={cn(
              "bg-[var(--brand-soft)] border-l-[3px] border-[var(--brand)] rounded-[var(--r-md)] p-4 mt-2",
              className
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
