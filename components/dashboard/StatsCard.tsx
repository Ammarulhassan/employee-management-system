const colorMap = {
  indigo: { bg: "rgba(99,102,241,0.08)", icon: "rgba(99,102,241,0.15)", text: "#818cf8", border: "rgba(99,102,241,0.15)" },
  violet: { bg: "rgba(139,92,246,0.08)", icon: "rgba(139,92,246,0.15)", text: "#a78bfa", border: "rgba(139,92,246,0.15)" },
  emerald: { bg: "rgba(16,185,129,0.08)", icon: "rgba(16,185,129,0.15)", text: "#34d399", border: "rgba(16,185,129,0.15)" },
  amber: { bg: "rgba(245,158,11,0.08)", icon: "rgba(245,158,11,0.15)", text: "#fbbf24", border: "rgba(245,158,11,0.15)" },
};

export default function StatsCard({
  title, value, icon, color = "indigo",
}: {
  title: string; value: number; icon: React.ReactNode; color?: keyof typeof colorMap;
}) {
  const c = colorMap[color];
  return (
    <div className="rounded-2xl p-5 flex items-center gap-4 fade-in"
      style={{ background: "var(--bg-card)", border: `1px solid ${c.border}` }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: c.icon, color: c.text }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{title}</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>{value}</p>
      </div>
    </div>
  );
}
