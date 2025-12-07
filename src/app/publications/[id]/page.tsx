import { getPublicationById } from "@/actions";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const pub = await getPublicationById(id);

    if (!pub) {
        return {
            title: "Publication Not Found",
        };
    }

    return {
        title: pub.title,
        description: pub.excerpt,
        openGraph: {
            title: pub.title,
            description: pub.excerpt,
            type: "article",
            images: pub.image ? [{ url: pub.image }] : [],
        },
        keywords: pub.tags,
    };
}

export default async function PublicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pub = await getPublicationById(id);

    if (!pub) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-6">
                <Link href="/publications" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Publications
                </Link>

                <article className="max-w-3xl mx-auto">
                    <header className="mb-12 text-center">
                        <div className="flex justify-center gap-2 mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/20">
                                {pub.type}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{pub.title}</h1>

                        <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
                            <div className="flex items-center gap-2">
                                <User size={18} />
                                <span>{pub.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{pub.date}</span>
                            </div>
                        </div>
                    </header>

                    {pub.image ? (
                        <div className="aspect-[21/9] rounded-2xl bg-gray-800 mb-12 overflow-hidden relative">
                            <img src={pub.image} alt={pub.title} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="aspect-[21/9] rounded-2xl bg-gray-800 mb-12 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-gray-300 mb-8 font-medium">
                            {pub.excerpt}
                        </p>

                        {/* Placeholder Content */}
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <h3>Key Takeaways</h3>
                        <ul>
                            <li>Diplomacy is evolving in the digital age.</li>
                            <li>International cooperation is more critical than ever.</li>
                            <li>Youth leadership plays a pivotal role.</li>
                        </ul>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag size={18} className="text-primary" />
                            <span className="font-semibold">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {pub.tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
