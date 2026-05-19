"use client";

import { useEffect, useState } from "react";
import { getItem, setItem } from "@/lib/storage";

/** SSR-safe useState backed by localStorage */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const raw = getItem(key);
    if (raw !== null) {
      try {
        setStoredValue(JSON.parse(raw) as T);
      } catch {
        setStoredValue(raw as unknown as T);
      }
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
