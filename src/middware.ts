import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Usa 'jose' no lugar de 'jsonwebtoken' (Edge-compatible)

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "chave-secreta"); // 🔑 Use variáveis seguras!

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const isAuthenticated = token ? await verifyToken(token) : false;

    if (!isAuthenticated && pathname !== "/login") {

        localStorage.removeItem('token')
        localStorage.removeItem('nu-user');
        localStorage.removeItem('nu-bank');

        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAuthenticated && pathname === "/login") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// 🔒 Função segura para validar o token e checar expiração
async function verifyToken(token: string): Promise<boolean> {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);

        // Verifica se o token tem a claim de expiração (`exp`)
        if (!payload.exp || Date.now() >= payload.exp * 1000) {
            return false; // Token expirado
        }

        return true; // Token válido
    } catch (error) {
        return false; // Token inválido
    }
}

// 🔀 Aplica o middleware para todas as rotas, exceto arquivos estáticos e API
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
