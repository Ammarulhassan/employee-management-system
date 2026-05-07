"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<any>(null);

  async function fetchDepartments() {
    try {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments(Array.isArray(data) ? data : []);
    } catch {
      setDepartments([]);
    }
  }

  useEffect(() => { fetchDepartments(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setName(""); setDescription(""); setShowForm(false);
    fetchDepartments();
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/departments/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setEditing(null); setName(""); setDescription("");
    fetchDepartments();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this department?")) return;
    await fetch(`/api/departments/${id}`, { method: "DELETE" });
    fetchDepartments();
  }

  function startEdit(d: any) {
    setEditing(d); setName(d.name); setDescription(d.description || ""); setShowForm(false);
  }

  function cancelEdit() {
    setEditing(null); setName(""); setDescription("");
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition";

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white font-semibold">All Departments</h2>
          <p className="text-gray-500 text-sm mt-0.5">{departments.length} departments total</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); cancelEdit(); }}>
          {showForm ? "Cancel" : "+ Add Department"}
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-white font-medium mb-4">New Department</h3>
          <form onSubmit={handleAdd} className="flex gap-3">
            <input className={inputClass} placeholder="Department name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={inputClass} placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button type="submit">Add</Button>
          </form>
        </div>
      )}

      {/* Edit Form */}
      {editing && (
        <div className="bg-gray-900 border border-indigo-500/30 rounded-xl p-5">
          <h3 className="text-white font-medium mb-4">Edit Department</h3>
          <form onSubmit={handleEdit} className="flex gap-3">
            <input className={inputClass} placeholder="Department name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={inputClass} placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button type="submit">Save</Button>
            <button type="button" onClick={cancelEdit} className="px-4 py-2 border border-gray-700 text-gray-400 hover:text-white rounded-lg text-sm transition">Cancel</button>
          </form>
        </div>
      )}

      {departments.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <svg className="w-12 h-12 text-gray-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
          </svg>
          <p className="text-gray-500">No departments yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {departments.map((d) => {
            const isOpen = expanded === d._id;
            return (
              <div key={d._id} className={`bg-gray-900 border rounded-xl overflow-hidden transition ${editing?._id === d._id ? "border-indigo-500/30" : "border-gray-800"}`}>
                <div className="flex items-center justify-between px-5 py-4">
                  <button onClick={() => setExpanded(isOpen ? null : d._id)} className="flex items-center gap-4 flex-1 text-left">
                    <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">{d.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{d.description || "No description"}</p>
                    </div>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="bg-indigo-600/10 text-indigo-400 text-xs px-2.5 py-1 rounded-full font-medium">
                      {d.employees?.length || 0} employees
                    </span>
                    <span className="text-gray-600 text-xs">{new Date(d.createdAt).toLocaleDateString()}</span>
                    <button onClick={() => startEdit(d)} className="text-gray-500 hover:text-indigo-400 transition p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => handleDelete(d._id)} className="text-gray-500 hover:text-red-400 transition p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-gray-800">
                    {!d.employees?.length ? (
                      <div className="px-5 py-6 text-center">
                        <p className="text-gray-600 text-sm">No employees in this department</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-800/60">
                        <div className="px-5 py-2.5 grid grid-cols-3 bg-gray-800/30">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</span>
                        </div>
                        {d.employees.map((emp: any) => (
                          <div key={emp._id} className="px-5 py-3 grid grid-cols-3 items-center hover:bg-gray-800/30 transition">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                                {emp.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-white text-sm">{emp.name}</span>
                            </div>
                            <span className="text-gray-400 text-sm">{emp.position}</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${emp.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-700 text-gray-400"}`}>
                              {emp.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
