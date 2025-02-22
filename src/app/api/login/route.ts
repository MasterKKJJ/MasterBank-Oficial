import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dotenv from "dotenv"
dotenv.config();


export async function POST(req: Request) {
  try {
    
    const dados = await req.json();
    const { cpf, password } = dados
    console.log(cpf, password)
    if (!cpf || !password) {
      return NextResponse.json({ error: "Usuário e senha são obrigatórios!" }, { status: 400 });
    }
    // Normalizar o nome de usuário (opcional)
  
    // Buscar usuário no banco de dados
    const user = await prisma.user.findUnique({ where: { cpf } });
    console.log(user)
    console.log(cpf, password)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Credenciais inválidas!" }, { status: 401 });
    }

    // Verificar se JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido no .env!");
    }

    // Gerar token JWT com ID e cpf
    const token = jwt.sign(
      { id: user.id }, // Payload
      process.env.JWT_SECRET as string,         // Chave secreta
      { expiresIn: "1h" }                       // Tempo de expiração
    );

    (await cookies()).set("token", token, {
        httpOnly: true, // Impede que o JavaScript acesse o cookie
        secure: process.env.NODE_ENV === "production", // Só envia em HTTPS em produção
        maxAge: 3600, // Expira em 1 hora
        path: "/", // Disponível em toda a aplicação
      });
    return NextResponse.json({ message: "Logado com sucesso!" }, { status: 200 });

  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
