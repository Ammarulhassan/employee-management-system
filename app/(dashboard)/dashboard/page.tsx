import StatsCard from "@/components/dashboard/StatsCard";
import { connectDB } from "@/lib/db";
import Employee from "@/models/Employee";
import Department from "@/models/Department";
import Salary from "@/models/Salary";
import DashboardCharts from "@/components/charts/DashboardCharts";

async function getStats() {
  try {
    await connectDB();
    const [employees, departments, salaries] = await Promise.all([
      Employee.find().populate("department", "name").lean(),
      Department.find().lean(),
      Salary.find().populate("employee", "name").lean(),
    ]);
    return { employees, departments, salaries };
  } catch {
    return { employees: [], departments: [], salaries: [] };
  }
}

export default async function DashboardPage() {
  const { employees, departments, salaries } = await getStats();
  const activeEmployees = (employees as any[]).filter((e) => e.status === "active").length;

  const deptData = (departments as any[]).map((d) => ({
    name: d.name,
    value: (employees as any[]).filter((e) => e.department?._id?.toString() === d._id?.toString()).length,
  })).filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-xl font-semibold">Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Employees" value={(employees as any[]).length} color="indigo"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatsCard title="Active Employees" value={activeEmployees} color="emerald"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatsCard title="Departments" value={(departments as any[]).length} color="violet"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
        <StatsCard title="Salary Records" value={(salaries as any[]).length} color="amber"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <DashboardCharts salaries={JSON.parse(JSON.stringify(salaries))} deptData={deptData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Recent Employees</h3>
          {(employees as any[]).length > 0 ? (
            <div className="space-y-3">
              {(employees as any[]).slice(0, 5).map((e) => (
                <div key={e._id.toString()} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400 text-xs font-bold">
                      {e.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{e.name}</p>
                      <p className="text-gray-500 text-xs">{e.position}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${e.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-700 text-gray-400"}`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">No employees yet.</p>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Departments</h3>
          {(departments as any[]).length > 0 ? (
            <div className="space-y-3">
              {(departments as any[]).slice(0, 5).map((d) => (
                <div key={d._id.toString()} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{d.name}</p>
                    <p className="text-gray-500 text-xs">{d.description || "No description"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">No departments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
