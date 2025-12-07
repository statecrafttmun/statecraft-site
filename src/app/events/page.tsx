"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { getEvents } from "@/actions";
import Link from "next/link";

// Countdown Component
const Countdown = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex gap-4 md:gap-8 justify-center mt-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-2">
                        <span className="text-2xl md:text-4xl font-bold text-primary font-mono">
                            {value.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{unit}</span>
                </div>
            ))}
        </div>
    );
};

export default function EventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [featuredEvent, setFeaturedEvent] = useState<any>(null);

    useEffect(() => {
        getEvents().then((data) => {
            setEvents(data);
            // Find featured event or default to first open event or just first event
            const featured = data.find((e: any) => e.isFeatured) || data.find((e: any) => e.status === 'Open') || data[0];
            setFeaturedEvent(featured);
        });
    }, []);

    return (
        <div className="min-h-screen pb-20">
            {/* Hero / Upcoming Event */}
            <section className="relative py-24 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    {featuredEvent && (
                        <>
                            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/20">
                                Featured Event
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">{featuredEvent.title}</h1>
                            <p className="text-xl text-gray-400 mb-8">{featuredEvent.desc}</p>

                            <Countdown targetDate={`${featuredEvent.date}T00:00:00`} />

                            <div className="mt-12">
                                <Link
                                    href={`/events/${featuredEvent.id}`}
                                    className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 inline-block"
                                >
                                    View Details
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Events List */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12">All <span className="text-primary">Events</span></h2>

                    <div className="space-y-6">
                        {events.map((event, index) => (
                            <Link
                                href={`/events/${event.id}`}
                                key={event.id}
                                className="block group"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all flex flex-col md:flex-row gap-6 md:items-center"
                                >
                                    <div className="w-full md:w-48 h-32 rounded-xl bg-gray-800 shrink-0 overflow-hidden">
                                        {/* Placeholder Image */}
                                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800" />
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${event.status === 'Open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
                                                }`}>
                                                {event.status}
                                            </span>
                                            <span className="text-gray-500 text-sm flex items-center gap-1">
                                                <Calendar size={14} /> {event.date}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4 md:mb-0 line-clamp-2">{event.desc}</p>
                                    </div>

                                    <div className="shrink-0">
                                        <span
                                            className="w-full md:w-auto px-6 py-3 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                                        >
                                            Details <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
