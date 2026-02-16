"use client";

import { getEvents, getGallery, getSettings } from "@/actions";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Award,
  Scale,
  Calendar,
  Users,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Type definitions
interface ParticleStyle {
  width: string;
  height: string;
  left: string;
  top: string;
  duration: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  status: string;
  registrationLink?: string;
  fee?: string;
  isFeatured?: boolean;
}

interface GalleryImage {
  id: string;
  src: string;
  category?: string;
  size?: string;
}

interface Settings {
  showJoinUs?: boolean;
  joinUsLink?: string;
  showUpcomingConferences?: boolean;
  [key: string]: string | boolean | undefined;
}

// Simple Particle Background Component
const ParticleBackground = ({ bgUrl }: { bgUrl?: string }) => {
  const [circles, setCircles] = useState<ParticleStyle[]>([]);

  useEffect(() => {
    const generateCircles = () => {
      const generated = [...Array(20)].map(() => ({
        width: Math.random() * 3 + 1 + "px",
        height: Math.random() * 3 + 1 + "px",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        duration: Math.random() * 5 + 5,
      }));
      setCircles(generated);
    };
    // Use requestAnimationFrame to avoid synchronous setState in effect
    const frameId = requestAnimationFrame(generateCircles);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${bgUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      {/* Removed grey/noise overlays to keep the hero background image clearly visible */}
      {/* Small floating particles */}
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-10"
          style={{
            width: c.width,
            height: c.height,
            left: c.left,
            top: c.top,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const scrollRef = useRef(null);
  useScroll({ target: scrollRef });

  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    getEvents().then((events) => {
      // Find the featured event first, then fall back to upcoming/open, then first event
      const featured = events.find((e) => e.isFeatured);
      const upcoming =
        featured ||
        events.find((e) => e.status === "Upcoming" || e.status === "Open") ||
        events[0];
      setNextEvent(upcoming as Event | null);
    });
    getGallery().then((imgs) => setGallery(imgs as GalleryImage[]));
    getSettings().then((s) => setSettings(s as Settings));
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!nextEvent?.date) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(nextEvent.date);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, mins: 0, secs: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / (1000 * 60)) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    };

    // Use interval for all updates (including initial) to avoid setState in effect body
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    // Immediately invoke the first update using a 0ms timeout
    const initialTimer = setTimeout(() => {
      setCountdown(calculateTimeLeft());
    }, 0);

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, [nextEvent]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col min-h-screen bg-[#020308] text-white selection:bg-[var(--color-gold)] selection:text-black"
    >
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <ParticleBackground
          bgUrl={
            typeof settings.homeHeroBgImage === "string"
              ? settings.homeHeroBgImage
              : undefined
          }
        />

        {/* Animated Wireframe Globe (Simulated with rotating rings) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] border border-white/10 rounded-full absolute"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] border border-white/10 rounded-full absolute border-dashed"
          />
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="w-[700px] h-[700px] border border-[var(--color-gold)]/20 rounded-full absolute"
            style={{ transform: "rotateX(60deg)" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Logo with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-48 h-48 md:w-64 md:h-64 mb-4"
          >
            <div className="absolute inset-0 bg-[var(--color-gold)] rounded-full blur-[80px] opacity-20 animate-pulse" />
            <div className="relative w-full h-full rounded-2xl md:rounded-3xl border border-white/5 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Try to use the uploaded image if copied, else placeholder text */}
              {/* We copied it to /logo-crest.jpg */}
              <Image
                src="/logo-crest.jpg"
                alt="Statecraft MUN Society Crest"
                fill
                className="object-contain p-4 opacity-90 drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-white text-sm md:text-base tracking-[0.3em] uppercase font-medium">
              Diplomacia · Estadista · Honor
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Hansraj College
              <br />
              <span className="text-[#A3A3A3]">Model United Nations</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
          >
            <Link
              href="/events#upcoming"
              className="px-8 py-4 bg-[var(--color-gold)] text-[#020308] font-bold tracking-wide rounded-sm hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Join Next Conference
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 glass text-white font-medium tracking-wide rounded-sm hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
            >
              About
            </Link>
          </motion.div>
        </div>
      </section>

      {/* JOIN US SECTION - DYNAMIC */}
      {/* JOIN US SECTION - DYNAMIC */}
      {settings.showJoinUs && (
        <section className="py-24 relative overflow-hidden border-y border-[var(--color-gold)]/30 bg-[#020308]">
          {/* Solid background (removed gradient) */}
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'url("/noise.png")' }}
          />

          {/* Glowing Pulse Effect in Background */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-20"
          />

          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 mb-4 border border-[var(--color-gold)]/50 rounded-full text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase font-bold bg-[var(--color-gold)]/5">
                Recruitment Open
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">
                Join The Legacy
              </h2>
              <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto text-gray-300">
                The Secretariat awaits. Be part of something greater than
                yourself.
              </p>
              <a
                href={settings.joinUsLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-[var(--color-gold)] text-black font-bold text-lg tracking-widest uppercase hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,91,187,0.4)] hover:shadow-[0_0_40px_rgba(0,91,187,0.6)] animate-pulse"
              >
                Apply Now
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* NEXT EVENT HIGHLIGHT */}
      {settings.showUpcomingConferences !== false && (
        <section className="py-20 bg-[#020308] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050509]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
              {/* Removed gradient overlay for a flatter look */}
              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="max-w-xl space-y-6">
                  <span className="inline-block px-3 py-1 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs font-bold tracking-widest border border-[var(--color-gold)]/20 rounded-full">
                    UPCOMING CONFERENCE
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-none">
                    {nextEvent
                      ? nextEvent.title
                      : "Statecraft MUN Society 2026"}
                    {!nextEvent && (
                      <span className="text-gray-500"> Coming Soon</span>
                    )}
                  </h2>
                  <div className="flex flex-col gap-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={18}
                        className="text-[var(--color-gold)]"
                      />
                      <span>
                        {nextEvent ? nextEvent.date : "Dates to be announced"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-[var(--color-gold)]" />
                      <span>
                        {nextEvent
                          ? nextEvent.location
                          : "Hansraj College, Delhi University"}
                      </span>
                    </div>
                  </div>

                  {nextEvent && (
                    <Link
                      href={`/events/${nextEvent.id}`}
                      className="inline-block mt-4 px-6 py-3 bg-[var(--color-gold)] text-black font-bold rounded hover:bg-white transition-colors"
                    >
                      Register Now
                    </Link>
                  )}
                </div>

                {/* Countdown Timer - Dynamic */}
                <div className="flex gap-4 md:gap-8 text-center">
                  {[
                    {
                      val: String(countdown.days).padStart(2, "0"),
                      label: "Days",
                    },
                    {
                      val: String(countdown.hours).padStart(2, "0"),
                      label: "Hours",
                    },
                    {
                      val: String(countdown.mins).padStart(2, "0"),
                      label: "Mins",
                    },
                    {
                      val: String(countdown.secs).padStart(2, "0"),
                      label: "Secs",
                    },
                  ].map((t, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-3xl md:text-5xl font-mono font-bold text-white">
                        {t.val}
                      </span>
                      <span className="text-xs uppercase text-gray-500 tracking-wider mt-1">
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe size={200} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ABOUT TEASER */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-serif font-bold">
                A Legacy of{" "}
                <span className="text-[var(--color-gold)] italic">
                  Excellence
                </span>
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Established to foster the spirit of diplomacy, Statecraft MUN
                Society has been a pioneer in creating platforms for young
                leaders to debate, dissent, and discuss global issues.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    icon: Scale,
                    text: "Upholding the highest standards of diplomacy and debate.",
                  },
                  {
                    icon: Globe,
                    text: "Connecting delegates from prestigious institutions worldwide.",
                  },
                  {
                    icon: Award,
                    text: "Award-winning secretariat committed to academic rigor.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[var(--color-gold)]">
                      <item.icon size={20} />
                    </div>
                    <span className="text-gray-300 mt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative Grid/Image Area */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 glass-panel">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold-light)]/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src="/logo-crest.jpg"
                    alt="Background Crest"
                    fill
                    className="object-contain opacity-20 blur-sm"
                  />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass border-l-4 border-[var(--color-gold)]">
                <p className="font-serif italic text-lg text-white">
                  &ldquo;Diplomacy is the art of telling people to go to hell in
                  such a way that they ask for directions.&rdquo;
                </p>
                <p className="text-xs text-[var(--color-gold)] mt-2 uppercase tracking-widest">
                  — Winston Churchill
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAST HIGHLIGHTS CAROUSEL */}
      <section className="py-24 bg-[#020308] border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">
              Past Highlights
            </h2>
            <p className="text-gray-500">
              Moments from our previous conferences.
            </p>
          </div>
          <Link
            href="/gallery"
            className="text-[var(--color-gold)] text-sm font-bold tracking-wide flex items-center gap-2 hover:underline"
          >
            View Gallery <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 px-6 snap-x no-scrollbar">
          {gallery.length > 0
            ? gallery.map((item, index) => (
                <div
                  key={item.id || index}
                  className="snap-center shrink-0 w-[300px] md:w-[400px] aspect-[4/3] rounded-lg overflow-hidden relative group border border-white/10"
                >
                  {item.src ? (
                    // Using img tag for external URLs that may come from various hosts
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={item.category || "Highlight"}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs text-[var(--color-gold)] font-bold mb-1 block uppercase">
                      {item.category || "Conference"}
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      Statecraft MUN Society Highlights
                    </h4>
                  </div>
                </div>
              ))
            : // Fallback if no gallery data
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 w-[300px] md:w-[400px] aspect-[4/3] rounded-lg overflow-hidden relative group bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <span className="text-gray-600">No images available</span>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}
