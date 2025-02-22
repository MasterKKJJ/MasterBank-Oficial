"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [bankinfo, setBankInfo] = useState<Bank | undefined>(undefined);
  const [balanceUser, setBalanceUser] = useState<BalanceUser | undefined>(undefined);

  // Ref para evitar re-renderizações desnecessárias
  const isUserFetchedRef = useRef(false);

  // Função para alternar visibilidade dos olhos
  const setEyesFunction = useCallback(() => {
    setIsVisibleEyes((prev) => !prev);
  }, []);

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    try {
      const [resUser, resBank, resBalance] = await Promise.all([
        fetch("/api/infouser", { method: "POST", headers: { "Content-Type": "application/json" } }),
        fetch("/api/infobank", { method: "POST", headers: { "Content-Type": "application/json" } }),
        fetch("/api/balanceuser", { method: "POST", headers: { "Content-Type": "application/json" } }),
      ]);

      if (!resUser.ok || !resBank.ok || !resBalance.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }

      const { dados }: { dados: userInfo } = await resUser.json();
      const { bank: bancodados }: { bank: Bank } = await resBank.json();
      const { dados: dadosBalance }: { dados: BalanceUser } = await resBalance.json();

      if (dados && bancodados && dadosBalance) {
        setUser(dados);
        setBankInfo(bancodados);
        setBalanceUser(dadosBalance);
      } else {
        setUser(undefined);
        setBankInfo(undefined);
        setBalanceUser(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };



  const fetchBalance = async () => {
    try {
      const resBalance = await fetch("/api/balanceuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!resBalance.ok) {
        throw new Error("Erro ao buscar saldo do usuário");
      }

      const { dados: dadosBalance }: { dados: BalanceUser } = await resBalance.json();
      setBalanceUser(dadosBalance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchBalance, 3000);

    return () => clearInterval(interval); // Cleanup ao desmontar o componente
  }, []);

  // Dispara a requisição apenas uma vez
  useEffect(() => {
    
    if (!isUserFetchedRef.current) {
      fetchUserData();
      isUserFetchedRef.current = true;
    }
  }, []);

  return (
    <ProtectedRoute>
      {user && (
        <div className="flex flex-col">
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
      )}
    </ProtectedRoute>
  );
}
