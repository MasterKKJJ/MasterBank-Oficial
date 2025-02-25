import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import crypto from "crypto"; // Para gerar a chave aleatória

dotenv.config();
const prisma = new PrismaClient();

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

        let decoded;
        try {
            // Decodifica o token usando o secret
            decoded = jwt.verify(tokenCookie.value, jwtSecret);
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
                if (!User.email) {
                    return NextResponse.json({ error: "Usuário não possui um e-mail cadastrado!" }, { status: 400 });
                }

                // Verifica se a chave já existe
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "EMAIL" },
                });

                if (existingPixKey) {
                    return NextResponse.json({ message: "A chave de e-mail já está cadastrada!" }, { status: 200 });
                }

                // Cria a chave Pix
                await prisma.pixKey.create({
                    data: {
                        user_id: User.id,
                        type: "EMAIL",
                        key: User.email,
                    },
                });

            } else if (chave === "NUMERO_TEL") {
                if (!User.phone) {
                    return NextResponse.json({ error: "Usuário não possui um número de telefone cadastrado!" }, { status: 400 });
                }

                // Verifica se a chave já existe
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "PHONE" },
                });

                if (existingPixKey) {
                    return NextResponse.json({ message: "A chave de telefone já está cadastrada!" }, { status: 200 });
                }

                // Cria a chave Pix
                await prisma.pixKey.create({
                    data: {
                        user_id: User.id,
                        type: "PHONE",
                        key: User.phone,
                    },
                });

            } else if (chave === "CPF") {
                if (!User.cpf) {
                    return NextResponse.json({ error: "Usuário não possui um CPF cadastrado!" }, { status: 400 });
                }

                // Verifica se a chave já existe
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "CPF" },
                });

                if (existingPixKey) {
                    return NextResponse.json({ message: "A chave de CPF já está cadastrada!" }, { status: 200 });
                }

                // Cria a chave Pix
                await prisma.pixKey.create({
                    data: {
                        user_id: User.id,
                        type: "CPF",
                        key: User.cpf,
                    },
                });

            } else if (chave === "RANDOM") {
                // Gerar uma chave Pix aleatória
                const randomKey = crypto.randomBytes(16).toString("hex"); // Gera uma chave aleatória de 32 caracteres hexadecimais

                // Verifica se já existe uma chave aleatória
                existingPixKey = await prisma.pixKey.findFirst({
                    where: { user_id: User.id, type: "RANDOM" },
                });

                if (existingPixKey) {
                    return NextResponse.json({ message: "A chave aleatória já está cadastrada!" }, { status: 200 });
                }

                // Cria a chave Pix aleatória
                await prisma.pixKey.create({
                    data: {
                        user_id: User.id,
                        type: "RANDOM",
                        key: randomKey,
                    },
                });

            } else {
                return NextResponse.json({ error: "Tipo de chave inválido!" }, { status: 400 });
            }
        } catch (erro) {
            console.log("Erro na criação de chave Pix:", erro);
            return NextResponse.json({ error: "Erro ao criar chave Pix. Tente novamente mais tarde." }, { status: 500 });
        }

        // Se chegou aqui, significa que a chave foi criada com sucesso
        return NextResponse.json({ message: "Chave Pix cadastrada com sucesso!" }, { status: 201 });

    } catch (error) {
        console.error("Erro inesperado:", error);
        return NextResponse.json({ error: "Erro interno no servidor", details: error.message }, { status: 500 });
    }
}
