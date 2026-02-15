"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { getEvents } from "@/actions";
import Link from "next/link";
import clsx from "clsx";
import type { Event } from "@/types";

// Local type for events display that includes optional type field for categorization
interface EventDisplay
  extends Omit<Event, "isFeatured" | "createdAt" | "updatedAt"> {
  type?: string;
  isFeatured?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventDisplay[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getEvents().then((data) => {
      // Mock data enrichment if needed for testing visuals
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        // Fallback mock
        setEvents([
          {
            id: "1",
            title: "Statecraft MUN Society 2026",
            date: "Feb 12-14, 2026",
            location: "Hansraj College",
            status: "Upcoming",
            type: "Flagship",
            desc: "The biggest conference of the year.",
          },
        ]);
      }
    });
  }, []);

  // Support deep-link from Home: /events#upcoming
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#upcoming") {
      // Defer state update to avoid setState directly in effect body (eslint rule)
      setTimeout(() => {
        setFilter("Upcoming");
        document.getElementById("upcoming")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filter === "All") return true;
    if (filter === "Upcoming") return e.status === "Upcoming" || e.status === "Open";
    return e.status === filter;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      {/* Header */}
      <div className="container mx-auto max-w-5xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <span className="text-[var(--color-gold)] font-bold tracking-widest text-xs uppercase block mb-2">
              Agenda
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white relative inline-block">
              Conferences & Events
              <span className="block h-1 w-full bg-[var(--color-gold)] mt-1 rounded-full" />
            </h1>
          </div>

          {/* Filters */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
            {["All", "Upcoming"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  filter === f
                    ? "bg-[var(--color-gold)] text-[#020308]"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl">
        <div id="upcoming" className="relative -top-24" aria-hidden="true" />
        <AnimatePresence mode="popLayout">
          <div className="flex flex-col gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/events/${event.id}`}
                  className="block group relative"
                >
                  <div className="absolute inset-0 bg-[var(--color-gold)] rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                  <div className="relative glass-panel p-6 md:p-8 rounded-2xl border border-white/10 group-hover:border-[var(--color-gold)]/50 transition-colors md:flex items-center gap-8 hover:-translate-y-1 duration-300">
                    {/* Date Box */}
                    <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors duration-300">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="text-2xl font-bold font-serif">
                        {event.date.split(" ")[1]?.replace(",", "") || "TBD"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {event.type === "Flagship" && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[var(--color-gold)] text-black">
                              Flagship
                            </span>
                          )}
                          <span
                            className={clsx(
                              "text-xs font-bold uppercase tracking-wider",
                              event.status === "Upcoming"
                                ? "text-green-400"
                                : "text-gray-500"
                            )}
                          >
                            {event.status}
                          </span>
                        </div>
                        <ArrowUpRight className="text-gray-500 group-hover:text-[var(--color-gold)] transition-colors" />
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[var(--color-gold)] transition-colors">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar
                            size={14}
                            className="text-[var(--color-gold)]"
                          />
                          <span className="md:hidden">{event.date}</span>
                          <span className="hidden md:inline">{event.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin
                            size={14}
                            className="text-[var(--color-gold)]"
                          />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No events found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
