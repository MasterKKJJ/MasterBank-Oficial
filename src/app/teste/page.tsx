"use client";

import { useEffect, useState } from "react";

const Teste = () => {
    const [user, setUser] = useState<any>(null);
    const [nickname, setNickname] = useState<string>("Master"); // Nome do usuário


    const fetchUser = async () => {
        const res = await fetch("/api/user", {
            method: "POST", // Método POST
            headers: {
                "Content-Type": "application/json", // Define o tipo de conteúdo
            },
            body: JSON.stringify({ nickname }) // Envia o nome do usuário como JSON
        });

        if (!res.ok) {
            console.error("Erro ao buscar usuário");
            return;
        }

        const data = await res.json();
        setUser(data); // Atualiza o estado com os dados do usuário
    };

    useEffect(() => {
        fetchUser(); // Carrega os dados ao montar o componente
    }, []);

    if (!user) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            {Object.entries(user).map(([key, value]) => (


                <p key={key}>
                    <strong>{key}:</strong>{" "}
                    {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                </p>
            ))}
        </div>
    );
};

export default Teste;
