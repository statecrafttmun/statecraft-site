"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, BookOpen, FileText } from "lucide-react";
import { getPublications } from "@/actions";
import Link from "next/link";
import clsx from "clsx";
import type { Publication } from "@/types";

// Local type for publications display that can include mock data with numeric id
interface PublicationDisplay {
  id: string | number;
  title: string;
  type: string;
  date: string;
  author: string;
  excerpt: string;
  tags?: string[];
  image?: string | null;
}

const categories = [
  "All",
  "Background Guide",
  "Article",
  "Newsletter",
  "Research Paper",
];

export default function PublicationsPage() {
  const [publications, setPublications] = useState<PublicationDisplay[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getPublications().then((data) => {
      if (data && data.length > 0) {
        setPublications(data);
      } else {
        // Mock
        setPublications([
          {
            id: 1,
            title: "The Future of Digital Diplomacy",
            type: "Article",
            date: "Dec 10, 2025",
            author: "Aarav Sharma",
            excerpt:
              "Analyzing how digital tools are reshaping international relations.",
          },
          {
            id: 2,
            title: "UNSC Background Guide 2026",
            type: "Background Guide",
            date: "Jan 05, 2026",
            author: "Secretariat",
            excerpt: "Comprehensive guide for the Security Council agenda.",
          },
          {
            id: 3,
            title: "October Newsletter",
            type: "Newsletter",
            date: "Oct 30, 2025",
            author: "Editorial Team",
            excerpt:
              "Highlights from our recent training sessions and workshops.",
          },
        ]);
      }
    });
  }, []);

  const filteredPubs = publications.filter(
    (p) => filter === "All" || p.type === filter
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#020308]">
      {/* HEADER */}
      <div className="container mx-auto max-w-6xl mb-16 text-center">
        <span className="text-[var(--color-gold)] font-bold tracking-[0.3em] text-xs uppercase block mb-4">
          Research & Insights
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
          Blog
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Explore our repository of background guides, research papers, and
          diplomatic insights curated by the Statecraft MUN Society Secretariat.
        </p>
      </div>

      {/* FILTERS */}
      <div className="container mx-auto max-w-6xl mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={clsx(
                "px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300",
                filter === c
                  ? "bg-[var(--color-gold)] text-black border-[var(--color-gold)]"
                  : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPubs.map((pub, i) => (
            <motion.div
              key={pub.id}
              layout
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="group perspective-1000"
            >
              <div className="relative h-full bg-[#0A0B10] border border-white/5 rounded-xl overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:-translate-y-2 hover:rotate-x-2 preserve-3d">
                {/* Card Accent Top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50" />

                <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-lg bg-white/5 text-[var(--color-gold)]">
                      {pub.type === "Background Guide" ? (
                        <BookOpen size={24} />
                      ) : (
                        <FileText size={24} />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {pub.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                    <Link
                      href={`/publications/${pub.id}`}
                      className="hover:underline decoration-[var(--color-gold)]/50 underline-offset-4"
                    >
                      {pub.title}
                    </Link>
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {pub.excerpt}
                  </p>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                      {pub.type}
                    </span>
                    <Link
                      href={`/publications/${pub.id}`}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[var(--color-gold)] group-hover:text-black group-hover:border-[var(--color-gold)] transition-all"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
