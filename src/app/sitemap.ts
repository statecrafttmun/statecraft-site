import { MetadataRoute } from "next";
import { getEvents, getPublications } from "@/actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://statecrafthansraj.info";

    let events = [];
    let publications = [];

    try {
        events = await getEvents();
        publications = await getPublications();
    } catch (error) {
        console.error("Failed to fetch data for sitemap:", error);
        // Continue with empty data to prevent build failure
    }

    const eventUrls = events.map((event: any) => ({
        url: `${baseUrl}/events/${event.id}`,
        lastModified: new Date(),
        // changeFrequency: "weekly" as const, // Removed to avoid type issues with fallback
        priority: 0.7,
    }));

    const publicationUrls = publications.map((pub: any) => ({
        url: `${baseUrl}/publications/${pub.id}`,
        lastModified: new Date(pub.date),
        priority: 0.8,
    }));

    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/publications`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            priority: 0.5,
        },
    ];

    return [...staticUrls, ...eventUrls, ...publicationUrls];
}
