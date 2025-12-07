"use client";

import { useState, useEffect } from "react";
import { getPublications, savePublication, deletePublication } from "@/actions";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";

export default function AdminPublicationsPage() {
    const [publications, setPublications] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPub, setCurrentPub] = useState<any>(null);

    useEffect(() => {
        loadPublications();
    }, []);

    async function loadPublications() {
        const data = await getPublications();
        setPublications(data);
    }

    function handleAddNew() {
        setCurrentPub({ title: "", excerpt: "", author: "", date: "", type: "Article", tags: [] });
        setIsEditing(true);
    }

    function handleEdit(pub: any) {
        setCurrentPub(pub);
        setIsEditing(true);
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this publication?")) {
            await deletePublication(id);
            loadPublications();
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await savePublication(currentPub);
        setIsEditing(false);
        loadPublications();
    }

    function handleTagsChange(e: React.ChangeEvent<HTMLInputElement>) {
        const tags = e.target.value.split(",").map(t => t.trim()).filter(t => t);
        setCurrentPub({ ...currentPub, tags });
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Publications</h1>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 rounded-lg bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors"
                >
                    <Plus size={18} /> Add Publication
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {publications.map((pub) => (
                    <div key={pub.id} className="p-6 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/20 text-primary">{pub.type}</span>
                                <h3 className="text-xl font-bold">{pub.title}</h3>
                            </div>
                            <p className="text-sm text-gray-400">By {pub.author} • {pub.date}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleEdit(pub)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(pub.id)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{currentPub.id ? "Edit Publication" : "Add Publication"}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentPub.title}
                                    onChange={(e) => setCurrentPub({ ...currentPub, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Author</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentPub.author}
                                        onChange={(e) => setCurrentPub({ ...currentPub, author: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={currentPub.date}
                                        onChange={(e) => setCurrentPub({ ...currentPub, date: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                                <select
                                    value={currentPub.type}
                                    onChange={(e) => setCurrentPub({ ...currentPub, type: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                >
                                    <option value="Article">Article</option>
                                    <option value="Report">Report</option>
                                    <option value="Opinion">Opinion</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={currentPub.tags.join(", ")}
                                    onChange={handleTagsChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    placeholder="Diplomacy, Tech, Policy"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Excerpt</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={currentPub.excerpt}
                                    onChange={(e) => setCurrentPub({ ...currentPub, excerpt: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL (Optional)</label>
                                <input
                                    type="url"
                                    value={currentPub.image || ""}
                                    onChange={(e) => setCurrentPub({ ...currentPub, image: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium flex items-center gap-2"
                                >
                                    <Save size={18} /> Save Publication
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
