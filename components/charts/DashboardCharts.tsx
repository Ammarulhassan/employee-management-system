"use client";
import { SalaryBarChart, DepartmentPieChart } from "./Charts";

export default function DashboardCharts({ salaries, deptData }: { salaries: any[]; deptData: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-1">Monthly Salary Payouts</h3>
        <p className="text-gray-500 text-xs mb-4">Total salary disbursed per month</p>
        <SalaryBarChart salaries={salaries} />
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-1">Employees by Department</h3>
        <p className="text-gray-500 text-xs mb-4">Distribution across departments</p>
        {deptData.length > 0 ? (
          <DepartmentPieChart data={deptData} />
        ) : (
          <div className="h-[220px] flex items-center justify-center">
            <p className="text-gray-600 text-sm">No data yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
