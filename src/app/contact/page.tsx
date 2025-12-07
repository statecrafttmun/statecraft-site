"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function ContactPage() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <div className="min-h-screen pb-20 pt-20 bg-[#020308]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-gold)] font-bold tracking-[0.3em] text-xs uppercase block mb-4">Secretariat</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Get in Touch</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
                    >
                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            Whether you are a delegate, faculty advisor, or prospective partner, the Secretariat is here to address your queries.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, title: "General Inquiries", val: "contact@statecrafthansraj.info" },
                                { icon: Phone, title: "Emergency Contact", val: "+91 98765 43210" },
                                { icon: MapPin, title: "Secretariat Office", val: "Hansraj College, University of Delhi, Mahatma Hansraj Marg, Malkaganj, Delhi 110 007" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[var(--color-gold)] group-hover:text-[var(--color-gold)] transition-all duration-300">
                                        <item.icon size={20} className="text-gray-400 group-hover:text-[var(--color-gold)] transition-colors" />
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-white font-bold mb-1 font-serif text-lg">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Mockup */}
                        <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4855071869557!2d77.20724107616149!3d28.679187975639145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd9a74a2aacf%3A0x59e09f11f71c1a54!2sHansraj%20College!5e0!3m2!1sen!2sin!4v1701928646141!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)] opacity-5 rounded-bl-[100px] pointer-events-none" />

                        <h2 className="text-2xl font-bold mb-8 font-serif text-white">Send a Message</h2>
                        <form className="space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const first = (form.elements.namedItem('first') as HTMLInputElement).value;
                            const last = (form.elements.namedItem('last') as HTMLInputElement).value;
                            const topic = (form.querySelector('select') as HTMLSelectElement).value;
                            const message = (form.querySelector('textarea') as HTMLTextAreaElement).value;

                            const subject = `[${topic}] Inquiry from ${first} ${last}`;
                            const body = `Name: ${first} ${last}\nTopic: ${topic}\n\nMessage:\n${message}`;

                            window.location.href = `mailto:contact@statecrafthansraj.info?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="First Name" placeholder="John" id="first" focused={focusedField} setFocused={setFocusedField} />
                                <InputField label="Last Name" placeholder="Doe" id="last" focused={focusedField} setFocused={setFocusedField} />
                            </div>

                            <InputField label="Email Address" placeholder="john@example.com" type="email" id="email" focused={focusedField} setFocused={setFocusedField} />

                            <div className="relative">
                                <label className={clsx("text-xs font-bold uppercase tracking-wider mb-2 block transition-colors", focusedField === 'topic' ? "text-[var(--color-gold)]" : "text-gray-500")}>
                                    Topic
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-[#050509] border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-[var(--color-gold)] transition-colors cursor-pointer"
                                        onFocus={() => setFocusedField('topic')}
                                        onBlur={() => setFocusedField(null)}
                                    >
                                        <option>General Inquiry</option>
                                        <option>Delegate Application</option>
                                        <option>Partnership Proposal</option>
                                        <option>Press & Media</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={clsx("text-xs font-bold uppercase tracking-wider block transition-colors", focusedField === 'message' ? "text-[var(--color-gold)]" : "text-gray-500")}>
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-[#050509] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
                                    placeholder="How can we assist you?"
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </div>

                            <button className="w-full py-4 rounded-lg bg-[var(--color-gold)] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
                                Send Message
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, placeholder, type = "text", id, focused, setFocused }: any) {
    return (
        <div className="space-y-2">
            <label className={clsx("text-xs font-bold uppercase tracking-wider block transition-colors", focused === id ? "text-[var(--color-gold)]" : "text-gray-500")}>
                {label}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                className="w-full bg-[#050509] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-gray-700"
                placeholder={placeholder}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
            />
        </div>
    );
}
