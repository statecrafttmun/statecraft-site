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
  { name: "Publications", href: "/publications", icon: BookOpen },
  { name: "Gallery", href: "/gallery", icon: Image }, // Added Gallery link
  { name: "About", href: "/about", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
            <div className="relative w-8 h-8 rounded-full border border-[var(--color-gold)] flex items-center justify-center overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold)] to-transparent opacity-10 group-hover:opacity-30 transition-opacity z-10" />
              <img
                src="/logo-crest.jpg"
                alt="Statecraft MUN Society Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-white tracking-wide leading-none">
                Statecraft MUN
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-none group-hover:text-[var(--color-gold)] transition-colors">
                Society
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

      {/* Mobile Bottom Navigation - Sticky */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/5 pb-safe">
        <div className="flex justify-between items-center px-6 py-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex flex-col items-center gap-1 transition-all duration-300",
                  isActive
                    ? "text-[var(--color-gold)] -translate-y-1"
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span
                  className={clsx(
                    "text-[10px] font-medium transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Full Screen Menu Overlay (Mobile/Tablet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#020308] flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="absolute top-6 left-6 flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full border border-white/20" />
              <span className="font-serif text-white/50 tracking-widest">
                MENU
              </span>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-gold)] rounded-full blur-[150px]" />
            </div>

            <div className="flex flex-col gap-8 text-center relative z-10 font-serif">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl text-gray-300 hover:text-[var(--color-gold)] transition-colors font-light italic"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-col gap-3 font-sans"
              >
                <span className="text-xs text-[var(--color-gold)] tracking-[0.2em] uppercase">
                  Connect
                </span>
                <div className="h-[1px] w-12 bg-white/10 mx-auto" />
                <a
                  href="mailto:contact@statecrafthansraj.info"
                  className="text-sm text-gray-400"
                >
                  contact@statecrafthansraj.info
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
