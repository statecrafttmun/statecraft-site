"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Target, Heart, User } from "lucide-react";
import { getTeam } from "@/actions";

export default function AboutPage() {
    const [team, setTeam] = useState<any[]>([]);

    useEffect(() => {
        getTeam().then(setTeam);
    }, []);

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <section className="relative py-24 bg-secondary/30">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-6"
                    >
                        About <span className="text-primary">Us</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        We are a community of passionate individuals dedicated to understanding global affairs and fostering diplomatic skills.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Target className="w-8 h-8 text-primary" />,
                                title: "Our Mission",
                                desc: "To provide a platform for students to engage in meaningful debate and develop a deeper understanding of international relations."
                            },
                            {
                                icon: <Heart className="w-8 h-8 text-primary" />,
                                title: "Our Values",
                                desc: "Integrity, inclusivity, and innovation are at the core of everything we do. We believe in the power of dialogue to bridge divides."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-primary" />,
                                title: "Our Community",
                                desc: "A diverse group of students from various disciplines coming together to learn, grow, and lead."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10"
                            >
                                <div className="mb-6 p-4 rounded-xl bg-primary/10 w-fit">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team - Infinite Scroll */}
            <section className="py-20 bg-black overflow-hidden">
                <div className="container mx-auto px-6 mb-12">
                    <h2 className="text-4xl font-bold text-center">Meet the <span className="text-primary">Team</span></h2>
                </div>

                <div className="relative flex w-full">
                    <motion.div
                        className="flex gap-8 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20
                        }}
                    >
                        {[...team, ...team].map((member, index) => (
                            <div
                                key={`${member.id}-${index}`}
                                className="w-64 shrink-0 group relative"
                            >
                                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 mb-4 relative border border-white/10">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                                            <User size={48} className="text-gray-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <p className="text-white font-medium whitespace-normal">"Passionate about diplomacy."</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold">{member.name}</h3>
                                <p className="text-primary text-sm">{member.role}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
