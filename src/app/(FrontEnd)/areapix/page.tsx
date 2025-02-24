"use client"
import { ChevronRight, CircleHelp, Logs, Mic, Shield, X } from "lucide-react";
import { useRouter } from "next/navigation";
import DivisaoPequena from "../Components/DivisaoPequena";
import AreaPixOptions from "./areadepixreal";
const PagePixAreaUser = () => {

    const router = useRouter();

    return (
        <div>
            <header className="flex justify-between py-4 px-2">
                <div>
                    <X height={20} width={20} className="cursor-pointer" onClick={() => router.back()} />
                </div>
                <div>
                    <CircleHelp height={20} width={20} />
                </div>
            </header>
            <main>
                <div className="mx-4 mt-2 gap-4 flex flex-col">
                    <div>
                        <h1 className="text-xl font-medium">Área Pix</h1>
                        <p className="text-gray-400 ">Envie e receba pagamentos a qualquer hora e dia da semana, sem pagar nada por isso.</p>
                    </div>
                    <div className="w-full p-2 bg-purple-900 rounded-full justify-between flex">
                        <p className="mx-3 text-md text-md font-medium text-purple-200">Digite tudo: chave e valor</p>
                        <p className="mx-3 flex items-center justify-center"><Mic width={20} height={20} /></p>
                    </div>
                    <DivisaoPequena ignorePadding />
                    {/* Área de Pix realmente  */}
                    <AreaPixOptions />
                    <div>
                        <DivisaoPequena ignorePadding />
                        <DivisaoPequena ignorePadding />
                    </div>

                    <div>
                        <div>
                            <p className="text-md text-gray-400">Preferências</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-3 ">
                            <div className="flex justify-between items-center  cursor-pointer">

                                <div className="flex gap-3">
                                    <Shield />
                                    <p className="text-[15px] font-medium tracking-wide">Registrar ou trazer chaves</p>
                                </div>
                                <ChevronRight height={16} width={16} />

                            </div>
                            <DivisaoPequena ignorePadding />
                            <div className="flex justify-between items-center">

                                <div className="flex gap-3">
                                    <Logs />
                                    <p className="text-[15px] font-medium tracking-wide">Meus limites Pix</p>
                                </div>
                                <ChevronRight height={16} width={16} />

                            </div>
                            <DivisaoPequena ignorePadding />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default PagePixAreaUser;