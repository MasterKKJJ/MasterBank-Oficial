import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
export async function POST() {
    const cookie = (await cookies()).get('token');
    if (!cookie) {
        NextResponse.json({ error: "JWT inválido!" }, { status: 400 });
    }

    const decoded = jwt.verify(cookie?.value as string, process.env.JWT_SECRET as string);
    const balance = await prisma.balanceUser.findFirst({
        where: {
            user:
            {
                id: decoded?.id
            }
        },
        select: {
            balance: true
        }
        ,
    })
    if (!balance) {
        NextResponse.json({ error: "Usuário não encontrado!" }, { status: 400 });
    }
    return NextResponse.json({ message: "User capturado!", dados: balance }, { status: 200 });


}
