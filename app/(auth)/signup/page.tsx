"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "hr" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
    });
    if (res.ok) router.push("/dashboard");
    else {
      try { const data = await res.json(); setError(data.error || "Signup failed"); }
      catch { setError("Signup failed"); }
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>

      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="orb absolute w-[500px] h-[500px] -top-48 -right-48 opacity-15"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      <div className="orb absolute w-[400px] h-[400px] -bottom-32 -left-32 opacity-15"
        style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative"
        style={{ borderRight: "1px solid var(--border)" }}>

        {/* Decorative elements */}
        <div className="absolute bottom-24 right-8 w-72 h-72 rounded-full opacity-10 spin-slow"
          style={{ border: "1px dashed #8b5cf6" }} />
        <div className="absolute top-1/3 right-16 float" style={{ animationDelay: "0.5s" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <svg className="w-6 h-6" style={{ color: "#818cf8" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div className="absolute top-1/2 right-8 float" style={{ animationDelay: "2s" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <svg className="w-5 h-5" style={{ color: "#fbbf24" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
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

        <div className="relative z-10 space-y-7">
          <div>
            <h1 className="text-5xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
              Join the platform<br />
              built for <span className="gradient-text">HR teams</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Get started in minutes. Manage employees, track salaries, and organize departments effortlessly.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: "🔐", text: "Role-based access control" },
              { icon: "📊", text: "Real-time dashboard analytics" },
              { icon: "📁", text: "Export data to CSV anytime" },
              { icon: "🔔", text: "Salary status tracking" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.08)" }}>
                <span className="text-lg">{icon}</span>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-4 rounded-2xl"
          style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
          <p className="text-sm flex items-center gap-2" style={{ color: "#34d399" }}>
            <span>✓</span> Free to use — no credit card required
          </p>
        </div>
      </div>

      {/* Right Panel */}
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

          <div className="auth-card rounded-3xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Create account 🚀</h2>
              <p className="mt-1.5 text-sm" style={{ color: "var(--text-muted)" }}>Fill in your details to get started</p>
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

            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                { key: "email", label: "Email address", type: "email", placeholder: "john@company.com" },
                { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
                { key: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                  <input type={type} placeholder={placeholder} required
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.background = "rgba(99,102,241,0.06)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Role</label>
                <select className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="hr">HR Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold mt-2 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}>
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </form>

            <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#818cf8" }} className="font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
