import { ChevronRight } from "lucide-react";
import BankAreasPadroes from "./BankAreasPadroes";
import Link from "next/link";
import PartesSeparadasComponents from "./PartesSeparadasGenerics/PartesSeparadas";
import { BalanceUser, User } from "@prisma/client";
interface MainBankProps {
    children?: React.ReactNode;
    isVisibleEyes: boolean;
    User: User | undefined;
    balanceuser: BalanceUser | undefined
}

const MainBank = ({ children, isVisibleEyes, User, balanceuser }: MainBankProps) => {
    // Garantir que balance.money_amount seja seguro
    
    // const moneyAmount = User?.balance?.money_amount || '****';
    

    return (
        <PartesSeparadasComponents>
            <Link href="InformacoesDaConta" className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <p className="tracking-wide text-lg font-medium">Conta</p>
                    <ChevronRight width={16} height={16} />
                </div>
                <div>
                    <p className="text-lg font-normal">
                        {isVisibleEyes ? balanceuser?.balance : '****'}
                    </p>
                </div>
            </Link>
            <div className="mt-6">
                <BankAreasPadroes />
                {children}
            </div>
        </PartesSeparadasComponents>
    );
}

export default MainBank;
