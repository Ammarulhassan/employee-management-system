import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Salary from "@/models/Salary";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const employee = searchParams.get("employee");
    const filter: any = {};
    if (employee) filter.employee = employee;
    const salaries = await Salary.find(filter).populate("employee", "name");
    return NextResponse.json(salaries);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const salary = await Salary.create(body);
    return NextResponse.json(salary, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
