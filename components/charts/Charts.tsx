"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COLORS = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

export function SalaryBarChart({ salaries }: { salaries: any[] }) {
  const data = MONTHS.map((month, i) => ({
    month,
    total: salaries.filter((s) => s.month === i + 1).reduce((sum, s) => sum + s.amount, 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
        <Tooltip
          contentStyle={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "8px", color: "#fff" }}
          formatter={(v: any) => [`$${v.toLocaleString()}`, "Total"]}
        />
        <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DepartmentPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "8px", color: "#fff" }}
        />
        <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: "#9ca3af", fontSize: 12 }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}
