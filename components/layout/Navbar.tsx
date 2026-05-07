"use client";
import { useRouter, usePathname } from "next/navigation";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your organization" },
  "/employees": { title: "Employees", subtitle: "Manage your workforce" },
  "/departments": { title: "Departments", subtitle: "Organize your teams" },
  "/salaries": { title: "Salaries", subtitle: "Track payroll and compensation" },
  "/profile": { title: "Profile Settings", subtitle: "Manage your account" },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const page = titles[pathname] || { title: "Dashboard", subtitle: "" };

  async function handleLogout() {
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  }

  return (
    <header className="px-6 py-4 flex justify-between items-center border-b"
      style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
      <div>
        <h1 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>{page.title}</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{page.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: "rgba(16,185,129,0.08)", color: "#10b981", border: "1px solid rgba(16,185,129,0.15)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
          Connected
        </div>

        <div className="w-px h-5" style={{ background: "var(--border)" }} />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#f87171";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,113,113,0.3)";
            (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}
