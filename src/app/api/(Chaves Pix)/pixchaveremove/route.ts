import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

interface DecodedToken extends jwt.JwtPayload {
    id: string; // Garante que o ID estará presente
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const chave = body.chave; // Obtendo o tipo da chave do body

        if (!chave) {
            return NextResponse.json({ error: "Tipo de chave não especificado!" }, { status: 400 });
        }

        // Obter o cookie "token"
        const tokenCookie = (await cookies()).get("token");
        console.log("Cookie recebido:", tokenCookie);

        // Se não existir o cookie, retorna erro imediatamente
        if (!tokenCookie) {
            return NextResponse.json({ error: "JWT inválido!" }, { status: 400 });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return NextResponse.json({ error: "JWT Secret não configurado!" }, { status: 500 });
        }

        let decoded: DecodedToken | undefined;
        try {
            // Decodifica o token usando o secret
            decoded = jwt.verify(tokenCookie.value, jwtSecret) as DecodedToken;
        } catch (error) {
            console.error("Erro na verificação do JWT:", error);
            return NextResponse.json({ error: "Token inválido!" }, { status: 400 });
        }
        console.log("Token decodificado:", decoded);

        // Busca o usuário com base no ID decodificado
        const User = await prisma.user.findUnique({
            where: { id: decoded?.id },
            select: { id: true, email: true, phone: true, cpf: true }, // Obtendo apenas os dados necessários
        });

        if (!User) {
            return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 400 });
        }

        let existingPixKey = null;


        try {
            if (chave === "EMAIL") {


                // Verifica se a chave já existe
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "EMAIL" },
                });
                console.log(existingPixKey);
                if (existingPixKey) {
                    await prisma.pixKey.delete({
                        where: { id: existingPixKey.id },
                    });
                    return NextResponse.json({ message: "Chave excluída com sucesso!" }, { status: 200 });
                }

            } else if (chave === "NUMERO_TEL") {


                // Verifica se a chave já existe
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "PHONE" },
                });

                if (existingPixKey) {
                    await prisma.pixKey.delete({
                        where: { id: existingPixKey.id },
                    });
                    return NextResponse.json({ message: "Chave excluída com sucesso!" }, { status: 200 });
                }

            } else if (chave === "CPF") {


                // Verifica se a chave já existe
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "CPF" },
                });
                console.log(existingPixKey);
                if (existingPixKey) {
                    await prisma.pixKey.delete({
                        where: { id: existingPixKey.id },
                    });
                    return NextResponse.json({ message: "Chave excluída com sucesso!" }, { status: 200 });
                }

            } else if (chave === "RANDOM") {
                // Verifica se a chave já existe
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "RANDOM" },
                });
                console.log(existingPixKey);
                if (existingPixKey) {
                    await prisma.pixKey.delete({
                        where: { id: existingPixKey.id },
                    });
                    return NextResponse.json({ message: "Chave excluída com sucesso!" }, { status: 200 });
                }

            } else {
                return NextResponse.json({ error: "Tipo de chave inválido!" }, { status: 400 });
            }
        } catch (erro) {
            console.log("Erro ao processar chave Pix:", erro);
            return NextResponse.json({ error: "Erro ao processar chave Pix. Tente novamente mais tarde." }, { status: 500 });
        }
    } catch (error) {
        console.error("Erro inesperado:", error);
        return NextResponse.json({ error: "Erro interno no servidor", details: error.message }, { status: 500 });
    }
}
