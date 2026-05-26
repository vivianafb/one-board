"use client";

import { useState } from "react";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-md bg-[#0d1b2e] text-gray-300 text-sm">
      <span className="shrink-0">ℹ️</span>
      <span className="flex-1">Demo app — no login required. Navigate freely.</span>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-gray-500 hover:text-gray-200 transition-colors leading-none"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
}
