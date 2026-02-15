"use client";

import { useState, useEffect } from "react";
import { getTeam, saveTeamMember, deleteTeamMember } from "@/actions";
import { Plus, Edit, Trash2, X, Save, User } from "lucide-react";
import type { TeamMember, TeamMemberInput } from "@/types";

const emptyMember: TeamMemberInput = {
  name: "",
  role: "",
  image: "",
  imageFocusX: 50,
  imageFocusY: 20,
  isSenior: false,
};

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] =
    useState<TeamMemberInput>(emptyMember);

  async function loadTeam() {
    const data = await getTeam();
    setTeam(data);
  }

  useEffect(() => {
    // defer to satisfy eslint react-hooks/set-state-in-effect
    setTimeout(() => {
      loadTeam();
    }, 0);
  }, []);

  function handleAddNew() {
    setCurrentMember(emptyMember);
    setIsEditing(true);
  }

  function handleEdit(member: TeamMember) {
    setCurrentMember({
      id: member.id,
      name: member.name,
      role: member.role,
      image: member.image,
      quote: member.quote ?? undefined,
      imageFocusX:
        typeof member.imageFocusX === "number" ? member.imageFocusX : 50,
      imageFocusY:
        typeof member.imageFocusY === "number" ? member.imageFocusY : 20,
      isSenior: !!member.isSenior,
    });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this team member?")) {
      await deleteTeamMember(id);
      loadTeam();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await saveTeamMember(currentMember);
    setIsEditing(false);
    loadTeam();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Team</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden shrink-0 flex items-center justify-center">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={24} className="text-gray-500" />
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-bold flex items-center gap-2">
                {member.name}
                {member.isSenior && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[var(--color-gold)]/15 text-[var(--color-gold)] border border-[var(--color-gold)]/25">
                    Senior
                  </span>
                )}
              </h3>
              <p className="text-sm text-primary">{member.role}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-4">
          <div className="min-h-full flex items-start justify-center py-6">
            <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {currentMember.id ? "Edit Member" : "Add Member"}
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
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={currentMember.name}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  required
                  value={currentMember.role}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, role: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Quote
                </label>
                <textarea
                  value={currentMember.quote || ""}
                  onChange={(e) =>
                    setCurrentMember({
                      ...currentMember,
                      quote: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-24 resize-none"
                  placeholder="Enter a short quote..."
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium">Senior Team Member</p>
                  <p className="text-xs text-gray-500">
                    Shows in the separate &quot;Senior Team&quot; panel on the About page.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!!currentMember.isSenior}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        isSenior: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={currentMember.image}
                  onChange={(e) =>
                    setCurrentMember({
                      ...currentMember,
                      image: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  placeholder="https://..."
                />
              </div>

              {/* Image Crop / Focus (object-position) */}
              {currentMember.image?.trim() && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Card Crop (what stays visible)
                    </label>
                    <div className="w-full max-w-[320px] aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
                      <img
                        src={currentMember.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: `${currentMember.imageFocusX ?? 50}% ${currentMember.imageFocusY ?? 20}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Adjust the focus so faces don&apos;t get cut in the About page cards.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Horizontal</span>
                        <span>{Math.round(currentMember.imageFocusX ?? 50)}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={currentMember.imageFocusX ?? 50}
                        onChange={(e) =>
                          setCurrentMember({
                            ...currentMember,
                            imageFocusX: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Vertical</span>
                        <span>{Math.round(currentMember.imageFocusY ?? 20)}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={currentMember.imageFocusY ?? 20}
                        onChange={(e) =>
                          setCurrentMember({
                            ...currentMember,
                            imageFocusY: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

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
                  <Save size={18} /> Save Member
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
