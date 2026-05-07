import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  await connectDB();
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await User.findById(auth.id).select("-password");
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, currentPassword, newPassword } = await req.json();

  const user = await User.findById(auth.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (newPassword) {
    const valid = await user.comparePassword(currentPassword);
    if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    user.password = newPassword;
  }

  user.name = name || user.name;
  await user.save();
  return NextResponse.json({ success: true });
}
