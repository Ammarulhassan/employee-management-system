import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Salary from "@/models/Salary";

type Context = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Context) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const salary = await Salary.findByIdAndUpdate(id, body, { new: true });
  if (!salary) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(salary);
}

export async function DELETE(_: NextRequest, { params }: Context) {
  await connectDB();
  const { id } = await params;
  await Salary.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
