"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, FileText, Image, Users, Settings, LogOut } from "lucide-react";
import clsx from "clsx";

const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Publications", href: "/admin/publications", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex bg-black">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-white/5 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <span className="text-primary">MUN</span>Admin
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {adminLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    isActive
                                        ? "bg-primary text-white font-medium"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon size={20} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all">
                        <LogOut size={20} />
                        Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
