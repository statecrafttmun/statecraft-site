"use client";

import { useState, useEffect } from "react";
import { getTimeline, saveTimelineItem, deleteTimelineItem } from "@/actions";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";

interface TimelineItem {
  id?: string;
  year: string;
  title: string;
  desc: string;
  order: number;
}

export default function AdminTimelinePage() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<TimelineItem>({
    year: "",
    title: "",
    desc: "",
    order: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTimeline();
  }, []);

  async function loadTimeline() {
    const data = await getTimeline();
    setTimeline(data);
  }

  function openModal(item?: TimelineItem) {
    if (item) {
      setCurrentItem(item);
    } else {
      setCurrentItem({ year: "", title: "", desc: "", order: timeline.length });
    }
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setCurrentItem({ year: "", title: "", desc: "", order: 0 });
  }

  async function handleSave() {
    setLoading(true);
    const result = await saveTimelineItem(currentItem);
    if (result.success) {
      await loadTimeline();
      closeModal();
    } else {
      console.error("Failed to save timeline item:", result.error);
      alert(
        "Failed to save timeline item. Please check the database connection and ensure the Timeline table exists."
      );
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this timeline item?")) {
      const result = await deleteTimelineItem(id);
      if (result.success) {
        await loadTimeline();
      } else {
        console.error("Failed to delete timeline item:", result.error);
        alert("Failed to delete timeline item.");
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Timeline</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 rounded-lg bg-[var(--color-gold)] text-black font-bold hover:bg-white transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="space-y-4">
        {timeline.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No timeline items yet. Add your first milestone!
          </div>
        ) : (
          timeline.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-white/5 border border-white/10 flex justify-between items-start hover:border-[var(--color-gold)]/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[var(--color-gold)] font-mono text-lg font-bold">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400">{item.desc}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openModal(item)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id!)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0B10] rounded-2xl p-8 w-full max-w-lg border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {currentItem.id ? "Edit" : "Add"} Timeline Item
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={currentItem.year}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, year: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-gold)]"
                  placeholder="e.g., 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={currentItem.title}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, title: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-gold)]"
                  placeholder="e.g., Major Milestone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  value={currentItem.desc}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, desc: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-gold)] resize-none"
                  placeholder="Describe this milestone..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  value={currentItem.order}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-gold)]"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher numbers appear first
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading || !currentItem.year || !currentItem.title}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--color-gold)] text-black font-bold hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
