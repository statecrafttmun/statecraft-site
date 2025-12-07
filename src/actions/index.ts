"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- Events ---
export async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'desc' }
        });
        return events;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export async function getEventById(id: string) {
    try {
        return await prisma.event.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}

export async function saveEvent(event: any) {
    try {
        if (event.id) {
            await prisma.event.update({
                where: { id: event.id },
                data: {
                    title: event.title,
                    date: event.date,
                    location: event.location,
                    desc: event.desc,
                    status: event.status,
                    registrationLink: event.registrationLink,
                    fee: event.fee,
                    isFeatured: event.isFeatured,
                }
            });
        } else {
            await prisma.event.create({
                data: {
                    title: event.title,
                    date: event.date,
                    location: event.location,
                    desc: event.desc,
                    status: event.status,
                    registrationLink: event.registrationLink,
                    fee: event.fee,
                    isFeatured: event.isFeatured,
                }
            });
        }
        revalidatePath("/events");
        revalidatePath("/admin/events");
        return { success: true };
    } catch (error) {
        console.error("Error saving event:", error);
        return { success: false, error };
    }
}

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({ where: { id } });
        revalidatePath("/events");
        revalidatePath("/admin/events");
        return { success: true };
    } catch (error) {
        console.error("Error deleting event:", error);
        return { success: false, error };
    }
}

// --- Publications ---
export async function getPublications() {
    try {
        const publications = await prisma.publication.findMany({
            orderBy: { date: 'desc' }
        });
        return publications;
    } catch (error) {
        console.error("Error fetching publications:", error);
        return [];
    }
}

export async function getPublicationById(id: string) {
    try {
        const pub = await prisma.publication.findUnique({
            where: { id }
        });
        return pub;
    } catch (error) {
        console.error("Error fetching publication:", error);
        return null;
    }
}

export async function savePublication(pub: any) {
    try {
        const data = {
            title: pub.title,
            excerpt: pub.excerpt,
            author: pub.author,
            date: pub.date,
            tags: pub.tags, // Array is natively supported by Postgres
            type: pub.type,
            image: pub.image,
        };

        if (pub.id) {
            await prisma.publication.update({
                where: { id: String(pub.id) },
                data
            });
        } else {
            await prisma.publication.create({
                data
            });
        }
        revalidatePath("/publications");
        revalidatePath("/admin/publications");
        return { success: true };
    } catch (error) {
        console.error("Error saving publication:", error);
        return { success: false, error };
    }
}

export async function deletePublication(id: string | number) {
    try {
        await prisma.publication.delete({ where: { id: String(id) } });
        revalidatePath("/publications");
        revalidatePath("/admin/publications");
        return { success: true };
    } catch (error) {
        console.error("Error deleting publication:", error);
        return { success: false, error };
    }
}

// --- Gallery ---
export async function getGallery() {
    try {
        return await prisma.galleryImage.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
}

export async function saveGalleryImage(img: any) {
    try {
        await prisma.galleryImage.create({
            data: {
                src: img.src,
                category: img.category,
                size: img.size,
            }
        });
        revalidatePath("/gallery");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Error saving gallery image:", error);
        return { success: false, error };
    }
}

export async function deleteGalleryImage(id: string) {
    try {
        await prisma.galleryImage.delete({ where: { id } });
        revalidatePath("/gallery");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Error deleting gallery image:", error);
        return { success: false, error };
    }
}

// --- Team ---
export async function getTeam() {
    try {
        return await prisma.teamMember.findMany({
            orderBy: { createdAt: 'asc' } // Or add an 'order' field later
        });
    } catch (error) {
        console.error("Error fetching team:", error);
        return [];
    }
}

export async function saveTeamMember(member: any) {
    try {
        await prisma.teamMember.create({
            data: {
                name: member.name,
                role: member.role,
                image: member.image,
                quote: member.quote, // Handle quote
            }
        });
        revalidatePath("/about");
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Error saving team member:", error);
        return { success: false, error };
    }
}

export async function deleteTeamMember(id: string) {
    try {
        await prisma.teamMember.delete({ where: { id } });
        revalidatePath("/about");
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Error deleting team member:", error);
        return { success: false, error };
    }
}

// --- Settings ---
export async function getSettings() {
    try {
        const settings = await prisma.setting.findMany();
        // Convert array of {key, value} to object
        return settings.reduce((acc: any, curr) => {
            acc[curr.key] = curr.value === 'true' ? true : curr.value === 'false' ? false : curr.value;
            return acc;
        }, {});
    } catch (error) {
        console.error("Error fetching settings:", error);
        return {};
    }
}

export async function saveSettings(settings: any) {
    try {
        for (const [key, value] of Object.entries(settings)) {
            await prisma.setting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            });
        }
        revalidatePath("/");
        revalidatePath("/admin/settings");
        return { success: true };
    } catch (error) {
        console.error("Error saving settings:", error);
        return { success: false, error };
    }
}

// --- Categories ---
export async function getCategories() {
    try {
        const categories = await prisma.category.findMany();
        return categories.map(c => c.name);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function saveCategory(category: string) {
    try {
        await prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category }
        });
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Error saving category:", error);
        return { success: false, error };
    }
}

export async function deleteCategory(category: string) {
    try {
        await prisma.category.delete({ where: { name: category } });
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, error };
    }
}
