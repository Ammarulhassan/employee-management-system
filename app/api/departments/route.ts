import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Department from "@/models/Department";
import Employee from "@/models/Employee";

export async function GET() {
  try {
    await connectDB();
    const departments = await Department.find().lean();
    const withCounts = await Promise.all(
      departments.map(async (d: any) => {
        const employees = await Employee.find({ department: d._id }, "name position status").lean();
        return { ...d, employees };
      })
    );
    return NextResponse.json(withCounts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const department = await Department.create(body);
    return NextResponse.json(department, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
