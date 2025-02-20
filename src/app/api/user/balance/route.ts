


import { NextResponse as Response } from "next/server";
import { getUserWithDetails } from "../../user";
import { getUserBalanceByCpf } from "../../user";      

// Função que trata as requisições POST para diferentes endpoints
export async function POST(request: Request) {
    try {
        const { cpf } = await request.json(); // Recebe o CPF da requisição

        // Verifica se o CPF foi fornecido
        if (!cpf) {
            return Response.json({ message: "CPF é necessário!" }, { status: 400 });
        }

        const url = new URL(request.url); // Pega a URL da requisição
        console.log(url)
        if (url.pathname === "/api/user/balance") {
            // Se a requisição for para obter o saldo do usuário
            const balance = await getUserBalanceByCpf(cpf);
            if (!balance) {
                return Response.json({ message: "Saldo não encontrado!" }, { status: 404 });
            }
            return Response.json({ balance }); // Retorna o saldo do usuário
        }

        return Response.json({ message: "Rota não encontrada!" }, { status: 404 }); // Caso a URL não seja válida

    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return Response.json({ message: "Erro ao processar a requisição" }, { status: 500 });
    }
}
