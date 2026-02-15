import { MetadataRoute } from "next";
import { getStaticEvents, getStaticPublications } from "@/actions";
import type { Event, Publication } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://statecrafthansraj.info";

  let events: Event[] = [];
  let blog: Publication[] = [];

  try {
    events = await getStaticEvents();
    blog = await getStaticPublications();
  } catch (error) {
    console.error("Failed to fetch data for sitemap:", error);
    // Continue with empty data to prevent build failure
  }

  const eventUrls = events.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: new Date(),
    // changeFrequency: "weekly" as const, // Removed to avoid type issues with fallback
    priority: 0.7,
  }));

  const blogUrls = blog.map((pub) => ({
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

  return [...staticUrls, ...eventUrls, ...blogUrls];
}
