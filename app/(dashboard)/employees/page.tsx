"use client";
import { useEffect, useState } from "react";
import EmployeeTable from "@/components/employees/EmployeeTable";
import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeFilter from "@/components/employees/EmployeeFilter";
import Button from "@/components/Button";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [filter, setFilter] = useState({ department: "", status: "" });
  const [search, setSearch] = useState("");

  async function fetchEmployees() {
    try {
      const params = new URLSearchParams();
      if (filter.department) params.set("department", filter.department);
      if (filter.status) params.set("status", filter.status);
      const res = await fetch(`/api/employees?${params}`);
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      setEmployees([]);
    }
  }

  useEffect(() => { fetchEmployees(); }, [filter]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Phone", "Position", "Department", "Status", "Hire Date"];
    const rows = filtered.map((e: any) => [
      e.name, e.email, e.phone || "", e.position,
      e.department?.name || "", e.status,
      new Date(e.hireDate).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "employees.csv"; a.click();
  }

  const filtered = employees.filter((e: any) =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.email?.toLowerCase().includes(search.toLowerCase()) ||
    e.position?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white font-semibold">All Employees</h2>
          <p className="text-gray-500 text-sm mt-0.5">{filtered.length} employees found</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 rounded-lg text-sm transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
          </button>
          <Button onClick={() => { setEditing(null); setShowForm(true); }}>+ Add Employee</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search by name, email, position..."
            className="bg-gray-900 border border-gray-800 text-gray-300 placeholder-gray-600 pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500 w-72 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <EmployeeFilter filter={filter} onChange={setFilter} />
      </div>

      <EmployeeTable
        employees={filtered}
        onEdit={(e) => { setEditing(e); setShowForm(true); }}
        onDelete={handleDelete}
      />

      {showForm && (
        <EmployeeForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); fetchEmployees(); }}
        />
      )}
    </div>
  );
}
