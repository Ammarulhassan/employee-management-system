"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then((u) => { setUser(u); setName(u.name); });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (newPassword && newPassword !== confirmPassword) return setMsg({ type: "error", text: "New passwords do not match" });
    if (newPassword && newPassword.length < 6) return setMsg({ type: "error", text: "Password must be at least 6 characters" });
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, currentPassword: newPassword ? currentPassword : undefined, newPassword: newPassword || undefined }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMsg({ type: "success", text: "Profile updated successfully" });
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } else {
      setMsg({ type: "error", text: data.error || "Update failed" });
    }
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition";

  if (!user) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-white font-semibold">Profile Settings</h2>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account details and password</p>
      </div>

      {/* Avatar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400 text-2xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-white font-semibold text-lg">{user.name}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <span className="mt-1 inline-block bg-indigo-600/10 text-indigo-400 text-xs px-2.5 py-1 rounded-full font-medium capitalize">{user.role}</span>
        </div>
      </div>

      {msg && (
        <div className={`px-4 py-3 rounded-lg text-sm border ${msg.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
        <h3 className="text-white font-medium">Account Information</h3>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
          <input type="text" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
          <input type="email" className={`${inputClass} opacity-50 cursor-not-allowed`} value={user.email} disabled />
        </div>

        <div className="border-t border-gray-800 pt-5">
          <h3 className="text-white font-medium mb-4">Change Password <span className="text-gray-600 text-xs font-normal">(leave blank to keep current)</span></h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Current Password</label>
              <input type="password" placeholder="••••••••" className={inputClass} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">New Password</label>
                <input type="password" placeholder="••••••••" className={inputClass} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className={inputClass} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
        </div>
      </form>
    </div>
  );
}
