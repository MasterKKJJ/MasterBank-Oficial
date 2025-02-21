"use client";

import { useCallback, useState } from "react";
import DivisaoPequena from "./Components/DivisaoPequena";
import HeaderNu from "./Components/Header";
import MainBank from "./Components/MainBank/MainBank";
import CarrousellOptions from "./Components/MainBank/CarousellNu";
import PartesSeparadasComponents from "./Components/MainBank/PartesSeparadasGenerics/PartesSeparadas";
import PedirCartaoDeCredito from "./Components/MainBank/ComponentesGenericos/PedirCartaoDeCredito";
import CartoesMenuOption from "./Components/MainBank/CartoesNu";
import { Smartphone } from "lucide-react";
import ProtectedRoute from "./protected-route";

export default function Home() {
  const [isVisibleEyes, setIsVisibleEyes] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [cpf, setCpf] = useState<string>("91919191919"); // Nome do usuário

  // Memoiza a função para evitar recriação desnecessária
  const setEyesFunction = useCallback(() => {
    setIsVisibleEyes((prev) => !prev);
  }, []);

  const fetchUser = async () => {
    const res = await fetch("/api/user", {
      method: "POST", // Método POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo
      },
      body: JSON.stringify({ cpf }), // Envia o CPF como JSON
    });

    if (!res.ok) {
      console.error("Erro ao buscar usuário");
      return;
    }

    const data = await res.json();
    if (data) {
      setUser(data); // Atualiza o estado com os dados do usuário
    } else {
      setUser(null); // Se não houver dados, zera o estado
    }
  };

  // Faz a requisição uma única vez ao carregar o componente
  const [isUserFetched, setIsUserFetched] = useState(false);

  if (!isUserFetched && !user) {
    fetchUser();
    setIsUserFetched(true); // Impede que a requisição seja feita novamente
  }

  return (
      <ProtectedRoute>
    <div className="flex flex-col">
      {user && (
        <div>
            <HeaderNu User={user} setEyesFunction={setEyesFunction} isVisibleEyes={isVisibleEyes} />
            <DivisaoPequena />
            <MainBank User={user} isVisibleEyes={isVisibleEyes}>
              <CartoesMenuOption href="/cartoes" icon={<Smartphone />} text="Meus Cartões" />
              <CarrousellOptions />
            </MainBank>
            <DivisaoPequena />
            <PartesSeparadasComponents>
              <PedirCartaoDeCredito />
            </PartesSeparadasComponents>
        </div>
      )}
    </div>
      </ProtectedRoute>
  );
}
