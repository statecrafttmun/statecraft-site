"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight, ChevronDown } from "lucide-react";
import { getPublications } from "@/actions";
import Link from "next/link";
import clsx from "clsx";

const tags = ["All", "Diplomacy", "Report", "Policy", "International Relations", "Opinion"];

export default function PublicationsPage() {
    const [publications, setPublications] = useState<any[]>([]);
    const [selectedTag, setSelectedTag] = useState("All");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    useEffect(() => {
        getPublications().then(setPublications);
    }, []);

    const filteredPublications = publications
        .filter(pub => selectedTag === "All" || pub.tags.includes(selectedTag) || pub.type === selectedTag)
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    return (
        <div className="min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Publications</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Insights, reports, and opinions from our members and guest contributors.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                    selectedTag === tag
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <button
                            onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
                        >
                            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                            <ChevronDown size={16} className={clsx("transition-transform", sortOrder === "oldest" && "rotate-180")} />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredPublications.map((pub, index) => (
                            <motion.div
                                key={pub.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-primary/20 text-primary uppercase tracking-wider">
                                        {pub.type}
                                    </span>
                                    <span className="text-xs text-gray-500">{pub.date}</span>
                                </div>

                                {pub.image && (
                                    <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-800">
                                        <img src={pub.image} alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    <Link href={`/publications/${pub.id}`}>
                                        {pub.title}
                                    </Link>
                                </h3>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                    {pub.excerpt}
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-medium">By {pub.author}</span>
                                    <Link
                                        href={`/publications/${pub.id}`}
                                        className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        Read More <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
