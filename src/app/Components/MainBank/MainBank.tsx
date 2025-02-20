import { ChevronRight } from "lucide-react";
import BankAreasPadroes from "./BankAreasPadroes";
import Link from "next/link";
import PartesSeparadasComponents from "./PartesSeparadasGenerics/PartesSeparadas";
interface MainBankProps {
    children?: React.ReactNode
    isVisibleEyes: boolean
}
const MainBank = ({ children, isVisibleEyes }: MainBankProps) => {
    return (
        //min-h-full

        <PartesSeparadasComponents>
            <Link href="InformacoesDaConta" className="flex flex-col ">
                <div className="flex flex-row justify-between">
                    <p className="tracking-wide text-lg font-medium">Conta</p>
                    <ChevronRight width={16} height={16} />
                </div>
                <div>
                    <p className="text-lg font-normal ">
                        {isVisibleEyes ? 'R$ 4.224,90' : '****'}

                    </p>

                </div>
            </Link >
            <div className="mt-6">
                <BankAreasPadroes />
                {children}
            </div>
        </PartesSeparadasComponents>


    );
}

export default MainBank;