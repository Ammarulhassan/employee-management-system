"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

interface Props { initial?: any; onClose: () => void; onSaved: () => void; }
const empty = { name: "", email: "", phone: "", position: "", department: "", hireDate: "", status: "active" };

export default function EmployeeForm({ initial, onClose, onSaved }: Props) {
  const [form, setForm] = useState(initial ? { ...initial, department: initial.department?._id || initial.department } : empty);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/departments").then((r) => r.json())
      .then((d) => setDepartments(Array.isArray(d) ? d : []))
      .catch(() => setDepartments([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = initial ? "PUT" : "POST";
    const url = initial ? `/api/employees/${initial._id}` : "/api/employees";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    onSaved();
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl text-sm outline-none";
  const inputStyle = { background: "var(--bg-primary)", border: "1px solid var(--border)", color: "var(--text-primary)" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-md rounded-2xl fade-in" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>{initial ? "Edit Employee" : "Add New Employee"}</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{initial ? "Update employee details" : "Fill in the details below"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--bg-primary)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Full Name</label>
              <input type="text" placeholder="John Doe" className={inputClass} style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Phone</label>
              <input type="text" placeholder="+1 234 567" className={inputClass} style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Email</label>
            <input type="email" placeholder="john@company.com" className={inputClass} style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Position</label>
            <input type="text" placeholder="Software Engineer" className={inputClass} style={inputStyle} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Department</label>
              <select className={inputClass} style={inputStyle} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required>
                <option value="">Select</option>
                {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Status</label>
              <select className={inputClass} style={inputStyle} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Hire Date</label>
            <input type="date" className={inputClass} style={inputStyle} value={form.hireDate?.split("T")[0] || form.hireDate} onChange={(e) => setForm({ ...form, hireDate: e.target.value })} required />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: "var(--bg-primary)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              Cancel
            </button>
            <Button type="submit" className="flex-1 justify-center">Save Employee</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
