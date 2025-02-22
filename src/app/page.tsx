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
import { BalanceUser, Bank, User } from "@prisma/client";
interface userInfo {
  id: string;
  primary_name: string;
  rest_of_name: string;
  password: string;
  cpf: string;
  email: string;
  phone: string;
  account_number: number;
}
export default function Home() {
  const [isVisibleEyes, setIsVisibleEyes] = useState<boolean>(true);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [bankinfo, setbankinfo] = useState<Bank | undefined>(undefined);
  const [balanceUser, setbalanceUser] = useState<BalanceUser | undefined>(undefined);
  // Memoiza a função para evitar recriação desnecessária
  const setEyesFunction = useCallback(() => {
    setIsVisibleEyes((prev) => !prev);
  }, []);

  const fetchUser = async () => {
    const res = await fetch("/api/infouser", {
      method: "POST", // Método POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo
      },
    });
    if (!res.ok) {
      return;
    }
    if (res.status === 400) {
      return
    }
    const dados: userInfo = await res.json().then((e) => e.dados)
    const bankres = await fetch("/api/infobank", {
      method: "POST", // Método POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo
      },
    });
    if (!bankres.ok) {
      console.error("Erro ao buscar usuário");
      return;
    }
    const bancodados = (await bankres.json().then(e => e.bank))
    const balanceres = await fetch("/api/balanceuser", {
      method: "POST", // Método POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo
      },
    });
    const dadosBalance: BalanceUser = await balanceres.json().then((e) => e.dados)
    console.log(dadosBalance)
    if (!balanceres.ok) {
      console.error("Erro ao buscar usuário");
      return;
    }
    if (dados && bancodados && dadosBalance) {
      setbankinfo(bancodados)
      setbalanceUser(dadosBalance)
      setUser(dados); // Atualiza o estado com os dados do usuário
    } else {
      setbankinfo(undefined)
      setbalanceUser(undefined)
      setUser(undefined); // Se não houver dados, zera o estado
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
      {user && (
        <div className="flex flex-col">
          <div>
            <HeaderNu User={user} Bank={bankinfo} setEyesFunction={setEyesFunction} isVisibleEyes={isVisibleEyes} />
            <DivisaoPequena />
            <MainBank balanceuser={balanceUser} isVisibleEyes={isVisibleEyes}>
              <CartoesMenuOption href="/cartoes" icon={<Smartphone />} text="Meus Cartões" />
              <CarrousellOptions />
            </MainBank>
            <DivisaoPequena />
            <PartesSeparadasComponents>
              <PedirCartaoDeCredito />
            </PartesSeparadasComponents>
          </div>

        </div>
      )}
    </ProtectedRoute>
  );
}
