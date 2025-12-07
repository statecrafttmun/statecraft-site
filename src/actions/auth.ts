"use server";

import { cookies } from "next/headers";

export async function login(username: string, password: string) {
    const adminUser = process.env.ADMIN_USER || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    if (username === adminUser && password === adminPass) {
        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        return { success: true };
    }

    return { success: false };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return { success: true };
}
