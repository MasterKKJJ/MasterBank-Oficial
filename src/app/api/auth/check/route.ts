import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; username: string };

    return NextResponse.json({ authenticated: true, user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
