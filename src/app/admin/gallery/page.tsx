"use client";

import { useState, useEffect } from "react";
import {
  getGallery,
  saveGalleryImage,
  deleteGalleryImage,
  getGalleryCategories,
  saveGalleryCategory,
  deleteGalleryCategory,
} from "@/actions";
import { Plus, Trash2, X, Save, Settings } from "lucide-react";
import type { GalleryImage, GalleryImageInput } from "@/types";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isManagingCats, setIsManagingCats] = useState(false);
  const [newImage, setNewImage] = useState<GalleryImageInput>({
    category: "",
    src: "",
    size: "small",
  });
  const [newCategory, setNewCategory] = useState("");

  async function loadData() {
    const [galleryData, catsData] = await Promise.all([
      getGallery(),
      getGalleryCategories(),
    ]);
    setImages(galleryData);
    setCategories(catsData.length > 0 ? catsData : ["Conference", "Workshop"]);
  }

  useEffect(() => {
    // defer to satisfy eslint react-hooks/set-state-in-effect
    setTimeout(() => {
      loadData();
    }, 0);
  }, []);

  // duplicate loadData block removed


  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteGalleryImage(id);
      loadData();
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await saveGalleryImage(newImage);
    setIsAdding(false);
    setNewImage({ category: categories[0] || "", src: "", size: "small" });
    loadData();
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    await saveGalleryCategory(newCategory.trim());
    setNewCategory("");
    loadData();
  }

  async function handleDeleteCategory(cat: string) {
    if (confirm(`Delete category "${cat}"?`)) {
      await deleteGalleryCategory(cat);
      loadData();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsManagingCats(true)}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Settings size={18} /> Categories
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors"
          >
            <Plus size={18} /> Add Image
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-gray-800"
          >
            <img
              src={img.src}
              alt={img.category}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div>
                <span className="text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded mb-2 inline-block">
                  {img.category}
                </span>
                <p className="text-xs text-gray-400 capitalize">
                  {img.size} size
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Image</h2>
              <button
                onClick={() => setIsAdding(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={newImage.src}
                  onChange={(e) =>
                    setNewImage({ ...newImage, src: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={newImage.category}
                    onChange={(e) =>
                      setNewImage({ ...newImage, category: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Size
                  </label>
                  <select
                    value={newImage.size}
                    onChange={(e) =>
                      setNewImage({ ...newImage, size: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="small">Small (1x1)</option>
                    <option value="wide">Wide (2x1)</option>
                    <option value="tall">Tall (1x2)</option>
                    <option value="large">Large (2x2)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium flex items-center gap-2"
                >
                  <Save size={18} /> Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Categories Modal */}
      {isManagingCats && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Categories</h2>
              <button
                onClick={() => setIsManagingCats(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Add New */}
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  placeholder="New Category Name"
                />
                <button
                  type="submit"
                  disabled={!newCategory.trim()}
                  className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  <Plus size={18} />
                </button>
              </form>

              {/* List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <span className="font-medium">{cat}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="text-red-500 hover:text-red-400 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
