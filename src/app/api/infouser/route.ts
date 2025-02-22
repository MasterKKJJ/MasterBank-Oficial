import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export async function POST() {
    // Obter o cookie "token"
    const cookie = (await cookies()).get("token");
    console.log("Cookie recebido:", cookie);

    // Se não existir o cookie, retorna erro imediatamente
    if (!cookie) {
        return NextResponse.json({ error: "JWT inválido!" }, { status: 400 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return NextResponse.json({ error: "JWT Secret não configurado!" }, { status: 500 });
    }

    let decoded;
    try {
        // Decodifica o token usando o secret
        decoded = jwt.verify(cookie.value, jwtSecret);
    } catch (error) {
        console.error("Erro na verificação do JWT:", error);
        return NextResponse.json({ error: "Token inválido!" }, { status: 400 });
    }

    console.log("Token decodificado:", decoded);

    // Busca o usuário com base no id decodificado
    const User = await prisma.user.findFirst({
        where: { id: decoded?.id },
    });

    if (!User) {
        return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 400 });
    }

    return NextResponse.json({ message: "User capturado!", dados: User }, { status: 200 });
}
