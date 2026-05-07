import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const user = await User.create({ name, email, password, role: role || "hr" });
    const token = signToken({ id: user._id, role: user.role });

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
