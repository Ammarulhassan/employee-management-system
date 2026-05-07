"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) router.push("/dashboard");
    else { const d = await res.json(); setError(d.error || "Login failed"); }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>

      {/* Full page background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Orbs */}
      <div className="orb absolute w-[500px] h-[500px] -top-48 -left-48 opacity-20"
        style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
      <div className="orb absolute w-[400px] h-[400px] -bottom-32 -right-32 opacity-15"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      <div className="orb absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative"
        style={{ borderRight: "1px solid var(--border)" }}>

        {/* Decorative rotating ring */}
        <div className="absolute top-20 right-16 w-64 h-64 rounded-full opacity-10 spin-slow"
          style={{ border: "1px solid #6366f1", borderStyle: "dashed" }} />
        <div className="absolute top-28 right-24 w-48 h-48 rounded-full opacity-10"
          style={{ border: "1px solid #8b5cf6" }} />

        {/* Floating icons */}
        <div className="absolute top-32 right-32 float" style={{ animationDelay: "0s" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <svg className="w-5 h-5" style={{ color: "#818cf8" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-48 right-20 float" style={{ animationDelay: "1.5s" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <svg className="w-5 h-5" style={{ color: "#a78bfa" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-1/2 right-12 float" style={{ animationDelay: "0.8s" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <svg className="w-5 h-5" style={{ color: "#34d399" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3 z-10">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: "var(--text-primary)" }}>EMS Admin</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Employee Management</p>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-5xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
              Manage your<br />
              <span className="gradient-text">workforce</span><br />
              with confidence
            </h1>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Streamline employee management, departments, and payroll — all in one powerful platform.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "500+", label: "Employees", icon: "👥" },
              { val: "50+", label: "Departments", icon: "🏢" },
              { val: "99%", label: "Uptime", icon: "⚡" },
            ].map(({ val, label, icon }) => (
              <div key={label} className="p-4 rounded-2xl text-center"
                style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)" }}>
                <div className="text-xl mb-1">{icon}</div>
                <p className="text-lg font-bold gradient-text">{val}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10 flex items-center gap-3 p-4 rounded-2xl"
          style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(99,102,241,0.15)" }}>
            <svg className="w-4 h-4" style={{ color: "#818cf8" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Secure JWT authentication with role-based access control
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-sm fade-in">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-bold" style={{ color: "var(--text-primary)" }}>EMS Admin</span>
          </div>

          {/* Card */}
          <div className="auth-card rounded-3xl p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Welcome back 👋</h2>
              <p className="mt-1.5 text-sm" style={{ color: "var(--text-muted)" }}>Sign in to your admin account</p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "email", label: "Email address", type: "email", placeholder: "admin@company.com" },
                { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>{label}</label>
                  <input type={type} placeholder={placeholder} required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.background = "rgba(99,102,241,0.06)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                  />
                </div>
              ))}

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold mt-2 disabled:opacity-50 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}>
                <span className="relative z-10">{loading ? "Signing in..." : "Sign In →"}</span>
              </button>
            </form>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
                Don&apos;t have an account?{" "}
                <Link href="/signup" style={{ color: "#818cf8" }} className="font-semibold hover:underline">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
