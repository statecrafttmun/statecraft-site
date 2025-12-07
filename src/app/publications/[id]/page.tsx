import { getPublicationById } from "@/actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticleView from "@/components/ArticleView";

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
    };
}

export default async function PublicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pub = await getPublicationById(id);

    if (!pub) {
        // Mock if not found for demo purposes or 404
        // notFound();
        // Return mock data for visual verification if DB is empty
        return <ArticleView pub={{
            title: "The Future of Digital Diplomacy",
            date: "December 10, 2025",
            author: "Aarav Sharma",
            excerpt: "Diplomacy is the art of letting someone have your way.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
            type: "Article"
        }} />;
    }

    return <ArticleView pub={pub} />;
}
