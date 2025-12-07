"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
    return (
        <div className="min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/20"
                    >
                        Recruitment Open
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Join the <span className="text-primary">Legacy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400"
                    >
                        Be part of a community that shapes future leaders. We are looking for passionate individuals to join our various departments.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-6">Why Join Us?</h3>
                        <ul className="space-y-4">
                            {[
                                "Develop public speaking and negotiation skills",
                                "Network with like-minded individuals",
                                "Gain experience in event management",
                                "Access to exclusive workshops and training",
                                "Certificate of appreciation upon tenure completion"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <CheckCircle className="text-primary shrink-0 mt-1" size={18} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex flex-col justify-center text-center"
                    >
                        <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                        <p className="text-gray-300 mb-8">
                            The recruitment process consists of a form submission followed by an interview round.
                        </p>
                        <Link
                            href="https://forms.google.com"
                            target="_blank"
                            className="px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 mx-auto w-full md:w-auto"
                        >
                            Fill Application Form <ArrowRight size={20} />
                        </Link>
                        <p className="text-sm text-gray-500 mt-6">
                            Deadline: September 30, 2024
                        </p>
                    </motion.div>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-8">Departments</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["Research", "International Press", "Design", "Tech", "Public Relations", "Logistics"].map((dept) => (
                            <span key={dept} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium">
                                {dept}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
