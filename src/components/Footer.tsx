"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#020308] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--color-gold)] opacity-5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="block text-2xl font-serif font-bold text-white tracking-wide">
                Statecraft
              </span>
              <span className="block text-xs text-[var(--color-gold)] tracking-[0.3em] uppercase mt-1">
                Hansraj College
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              Cultivating the next generation of diplomats and leaders through
              rigorous debate, statesmanship, and the pursuit of honor.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialButton
                href="https://www.instagram.com/hansrajmunsoc"
                icon={Instagram}
              />
              <SocialButton
                href="https://www.linkedin.com/company/statecraft-hansraj-college/"
                icon={Linkedin}
              />
              <SocialButton
                href="mailto:Contact@statecrafthansraj.info"
                icon={Mail}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-serif mb-6 text-lg">Navigation</h4>
            <ul className="space-y-3">
              {["Home", "Events", "Blog", "About", "Contact"].map((item) => {
                const href =
                  item === "Home"
                    ? "/"
                    : item === "Blog"
                    ? "/publications"
                    : `/${item.toLowerCase()}`;

                return (
                  <li key={item}>
                    <Link
                      href={href}
                      className="text-sm text-gray-500 hover:text-[var(--color-gold)] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-white font-serif mb-6 text-lg">Secretariat</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-sm text-gray-400">
                <MapPin
                  className="shrink-0 text-[var(--color-gold)] mt-0.5"
                  size={16}
                />
                <span>
                  Hansraj College, University of Delhi
                  <br />
                  Mahatma Hansraj Marg, Malkaganj,
                  <br />
                  Delhi - 110007
                </span>
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-400">
                <Mail className="shrink-0 text-[var(--color-gold)]" size={16} />
                <a
                  href="mailto:Contact@statecrafthansraj.info"
                  className="hover:text-white transition-colors"
                >
                  Contact@statecrafthansraj.info
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} Hansraj College MUN Society. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  icon: Icon,
}: {
  href: string;
  icon: React.ComponentType<{ size: number }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all bg-white/5 hover:bg-transparent"
    >
      <Icon size={18} />
    </a>
  );
}
