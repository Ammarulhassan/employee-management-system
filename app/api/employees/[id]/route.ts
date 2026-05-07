import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Employee from "@/models/Employee";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;
    const employee = await Employee.findById(id).populate("department", "name");
    if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(employee);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const employee = await Employee.findByIdAndUpdate(id, body, { new: true });
    if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(employee);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;
    await Employee.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
