import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Department from "@/models/Department";

type Context = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Context) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const dept = await Department.findByIdAndUpdate(id, body, { new: true });
  if (!dept) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(dept);
}

export async function DELETE(_: NextRequest, { params }: Context) {
  await connectDB();
  const { id } = await params;
  await Department.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
