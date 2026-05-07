export default function EmployeeTable({
  employees, onEdit, onDelete,
}: {
  employees: any[]; onEdit: (e: any) => void; onDelete: (id: string) => void;
}) {
  if (employees.length === 0) {
    return (
      <div className="rounded-2xl p-16 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(99,102,241,0.08)" }}>
          <svg className="w-8 h-8" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="font-medium" style={{ color: "var(--text-secondary)" }}>No employees found</p>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Add your first employee to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(99,102,241,0.03)" }}>
            {["Employee", "Position", "Department", "Status", "Actions"].map((h) => (
              <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((e, i) => (
            <tr key={e._id} className="table-row-hover" style={{ borderBottom: i < employees.length - 1 ? "1px solid var(--border)" : "none" }}>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))", color: "#818cf8" }}>
                    {e.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>{e.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{e.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4" style={{ color: "var(--text-secondary)" }}>{e.position}</td>
              <td className="px-5 py-4">
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.15)" }}>
                  {e.department?.name || "—"}
                </span>
              </td>
              <td className="px-5 py-4">
                <span className="flex items-center gap-1.5 w-fit text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={e.status === "active"
                    ? { background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.15)" }
                    : { background: "rgba(71,85,105,0.2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: e.status === "active" ? "#34d399" : "#475569" }} />
                  {e.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(e)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.15)" }}>
                    Edit
                  </button>
                  <button onClick={() => onDelete(e._id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.15)" }}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
