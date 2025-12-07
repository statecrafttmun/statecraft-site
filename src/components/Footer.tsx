"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                            <span className="text-primary">MUN</span>Society
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering young leaders through diplomacy, debate, and dialogue. Join us to make a difference.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {["Home", "About", "Events", "Publications", "Gallery", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-gray-400 hover:text-primary text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                                <span>Mahatma Hansraj Marg, Malkaganj, Delhi 110 007</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={18} className="text-primary shrink-0" />
                                <a href="mailto:contact@statecrafthansraj.info" className="hover:text-white transition-colors">
                                    contact@statecrafthansraj.info
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/statecrafthansraj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/statecrafthansraj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} MUN Society. All rights reserved.
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-gray-500 hover:text-primary text-sm transition-colors"
                    >
                        Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
}
