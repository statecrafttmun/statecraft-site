"use server";

import { revalidatePath } from "next/cache";
import { createClient, createStaticClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

// Helper to get supabase instance
async function getSupabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

// --- Static (No Cookies) ---
export async function getStaticEvents() {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("Event")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching static events:", error);
    return [];
  }
}

export async function getStaticPublications() {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("Publication")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching static publications:", error);
    return [];
  }
}

// --- Events ---
export async function getEvents() {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("Event")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getEventById(id: string) {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("Event")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export async function saveEvent(event: any) {
  try {
    const supabase = await getSupabase();
    const eventData = {
      title: event.title,
      date: event.date,
      location: event.location,
      desc: event.desc,
      status: event.status,
      registrationLink: event.registrationLink,
      fee: event.fee,
      isFeatured: event.isFeatured,
      updatedAt: new Date().toISOString(),
    };

    let result;
    if (event.id) {
      const { error } = await supabase
        .from("Event")
        .update(eventData)
        .eq("id", event.id);
      if (error) throw error;
      result = { success: true };
    } else {
      const { error } = await supabase
        .from("Event")
        .insert({
          id: randomUUID(),
          ...eventData,
          createdAt: new Date().toISOString(),
        });
      if (error) throw error;
      result = { success: true };
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
    const supabase = await getSupabase();
    const { error } = await supabase.from("Event").delete().eq("id", id);

    if (error) throw error;

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
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("Publication")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching publications:", error);
    return [];
  }
}

export async function getPublicationById(id: string) {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("Publication")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching publication:", error);
    return null;
  }
}

export async function savePublication(pub: any) {
  try {
    const supabase = await getSupabase();
    const data = {
      title: pub.title,
      excerpt: pub.excerpt,
      author: pub.author,
      date: pub.date,
      tags: pub.tags,
      type: pub.type,
      image: pub.image,
      updatedAt: new Date().toISOString(),
    };

    if (pub.id) {
      const { error } = await supabase
        .from("Publication")
        .update(data)
        .eq("id", String(pub.id));
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("Publication")
        .insert({
          id: randomUUID(),
          ...data,
          createdAt: new Date().toISOString(),
        });
      if (error) throw error;
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
    const supabase = await getSupabase();
    const { error } = await supabase
      .from("Publication")
      .delete()
      .eq("id", String(id));

    if (error) throw error;

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
    const supabase = await getSupabase();
    // GalleryImage table
    const { data, error } = await supabase
      .from("GalleryImage")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

export async function saveGalleryImage(img: any) {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase.from("GalleryImage").insert({
      id: randomUUID(),
      src: img.src,
      category: img.category,
      size: img.size,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (error) throw error;
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
    const supabase = await getSupabase();
    const { error } = await supabase.from("GalleryImage").delete().eq("id", id);

    if (error) throw error;

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
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("TeamMember")
      .select("*")
      .order("createdAt", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching team:", error);
    return [];
  }
}

export async function saveTeamMember(member: any) {
  try {
    const supabase = await getSupabase();
    const memberData = {
      name: member.name,
      role: member.role,
      image: member.image,
      quote: member.quote,
      updatedAt: new Date().toISOString(),
    };

    if (member.id) {
      // Update existing member
      const { error } = await supabase
        .from("TeamMember")
        .update(memberData)
        .eq("id", member.id);
      if (error) throw error;
    } else {
      // Insert new member
      const { error } = await supabase.from("TeamMember").insert({
        id: randomUUID(),
        ...memberData,
        createdAt: new Date().toISOString(),
      });
      if (error) throw error;
    }

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
    const supabase = await getSupabase();
    const { error } = await supabase.from("TeamMember").delete().eq("id", id);

    if (error) throw error;

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
    const supabase = await getSupabase();
    const { data, error } = await supabase.from("Setting").select("*");

    if (error) throw error;

    const settings = data || [];
    return settings.reduce((acc: any, curr: any) => {
      acc[curr.key] =
        curr.value === "true"
          ? true
          : curr.value === "false"
          ? false
          : curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

export async function saveSettings(settings: any) {
  try {
    const supabase = await getSupabase();
    for (const [key, value] of Object.entries(settings)) {
      // upsert
      const { error } = await supabase.from("Setting").upsert(
        {
          key,
          value: String(value),
          updatedAt: new Date().toISOString(),
          // createdAt handled by DB default usually, but upsert might need it on insert?
          // Assuming DB defaults or existing row
        },
        { onConflict: "key" }
      ); // or implicit via PK

      if (error) throw error;
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
    const supabase = await getSupabase();
    const { data, error } = await supabase.from("Category").select("*");

    if (error) throw error;
    return (data || []).map((c: any) => c.name);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function saveCategory(category: string) {
  try {
    const supabase = await getSupabase();
    // Upsert based on name? Schema said name is unique.
    // Prisma: upsert where name.
    // Supabase: upsert on UNIQUE constraint 'Category_name_key' or just 'name'
    const { error } = await supabase.from("Category").upsert(
      {
        id: randomUUID(),
        name: category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { onConflict: "name" }
    );

    if (error) throw error;

    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    console.error("Error saving category:", error);
    return { success: false, error };
  }
}

export async function deleteCategory(category: string) {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase
      .from("Category")
      .delete()
      .eq("name", category);

    if (error) throw error;

    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error };
  }
}
