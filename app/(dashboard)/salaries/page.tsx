"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [form, setForm] = useState({ employee: "", amount: "", month: "", year: "" });
  const [showForm, setShowForm] = useState(false);

  async function fetchData() {
    try {
      const [s, e] = await Promise.all([
        fetch("/api/salaries").then((r) => r.json()),
        fetch("/api/employees").then((r) => r.json()),
      ]);
      setSalaries(Array.isArray(s) ? s : []);
      setEmployees(Array.isArray(e) ? e : []);
    } catch {
      setSalaries([]); setEmployees([]);
    }
  }

  useEffect(() => { fetchData(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/salaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: Number(form.amount), month: Number(form.month), year: Number(form.year) }),
    });
    setForm({ employee: "", amount: "", month: "", year: "" });
    setShowForm(false); fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this salary record?")) return;
    await fetch(`/api/salaries/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function toggleStatus(s: any) {
    await fetch(`/api/salaries/${s._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: s.status === "paid" ? "pending" : "paid" }),
    });
    fetchData();
  }

  function exportCSV() {
    const headers = ["Employee", "Amount", "Month", "Year", "Status"];
    const rows = salaries.map((s) => [s.employee?.name, s.amount, MONTHS[s.month - 1], s.year, s.status]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "salaries.csv"; a.click();
  }

  const totalPaid = salaries.filter((s) => s.status === "paid").reduce((sum, s) => sum + s.amount, 0);
  const totalPending = salaries.filter((s) => s.status === "pending").reduce((sum, s) => sum + s.amount, 0);

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition";

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white font-semibold">Salary Records</h2>
          <p className="text-gray-500 text-sm mt-0.5">{salaries.length} records total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 rounded-lg text-sm transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
          </button>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Add Record"}</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-600/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Paid</p>
            <p className="text-emerald-400 text-xl font-bold">${totalPaid.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-600/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Pending</p>
            <p className="text-amber-400 text-xl font-bold">${totalPending.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-white font-medium mb-4">New Salary Record</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5">Employee</label>
              <select className={inputClass} value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} required>
                <option value="">Select Employee</option>
                {employees.map((e) => <option key={e._id} value={e._id}>{e.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Amount ($)</label>
              <input type="number" placeholder="5000" className={inputClass} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Month</label>
              <select className={inputClass} value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} required>
                <option value="">Month</option>
                {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Year</label>
              <input type="number" placeholder="2024" className={inputClass} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
            </div>
            <div className="md:col-span-4 flex justify-end">
              <Button type="submit">Save Record</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {salaries.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 text-gray-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500">No salary records yet</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {salaries.map((s) => (
                <tr key={s._id} className="hover:bg-gray-800/50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center text-amber-400 text-xs font-bold">
                        {s.employee?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium">{s.employee?.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-emerald-400 font-semibold">${s.amount.toLocaleString()}</span></td>
                  <td className="px-5 py-4 text-gray-300">{MONTHS[s.month - 1]} {s.year}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleStatus(s)} className={`text-xs px-2.5 py-1 rounded-full font-medium transition hover:opacity-80 ${s.status === "paid" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {s.status}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(s._id)} className="text-gray-500 hover:text-red-400 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
