"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Flexible type for article display that works with both DB data and mock data
interface ArticleData {
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image?: string | null;
  type?: string;
  id?: string;
  tags?: string[];
}

export default function ArticleView({ pub }: { pub: ArticleData }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#020308] text-gray-200">
      {/* Progress Bar (Vertical for mobile? No, top horizontal is standard and requested vertical side bar) */}
      {/* User asked for "slim vertical progress bar on the side for mobile". Okay. */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-gold)] origin-left z-50 md:hidden"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 right-0 bottom-0 w-1 bg-[var(--color-gold)] origin-top z-50 hidden md:block"
        style={{ scaleY: scrollYProgress }}
      />

      {/* Header */}
      <div className="relative py-24 px-6 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--color-gold)] mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Publications
          </Link>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {pub.title}
          </h1>

          <div className="flex justify-center items-center gap-8 text-sm text-gray-400 font-mono">
            <span className="flex items-center gap-2">
              <User size={16} className="text-[var(--color-gold)]" />{" "}
              {pub.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-[var(--color-gold)]" />{" "}
              {pub.date}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 px-6">
        <div className="container mx-auto max-w-2xl">
          {pub.image && (
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-12 border border-white/10 shadow-2xl">
              <img
                src={pub.image}
                alt={pub.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Pull Quote */}
          <blockquote className="border-l-4 border-[var(--color-gold)] pl-6 py-2 my-12 italic text-2xl font-serif text-white bg-white/5 rounded-r-lg">
            &quot;{pub.excerpt}&quot;
          </blockquote>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            {/* Mock Body Content if not present */}
            <p>
              Diplomacy in the modern era is no longer confined to closed-door
              meetings in Geneva or New York. It has spilled over into the
              digital realm, where narratives are shaped, alliances are tested,
              and public opinion is mobilized in real-time.
            </p>
            <p>
              As we look towards the future of international relations, it
              becomes imperative for young leaders to understand not just the
              history of statecraft, but its evolving future. The role of
              non-state actors, the influence of big tech, and the
              democratization of information are rewriting the rules of
              engagement.
            </p>
            <h3 className="text-[var(--color-gold)] font-serif mt-8 mb-4">
              The Shift in Power
            </h3>
            <p>
              Traditional power structures are being challenged. The vertical
              hierarchy of nation-states is intersecting with the horizontal
              networks of global civil society. This intersection is where the
              most interesting—and volatile—diplomacy is happening today.
            </p>
            <p>
              At Statecraft MUN Society, we strive to simulate these complex
              dynamics. Our committees are not just about passing resolutions;
              they are about understanding the nuance of negotiation in a
              fractured world.
            </p>
          </div>

          {/* Share / Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <span className="text-sm text-gray-500">Share this article</span>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: pub.title,
                      text: pub.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="p-2 rounded-full bg-white/5 hover:bg-[var(--color-gold)] hover:text-black transition-colors"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
