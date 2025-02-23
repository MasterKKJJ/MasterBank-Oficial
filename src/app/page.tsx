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
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const [isVisibleEyes, setIsVisibleEyes] = useState<boolean>(true);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [bankinfo, setBankInfo] = useState<Bank | undefined>(undefined);
    const [balanceUser, setBalanceUser] = useState<BalanceUser | undefined>(undefined);

    const isUserFetchedRef = useRef(false);

    const setEyesFunction = useCallback(() => {
        setIsVisibleEyes((prev) => !prev);
    }, []);
    const fetchUserData = async () => {
        try {
            // Verificar dados no localStorage
            const storedUser = localStorage.getItem('nu-user');
            const storedBank = localStorage.getItem('nu-bank');

            if (storedUser && storedBank) {
                setUser(JSON.parse(storedUser));
                setBankInfo(JSON.parse(storedBank));
            } else {
                const [resUser, resBank] = await Promise.all([
                    fetch("/api/infouser", { method: "POST" }),
                    fetch("/api/infobank", { method: "POST" }),
                ]);

                if (!resUser.ok || !resBank.ok) {
                    router.push('login');
                    return;
                }

                const { dados: userData } = await resUser.json();
                const { bank: bankData } = await resBank.json();

                if (userData && bankData) {
                    // Salvar no localStorage
                    localStorage.setItem('nu-user', JSON.stringify(userData));
                    localStorage.setItem('nu-bank', JSON.stringify(bankData));
                    setUser(userData);
                    setBankInfo(bankData);
                } else {
                    // Exemplo de logout
                    localStorage.removeItem('nu-user');
                    localStorage.removeItem('nu-bank');

                    router.push('login');
                }
            }
        } catch (error) {
            console.error(error);
            router.push('login');
        }
    };
    const fetchBalance = async () => {
        try {
            const resBalance = await fetch("/api/balanceuser", { method: "POST" });

            if (!resBalance.ok) {
                router.push('login');
                return;
            }

            const { dados: balanceData } = await resBalance.json();
            setBalanceUser(balanceData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        // Atualizar saldo imediatamente e a cada 3 segundos
        fetchBalance();
        const interval = setInterval(fetchBalance, 3000);
        return () => clearInterval(interval);
    }, []);

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