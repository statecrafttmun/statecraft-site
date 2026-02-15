import { getEventById } from "@/actions";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  ChevronDown,
  Download,
  Users,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }
  return {
    title: event.title,
    description: event.desc,
    openGraph: {
      title: event.title,
      description: event.desc,
      type: "article",
      url: `https://statecrafthansraj.info/events/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.desc,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-40 md:pb-20 bg-[#020308]">
      {/* HERO */}
      <section className="relative h-[60vh] flex flex-col justify-end p-6 border-b border-white/10 overflow-hidden">
        {/* Stylized Map Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center filter invert" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020308] via-[#020308]/60 to-transparent" />

        <div className="container mx-auto relative z-10 max-w-5xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-gold)] mb-6 transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </Link>

          <div className="flex flex-col gap-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] text-xs font-bold w-fit border border-[var(--color-gold)]/30">
              {event.status}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 text-gray-300 mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-[var(--color-gold)]" size={18} />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-[var(--color-gold)]" size={18} />
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
              Overview <div className="h-[1px] flex-grow bg-white/10" />
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {event.desc ||
                "Experience diplomacy at its finest. Join delegates from across the nation to debate, deliberate, and decide on global issues."}
            </p>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-[var(--color-gold)]/30 sticky top-24">
            <h3 className="text-xl font-bold font-serif mb-4 text-white">
              Registration
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-base">
                <span className="text-gray-400">Fee</span>
                <span className="text-white font-bold">
                  {event.fee || "TBA"}
                </span>
              </div>
            </div>
            {event.status === "Open" ? (
              <a
                href={event.registrationLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full py-3 bg-[var(--color-gold)] text-black font-bold justify-center rounded-lg hover:bg-white transition-colors"
              >
                Register Now
              </a>
            ) : (
              <button
                disabled
                className="flex w-full py-3 bg-gray-700 text-gray-400 font-bold justify-center rounded-lg cursor-not-allowed"
              >
                Applications Closed
              </button>
            )}
            <p className="text-xs text-center text-gray-500 mt-3">
              Limited seats available.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <h4 className="font-bold text-white mb-2">Need Help?</h4>
            <p className="text-sm text-gray-400 mb-4">
              Contact the Secretariat for queries regarding allotments or
              procedure.
            </p>
            <a
              href="mailto:contact@statecrafthansraj.info"
              className="text-[var(--color-gold)] text-sm font-bold hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* Floating Mobile Action Bar (kept ABOVE the bottom nav to avoid collisions) */}
      <div className="md:hidden fixed left-0 right-0 bottom-[calc(env(safe-area-inset-bottom)+76px)] p-4 bg-[#020308]/90 backdrop-blur-xl border-t border-white/10 z-30 flex gap-4">
        <a
          href="mailto:contact@statecrafthansraj.info"
          className="flex-1 py-3 rounded-lg border border-white/20 text-white font-bold text-sm text-center"
        >
          Contact
        </a>
        {event.status === "Open" ? (
          <a
            href={event.registrationLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-lg bg-[var(--color-gold)] text-black font-bold text-sm text-center shadow-[0_0_15px_rgba(0,91,187,0.3)]"
          >
            Register
          </a>
        ) : (
          <button
            disabled
            className="flex-1 py-3 rounded-lg bg-gray-700 text-gray-400 font-bold text-sm cursor-not-allowed"
          >
            Closed
          </button>
        )}
      </div>
    </div>
  );
}
