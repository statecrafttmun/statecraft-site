"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
    { id: 1, category: "HVDS", src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1974&auto=format&fit=crop", size: "large" },
    { id: 2, category: "YLFP", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop", size: "small" },
    { id: 3, category: "Diplomessy", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop", size: "tall" },
    { id: 4, category: "Orientations", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop", size: "small" },
    { id: 5, category: "HVDS", src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop", size: "wide" },
    { id: 6, category: "Collaborations", src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop", size: "small" },
];

const categories = ["All", "HVDS", "YLFP", "Diplomessy", "Orientations", "Collaborations"];

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const filteredImages = selectedCategory === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    return (
        <div className="min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? "bg-primary text-white"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                    {filteredImages.map((img, index) => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group ${img.size === "large" ? "md:col-span-2 md:row-span-2" :
                                    img.size === "tall" ? "md:row-span-2" :
                                        img.size === "wide" ? "md:col-span-2" : ""
                                }`}
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${img.src})` }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-semibold tracking-wider uppercase text-sm border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                                    View
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Gallery Preview"
                        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
}
