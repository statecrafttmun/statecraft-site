import { MetadataRoute } from "next";
import { getEvents, getPublications } from "@/actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const events = await getEvents();
    const publications = await getPublications();

    const baseUrl = "https://example.com"; // Replace with actual domain

    const eventUrls = events.map((event: any) => ({
        url: `${baseUrl}/events/${event.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const publicationUrls = publications.map((pub: any) => ({
        url: `${baseUrl}/publications/${pub.id}`,
        lastModified: new Date(pub.date),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/events`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/publications`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.5,
        },
    ];

    return [...staticUrls, ...eventUrls, ...publicationUrls];
}
