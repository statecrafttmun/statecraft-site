"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getPublications } from "@/actions";
import { useState, useEffect } from "react";

export default function Home() {
  const [publications, setPublications] = useState<any[]>([]);

  useEffect(() => {
    getPublications().then((pubs) => setPublications(pubs));
  }, []);

  const featuredPub = publications[0];
  const recentPubs = publications.slice(1, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
          {/* Placeholder for dynamic background media */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1575320181282-9afab399332c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale mix-blend-overlay" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              {/* Logo Placeholder */}
              <span className="text-4xl font-bold text-primary">M</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400"
          >
            Diplomacy. Dialogue. Change.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Empowering the next generation of leaders to solve global challenges through negotiation and collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all flex items-center gap-2 group"
            >
              Learn More
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
            >
              Upcoming Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                Who <span className="text-primary">We Are</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We are a student-run organization dedicated to simulating the United Nations. Our society fosters public speaking, critical thinking, and diplomatic skills among students.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Through conferences, workshops, and debates, we provide a platform for young minds to engage with international relations and global policy.
              </p>
              <Link
                href="/about"
                className="text-primary font-semibold hover:text-primary-light transition-colors flex items-center gap-2"
              >
                Read our full story <ArrowRight size={18} />
              </Link>
            </ScrollReveal>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* Core Team Placeholder */}
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <Users size={64} className="text-gray-600" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-primary/10 -z-10 rounded-2xl blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto px-6">
          <ScrollReveal width="100%" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What <span className="text-primary">We Do</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From large-scale summits to intimate workshops, we organize diverse events to cultivate leadership.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hansraj Virtual Diplomacy Summit",
                desc: "Our flagship virtual conference connecting delegates from around the globe.",
                icon: <Users className="w-8 h-8 text-primary" />
              },
              {
                title: "Young Leaders Fellowship",
                desc: "A rigorous program designed to mentor and train the next generation of diplomats.",
                icon: <Award className="w-8 h-8 text-primary" />
              },
              {
                title: "Collaborations",
                desc: "Partnering with other institutions to bring diverse perspectives to the table.",
                icon: <Users className="w-8 h-8 text-primary" />
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="p-8 h-full rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 group">
                  <div className="mb-6 p-4 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-6">{item.desc}</p>
                  <Link href="/events" className="text-sm font-semibold text-primary hover:text-primary-light">
                    Learn More &rarr;
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Publications */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-2">Latest <span className="text-primary">Publications</span></h2>
              <p className="text-gray-400">Read our latest articles and reports.</p>
            </ScrollReveal>
            <Link href="/publications" className="hidden md:flex items-center gap-2 text-primary hover:text-primary-light transition-colors">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {!featuredPub && (
            <div className="text-center text-gray-500 py-12">
              <p>No publications available yet.</p>
            </div>
          )}

          {featuredPub && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal width="100%">
                <Link href={`/publications/${featuredPub.id}`} className="block group relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/9]">
                  {featuredPub.image ? (
                    <img src={featuredPub.image} alt={featuredPub.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4 inline-block border border-primary/20">
                      {featuredPub.type}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {featuredPub.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-2 mb-4">
                      {featuredPub.excerpt}
                    </p>
                    <span className="text-sm text-gray-500">{featuredPub.date}</span>
                  </div>
                </Link>
              </ScrollReveal>

              <div className="space-y-6">
                {recentPubs.map((pub: any, i: number) => (
                  <ScrollReveal key={pub.id} delay={i * 0.1}>
                    <Link href={`/publications/${pub.id}`} className="flex gap-6 group cursor-pointer">
                      <div className="w-32 h-24 rounded-lg bg-gray-800 shrink-0 border border-white/10 group-hover:border-primary/30 transition-colors overflow-hidden relative">
                        {pub.image ? (
                          <img src={pub.image} alt={pub.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-primary font-medium mb-1 block">{pub.type}</span>
                        <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {pub.title}
                        </h4>
                        <span className="text-sm text-gray-500">{pub.date}</span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Awards & Recognitions */}
      <section className="py-20 bg-secondary/20 border-y border-white/5">
        <ScrollReveal width="100%">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Awards & <span className="text-primary">Recognitions</span></h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <Award size={48} className="text-gray-400" />
                  <span className="text-sm font-semibold text-gray-500">Best Delegation 2023</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
