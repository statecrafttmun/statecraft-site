"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, FileText, Image, Users, Settings, LogOut, Menu, X } from "lucide-react";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-black">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center px-4 md:hidden z-40">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-gray-400 hover:text-white"
                >
                    <Menu size={24} />
                </button>
                <span className="ml-4 text-lg font-bold">Admin Panel</span>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-[#050509] flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:flex",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <span className="text-primary">MUN</span>Admin
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {adminLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsSidebarOpen(false)}
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
            <main className="flex-grow p-4 md:p-8 overflow-y-auto h-screen pt-20 md:pt-8 w-full">
                {children}
            </main>
        </div>
    );
}
