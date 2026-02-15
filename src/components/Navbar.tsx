"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Calendar,
  BookOpen,
  Users,
  Mail,
  Image,
} from "lucide-react"; // Added Image icon
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Blog", href: "/publications", icon: BookOpen },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "About", href: "/about", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hideMobileBottomNav =
    pathname?.startsWith("/events/") && pathname.split("/").length === 3;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          scrolled ? "glass-dark py-3 border-white/5" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full border border-[var(--color-gold)] flex items-center justify-center overflow-hidden bg-black/50">
              {/* Theme-matching animated mark */}
              <img
                src="/home-anim.svg"
                alt=""
                aria-hidden="true"
                className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] opacity-60 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold)] to-transparent opacity-10 group-hover:opacity-30 transition-opacity z-10" />
              <img
                src="/logo-crest.jpg"
                alt="Statecraft Hansraj College Logo"
                className="relative z-10 w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-white tracking-wide leading-none">
                Statecraft
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-none group-hover:text-[var(--color-gold)] transition-colors">
                Hansraj College
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-all relative py-1",
                  pathname === link.href
                    ? "text-[var(--color-gold)]"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-gold)]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden text-gray-300 hover:text-[var(--color-gold)] transition-colors p-2"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - revamped look */}
      {!hideMobileBottomNav && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/5 pb-safe">
          <div className="mx-auto max-w-md px-4 py-2">
            <div className="grid grid-cols-6 gap-1 rounded-2xl bg-white/5 border border-white/10 p-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-label={link.name}
                    className={clsx(
                      "relative flex flex-col items-center justify-center py-2 rounded-xl transition-colors",
                      isActive
                        ? "bg-white/10 text-[var(--color-gold)]"
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                    )}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
                    <span
                      className={clsx(
                        "mt-1 text-[9px] font-medium tracking-wide",
                        isActive ? "opacity-100" : "opacity-60"
                      )}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <span className="absolute -top-[2px] w-8 h-[2px] bg-[var(--color-gold)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Menu Overlay (Mobile/Tablet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "10%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#020308]"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -left-20 w-[380px] h-[380px] bg-[var(--color-gold)] rounded-full blur-[140px] opacity-10" />
              <div className="absolute bottom-[-120px] right-[-120px] w-[520px] h-[520px] bg-[var(--color-gold)] rounded-full blur-[170px] opacity-10" />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: 'url("/noise.png")' }}
              />
            </div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 px-6 pt-6 flex items-center justify-between z-10">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-black/40">
                  <img
                    src="/home-anim.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] opacity-60"
                  />
                  <img
                    src="/logo-crest.jpg"
                    alt=""
                    aria-hidden="true"
                    className="relative z-10 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-white font-serif font-bold tracking-wide">
                    Statecraft
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                    Hansraj College
                  </span>
                </div>
              </Link>

              <button
                className="text-gray-300 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <div className="h-full w-full flex flex-col items-center justify-center px-8">
              <div className="w-full max-w-md space-y-3 font-sans">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "flex items-center justify-between px-5 py-4 rounded-2xl border transition-colors",
                        pathname === link.href
                          ? "bg-white/10 border-[var(--color-gold)]/30 text-white"
                          : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                      )}
                    >
                      <span className="text-lg font-medium tracking-wide">
                        {link.name}
                      </span>
                      <span className="text-[var(--color-gold)]">→</span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 text-center"
                >
                  <div className="text-xs text-[var(--color-gold)] tracking-[0.2em] uppercase">
                    Connect
                  </div>
                  <div className="h-[1px] w-12 bg-white/10 mx-auto my-3" />
                  <a
                    href="mailto:contact@statecrafthansraj.info"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    contact@statecrafthansraj.info
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
