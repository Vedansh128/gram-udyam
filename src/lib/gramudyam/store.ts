import { useEffect, useState } from "react";
import type { Assessment } from "./types";

const KEY = "gu-assessment";

export function saveAssessment(a: Assessment) {
  window.localStorage.setItem(KEY, JSON.stringify(a));
}

export function readAssessment(): Assessment | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Assessment) : null;
  } catch {
    return null;
  }
}

export function useStoredAssessment() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAssessment(readAssessment());
    setLoaded(true);
  }, []);

  return { assessment, loaded };
}
