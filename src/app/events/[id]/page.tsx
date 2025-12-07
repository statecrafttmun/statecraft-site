import { getEventById } from "@/actions";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
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
        },
    };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await getEventById(id);

    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-6">
                <Link href="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Events
                </Link>

                <div className="max-w-4xl mx-auto">
                    <div className="aspect-video rounded-2xl bg-gray-800 mb-8 overflow-hidden relative">
                        {/* Placeholder Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block ${event.status === 'Open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
                                }`}>
                                {event.status}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 mb-12">
                        <div className="flex items-center gap-3 text-gray-300">
                            <Calendar className="text-primary" size={24} />
                            <span className="text-lg">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <MapPin className="text-primary" size={24} />
                            <span className="text-lg">{event.location}</span>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-4 text-primary">About the Event</h2>
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                            {event.desc}
                        </p>

                        {/* Placeholder for more content */}
                        <p className="text-gray-300 text-lg leading-relaxed mt-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {event.status === 'Open' && event.registrationLink && (
                        <div className="mt-12 p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                            <h3 className="text-2xl font-bold mb-4">Ready to Participate?</h3>
                            <a
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 inline-block"
                            >
                                Register Now
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
