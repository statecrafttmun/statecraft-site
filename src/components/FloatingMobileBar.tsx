"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface FloatingMobileBarProps {
  status: string;
  registrationLink?: string | null;
}

export default function FloatingMobileBar({ status, registrationLink }: FloatingMobileBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="md:hidden fixed left-0 right-0 bottom-0 p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-[#020308]/90 backdrop-blur-xl border-t border-white/10 z-30 flex gap-4">
      <a
        href="mailto:contact@statecrafthansraj.info"
        className="flex-1 py-3 rounded-lg border border-white/20 text-white font-bold text-sm text-center"
      >
        Contact
      </a>
      {status === "Open" ? (
        <a
          href={registrationLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-lg bg-[var(--color-gold)] text-black font-bold text-sm text-center shadow-[0_0_15px_rgba(0,91,187,0.3)]"
        >
          Register
        </a>
      ) : (
        <button
          disabled
          className="flex-1 py-3 rounded-lg bg-gray-700 text-gray-400 font-bold text-sm cursor-not-allowed"
        >
          Closed
        </button>
      )}
    </div>,
    document.body
  );
}
