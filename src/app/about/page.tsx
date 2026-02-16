"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Award, Scale, Globe } from "lucide-react";
import { getTeam, getTimeline } from "@/actions";

// Local type for team/timeline that can be either from database or mock data
interface TeamMemberDisplay {
  id?: string | number;
  name: string;
  role: string;
  image: string;
  imageFocusX?: number | null;
  imageFocusY?: number | null;
  bio?: string;
  quote?: string | null;
  isSenior?: boolean | null;
}

interface TimelineDisplay {
  id?: string;
  year: string;
  title: string;
  desc: string;
  order?: number;
}

// 3D Flip Card Component
const TeamCard = ({ member }: { member: TeamMemberDisplay }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full aspect-[4/5] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden glass-panel border border-white/10 group hover:border-[var(--color-gold)]/50 transition-colors flex flex-col">
          {/* Image frame: keeps faces from stretching/cropping weirdly */}
          <div className="relative w-full aspect-square bg-gray-800">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: `${member.imageFocusX ?? 50}% ${member.imageFocusY ?? 20}%`,
                }}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/5">
                <User size={64} className="text-gray-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent to-transparent opacity-80" />
          </div>

          <div className="relative flex-1 p-6 flex flex-col justify-end">
            <h3 className="text-xl font-bold text-white mb-1 font-serif">
              {member.name}
            </h3>
            <p className="text-[var(--color-gold)] text-sm tracking-widest uppercase font-medium">
              {member.role}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="w-4 h-[1px] bg-gray-600" />
              Tap to view bio
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-[var(--color-gold)] text-black p-8 rotate-y-180 flex flex-col justify-center text-center shadow-[0_0_30px_rgba(0,91,187,0.2)]">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center">
              <User size={32} className="text-black/60" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2 font-serif">{member.name}</h3>
          <p className="text-xs tracking-widest uppercase opacity-60 mb-6">
            {member.role}
          </p>
          <p className="text-sm font-medium leading-relaxed opacity-80 italic">
            &ldquo;
            {member.quote ||
              member.bio ||
              "A dedicated member of the Secretariat."}
            &rdquo;
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMemberDisplay[]>([]);
  const [timeline, setTimeline] = useState<TimelineDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const seniorTeam = team.filter((m) => !!m.isSenior);
  const coreTeam = team.filter((m) => !m.isSenior);

  useEffect(() => {
    // Fetch team and timeline data from database
    Promise.all([
      getTeam().then((data) => {
        if (data) setTeam(data);
      }),
      getTimeline().then((data) => {
        if (data) setTimeline(data);
      }),
    ]).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen pb-20 pt-20">
      {/* HERO SECTION */}
      <section className="relative py-20 px-6 border-b border-white/5 bg-gradient-to-b from-[#020308] to-[#050509]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-1/3 flex justify-center md:justify-start"
            >
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-[var(--color-gold)] rounded-full blur-[100px] opacity-10" />
                <img
                  src="/logo-crest.jpg"
                  alt="Crest"
                  className="relative w-full h-full object-contain drop-shadow-2xl opacity-90"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-2/3 space-y-6 text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)]">
                  Statecraft MUN Society
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                Founded on the principles of debate and diplomacy, the
                Statecraft MUN Society stands as a beacon of excellence in the
                Delhi University circuit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR STORY TIMELINE */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-[var(--color-gold)] tracking-[0.2em] text-xs font-bold uppercase">
              Heritage
            </span>
            <h2 className="text-4xl font-serif font-bold mt-2">Our Story</h2>
          </div>

          <div className="relative space-y-16">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[2px] bg-[var(--color-gold)]/50 -translate-x-1/2 z-0" />

            {isLoading ? (
              <div className="text-center py-12 text-gray-500">
                Loading timeline...
              </div>
            ) : timeline.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No timeline items found.
              </div>
            ) : (
              timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative pl-12 md:pl-0"
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-0 w-3 h-3 rounded-full bg-[var(--color-gold)] shadow-[0_0_10px_var(--color-gold)] -translate-x-1/2" />

                  <div
                    className={`md:flex ${
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    } items-center justify-between w-full`}
                  >
                    <div className="md:w-[45%] mb-2 md:mb-0">
                      <div
                        className={`glass-panel p-6 rounded-xl border border-white/5 hover:border-[var(--color-gold)]/30 transition-colors ${
                          i % 2 === 0 ? "md:text-left" : "md:text-right"
                        }`}
                      >
                        <span className="text-[var(--color-gold)] font-mono text-xl font-bold block mb-2">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-[45%]" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* OUR VALUES PILLARS */}
      <section className="py-24 bg-[#0A0B10] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold">Our Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Diplomacy",
                icon: Globe,
                desc: "Fostering dialogue and understanding across borders.",
              },
              {
                title: "Statesmanship",
                icon: Scale,
                desc: "Building leaders with integrity and vision.",
              },
              {
                title: "Honor",
                icon: Award,
                desc: "Commitment to truth and ethical conduct.",
              },
            ].map((val, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/10 transition-all duration-500 relative">
                  <val.icon
                    size={32}
                    className="text-gray-400 group-hover:text-[var(--color-gold)] transition-colors"
                  />
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-serif">
                  {val.title}
                </h3>
                <p className="text-gray-400 max-w-xs">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[var(--color-gold)] tracking-[0.2em] text-xs font-bold uppercase">
              The Secretariat
            </span>
            <h2 className="text-4xl font-serif font-bold mt-2">
              Meet the Team
            </h2>
          </div>

          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-gray-400 tracking-[0.2em] text-[10px] font-bold uppercase">
                Core Team
              </span>
              <h3 className="text-3xl font-serif font-bold mt-2">
                Core Secretariat
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreTeam.map((member, i) => (
                <TeamCard key={`core-${i}`} member={member} />
              ))}
            </div>
          </div>

          {seniorTeam.length > 0 && (
            <div>
              <div className="text-center mb-10">
                <span className="text-gray-400 tracking-[0.2em] text-[10px] font-bold uppercase">
                  Senior Team
                </span>
                <h3 className="text-3xl font-serif font-bold mt-2">
                  Senior Secretariat
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {seniorTeam.map((member, i) => (
                  <TeamCard key={`senior-${i}`} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
