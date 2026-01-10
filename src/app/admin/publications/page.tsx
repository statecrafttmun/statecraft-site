"use client";

import { useState, useEffect } from "react";
import {
  getPublications,
  savePublication,
  deletePublication,
  getPublicationCategories,
  savePublicationCategory,
  deletePublicationCategory,
} from "@/actions";
import { Plus, Edit, Trash2, X, Save, Settings } from "lucide-react";
import type { Publication, PublicationInput } from "@/types";

const emptyPub: PublicationInput = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  date: "",
  type: "Article",
  tags: [],
};

export default function AdminPublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPub, setCurrentPub] = useState<PublicationInput>(emptyPub);
  const [newCategory, setNewCategory] = useState("");
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    loadPublications();
    loadCategories();
  }, []);

  async function loadPublications() {
    const data = await getPublications();
    setPublications(data);
  }

  async function loadCategories() {
    const data = await getPublicationCategories();
    // getPublicationCategories already returns an array of strings (category names)
    if (data.length === 0) {
      setCategories(["Article", "Report", "Opinion"]);
    } else {
      setCategories(data);
    }
  }

  async function handleAddCategory() {
    if (newCategory.trim()) {
      await savePublicationCategory(newCategory.trim());
      await loadCategories();
      setNewCategory("");
    }
  }

  async function handleDeleteCategory(category: string) {
    if (
      confirm(`Are you sure you want to delete the category "${category}"?`)
    ) {
      await deletePublicationCategory(category);
      await loadCategories();
    }
  }

  function handleAddNew() {
    setCurrentPub({
      ...emptyPub,
      type: categories[0] || "Article",
    });
    setTagsInput("");
    setIsEditing(true);
  }

  function handleEdit(pub: Publication) {
    setCurrentPub(pub);
    setTagsInput(Array.isArray(pub.tags) ? pub.tags.join(", ") : "");
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
    // Parse tags from the input string
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    await savePublication({ ...currentPub, tags });
    setIsEditing(false);
    setTagsInput("");
    loadPublications();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Publications</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryManager(true)}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 font-medium flex items-center gap-2 hover:bg-white/10 transition-colors border border-white/10"
          >
            <Settings size={18} /> Categories
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors"
          >
            <Plus size={18} /> Add Publication
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="p-6 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/20 text-primary">
                  {pub.type}
                </span>
                <h3 className="text-xl font-bold">{pub.title}</h3>
              </div>
              <p className="text-sm text-gray-400">
                By {pub.author} • {pub.date}
              </p>
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
              <h2 className="text-2xl font-bold">
                {currentPub.id ? "Edit Publication" : "Add Publication"}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={currentPub.title}
                  onChange={(e) =>
                    setCurrentPub({ ...currentPub, title: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={currentPub.author}
                    onChange={(e) =>
                      setCurrentPub({ ...currentPub, author: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={currentPub.date}
                    onChange={(e) =>
                      setCurrentPub({ ...currentPub, date: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Type / Category
                </label>
                <select
                  value={currentPub.type}
                  onChange={(e) =>
                    setCurrentPub({ ...currentPub, type: e.target.value })
                  }
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary [&>option]:bg-black"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Manage categories from the &quot;Categories&quot; button above
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  placeholder="Diplomacy, Tech, Policy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Excerpt
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentPub.excerpt}
                  onChange={(e) =>
                    setCurrentPub({ ...currentPub, excerpt: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
                  placeholder="A brief summary of the article..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Content
                </label>
                <textarea
                  rows={10}
                  value={currentPub.content || ""}
                  onChange={(e) =>
                    setCurrentPub({ ...currentPub, content: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-y"
                  placeholder="Full article content... (supports plain text, paragraphs will be preserved)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The full text content of the article or report. Leave empty to
                  use default placeholder content.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={currentPub.image || ""}
                  onChange={(e) =>
                    setCurrentPub({ ...currentPub, image: e.target.value })
                  }
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

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Categories</h2>
              <button
                onClick={() => setShowCategoryManager(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Add new category */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium flex items-center gap-2"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {/* Category list */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {categories.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No categories yet
                </p>
              ) : (
                categories.map((cat) => (
                  <div
                    key={cat}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <span className="font-medium">{cat}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowCategoryManager(false)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
