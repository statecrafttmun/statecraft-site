"use client";

import { useState, useEffect } from "react";
import { getSettings, saveSettings } from "@/actions";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<any>({ showJoinUs: true });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        const data = await getSettings();
        setSettings(data);
    }

    async function handleSave() {
        setLoading(true);
        await saveSettings(settings);
        setLoading(false);
        alert("Settings saved successfully!");
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="max-w-xl space-y-8">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4">General Settings</h3>

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="font-medium">Show "Join Us" Button</p>
                            <p className="text-sm text-gray-400">Toggle visibility of the recruitment button in the navbar.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.showJoinUs}
                                onChange={(e) => setSettings({ ...settings, showJoinUs: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Join Us Form Link</label>
                        <input
                            type="url"
                            value={settings.joinUsLink || ""}
                            onChange={(e) => setSettings({ ...settings, joinUsLink: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                            placeholder="https://forms.google.com/..."
                        />
                        <p className="text-xs text-gray-500 mt-1">Direct link to the recruitment form.</p>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}
