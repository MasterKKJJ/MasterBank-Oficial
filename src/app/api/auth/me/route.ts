import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ authenticated: true, user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
