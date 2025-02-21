import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("token", "", { expires: new Date(0), path: "/" }); // Remove o cookie
  return NextResponse.json({ message: "Logout realizado com sucesso!" }, { status: 200 });
}
