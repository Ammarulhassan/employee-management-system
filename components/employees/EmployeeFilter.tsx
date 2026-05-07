"use client";
import { useEffect, useState } from "react";

interface Filter { department: string; status: string; }

export default function EmployeeFilter({ filter, onChange }: { filter: Filter; onChange: (f: Filter) => void }) {
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/departments")
      .then((r) => r.json())
      .then((data) => setDepartments(Array.isArray(data) ? data : []))
      .catch(() => setDepartments([]));
  }, []);

  const selectClass = "bg-gray-900 border border-gray-800 text-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition";

  return (
    <div className="flex gap-3 mb-5">
      <select className={selectClass} value={filter.department} onChange={(e) => onChange({ ...filter, department: e.target.value })}>
        <option value="">All Departments</option>
        {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
      </select>
      <select className={selectClass} value={filter.status} onChange={(e) => onChange({ ...filter, status: e.target.value })}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
