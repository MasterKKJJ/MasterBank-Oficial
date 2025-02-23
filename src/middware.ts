import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET || "chave-secreta"; // Use uma variável de ambiente segura

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const isAuthenticated = token ? verifyToken(token) : false;
    console.log(pathname)
    if (!isAuthenticated && pathname !== "/login") {
        // 🔒 Se não estiver autenticado, redireciona para login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAuthenticated && pathname === "/login") {
        // 🔄 Se já estiver autenticado e tentar acessar /login, redireciona para a raiz "/"
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// Função para verificar se o token JWT é válido e não expirou
function verifyToken(token: string): boolean {
    try {
        jwt.verify(token, SECRET_KEY);
        return true;
    } catch {
        return false;
    }
}

// Aplica o middleware para todas as rotas
export const config = {
    matcher: "/:path*",
};
