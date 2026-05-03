"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CurrencyCode } from "@/types";

const CURRENCIES: CurrencyCode[] = ["US$", "EUR", "RWF", "KES", "NGN", "ZAR"];

interface CurrencySelectProps {
  value: CurrencyCode;
  onValueChange: (value: CurrencyCode) => void;
}

export function CurrencySelect({ value, onValueChange }: CurrencySelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as CurrencyCode)}
    >
      <SelectTrigger className="font-mono text-[13px] bg-bg border-border rounded-[10px] h-9 px-3">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-surface border-border font-mono text-[13px]">
        {CURRENCIES.map((c) => (
          <SelectItem key={c} value={c} className="font-mono text-[13px]">
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
