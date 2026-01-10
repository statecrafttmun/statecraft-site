"use client";

import { useState, useEffect } from "react";
import { getEvents, saveEvent, deleteEvent } from "@/actions";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";
import type { Event, EventInput } from "@/types";

const emptyEvent: EventInput = {
  title: "",
  date: "",
  location: "",
  desc: "",
  status: "Open",
  registrationDeadline: "",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventInput>(emptyEvent);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await getEvents();
    setEvents(data);
  }

  function handleAddNew() {
    setCurrentEvent(emptyEvent);
    setIsEditing(true);
  }

  function handleEdit(event: Event) {
    setCurrentEvent(event);
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      loadEvents();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await saveEvent(currentEvent);
    setIsEditing(false);
    loadEvents();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-6 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold mb-1">{event.title}</h3>
              <p className="text-sm text-gray-400">
                {event.date} • {event.location} • {event.status}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(event)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(event.id)}
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-8 my-4 sm:my-0 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {currentEvent.id ? "Edit Event" : "Add Event"}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={currentEvent.title}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, title: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={currentEvent.date}
                    onChange={(e) =>
                      setCurrentEvent({ ...currentEvent, date: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Status
                  </label>
                  <select
                    value={currentEvent.status}
                    onChange={(e) =>
                      setCurrentEvent({
                        ...currentEvent,
                        status: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={currentEvent.location}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={currentEvent.desc}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, desc: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Registration Link
                </label>
                <input
                  type="url"
                  value={currentEvent.registrationLink || ""}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      registrationLink: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  placeholder="https://forms.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Registration Deadline
                </label>
                <input
                  type="datetime-local"
                  value={currentEvent.registrationDeadline || ""}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      registrationDeadline: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Delegate / IP Fee
                </label>
                <input
                  type="text"
                  value={currentEvent.fee || ""}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, fee: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  placeholder="e.g. ₹1200 Delegate / ₹1000 IP"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={currentEvent.isFeatured || false}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      isFeatured: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="isFeatured"
                  className="text-sm font-medium text-gray-400"
                >
                  Mark as Featured Event
                </label>
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
                  <Save size={18} /> Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
