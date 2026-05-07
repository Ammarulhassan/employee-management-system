import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user._id, role: user.role });
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
  return res;
}
