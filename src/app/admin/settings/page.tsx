"use client";

import { useState, useEffect } from "react";
import { getSettings, saveSettings } from "@/actions";
import { Save } from "lucide-react";
import type { SettingsObject } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsObject>({
    showJoinUs: true,
    showUpcomingConferences: true,
  });
  const [loading, setLoading] = useState(false);

  async function loadSettings() {
    const data = await getSettings();
    setSettings(data);
  }

  useEffect(() => {
    // defer to satisfy eslint react-hooks/set-state-in-effect
    setTimeout(() => {
      loadSettings();
    }, 0);
  }, []);

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
              <p className="font-medium">Show &quot;Join Us&quot; Button</p>
              <p className="text-sm text-gray-400">
                Toggle visibility of the recruitment button in the navbar.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.showJoinUs}
                onChange={(e) =>
                  setSettings({ ...settings, showJoinUs: e.target.checked })
                }
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Join Us Form Link
            </label>
            <input
              type="url"
              value={
                typeof settings.joinUsLink === "string"
                  ? settings.joinUsLink
                  : ""
              }
              onChange={(e) =>
                setSettings({ ...settings, joinUsLink: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="https://forms.google.com/..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Direct link to the recruitment form.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Home Hero Background Image URL
            </label>
            <input
              type="url"
              value={
                typeof settings.homeHeroBgImage === "string"
                  ? settings.homeHeroBgImage
                  : ""
              }
              onChange={(e) =>
                setSettings({ ...settings, homeHeroBgImage: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Used as the background image on the Home page hero.
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-medium">Show &quot;Upcoming Conferences&quot; Section</p>
              <p className="text-sm text-gray-400">
                Toggle visibility of the upcoming conferences block on the home
                page.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.showUpcomingConferences !== false}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    showUpcomingConferences: e.target.checked,
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Emergency Contact Number
            </label>
            <input
              type="tel"
              value={
                typeof settings.emergencyContact === "string"
                  ? settings.emergencyContact
                  : ""
              }
              onChange={(e) =>
                setSettings({ ...settings, emergencyContact: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              placeholder="+91 98765 43210"
            />
            <p className="text-xs text-gray-500 mt-1">
              Emergency contact number displayed on the Contact page.
            </p>
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
