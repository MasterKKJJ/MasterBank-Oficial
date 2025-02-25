import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";



dotenv.config();
const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {

        // Obter o cookie "token"
        const tokenCookie = (await cookies()).get("token");

        // Se não existir o cookie, retorna erro imediatamente
        if (!tokenCookie) {
            return NextResponse.json({ error: "JWT inválido!" }, { status: 400 });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return NextResponse.json({ error: "JWT Secret não configurado!" }, { status: 500 });
        }

        let decoded;
        try {
            // Decodifica o token usando o secret
            decoded = jwt.verify(tokenCookie.value, jwtSecret);
        } catch (error) {
            console.error("Erro na verificação do JWT:", error);
            return NextResponse.json({ error: "Token inválido!" }, { status: 400 });
        }
        console.log("Token decodificado:", decoded);

        // Busca o usuário com base no id decodificado
        const User = await prisma.user.findUnique({
            where: { id: decoded?.id },
            select: { id: true, email: true, phone: true, cpf: true }, // Obtendo apenas os dados necessários
        });

        if (!User) {
            return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 400 });
        }

        ////Pegar chaves pix user

        const pix_conta = await prisma.pixKey.findMany({
            where: { user_id: User?.id },
            select: {
                key: true,
                type: true,
            }
        })

        return NextResponse.json({ message: "Chaves do usuário:", dados: pix_conta }, { status: 200 });

    } catch (error) {
        console.error("Erro inesperado:", error);
        return NextResponse.json({ error: "Erro interno no servidor", details: error.message }, { status: 500 });
    }
}
