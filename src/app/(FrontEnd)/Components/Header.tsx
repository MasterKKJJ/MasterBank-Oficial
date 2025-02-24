import { ArrowDownFromLine, ArrowUpFromLine, Ban, CircleHelp, EyeClosed, EyeIcon, MailQuestion } from "lucide-react";
import ProfileNotification from "./RefatoracaoComponents/ProfileNotification/ProfileNotification";
import {  Bank, User } from "@prisma/client";
import { useCallback, useState } from "react";
//select-none usamos para nao selecionar texto!
interface HeaderNuProps {
    setEyesFunction?: () => void; // Corrigido: deve ser uma função
    
    oldMasterBankToggle?: () => void; // Corrigido: deve ser uma função
    isVisibleEyes?: boolean; // Estado que controla a visibilidade dos olhos
    User: User | undefined
    Bank: Bank | undefined
}

const HeaderNu = ({ User, Bank, setEyesFunction = () => { } , isVisibleEyes = false }: HeaderNuProps) => {
    
      const [oldMasterBank, setoldMasterBank] = useState<boolean>(false);
      const oldMasterBankToggle = useCallback(() => {
        setoldMasterBank((prev: any) => !prev);
      }, []);
    
    return (
        <div>
            <div >
                <div className="p-5 bg-purple-900">
                    <div className="items-center justify-between flex">
                        <div>
                            <ProfileNotification User={User} Bank={Bank} />
                        </div>
                        <div className="flex flex-row gap-9 items-center">


                        {oldMasterBank ? (
                                <ArrowUpFromLine
                                    height={24}
                                    width={24}
                                    onClick={oldMasterBankToggle} // Chama a função ao clicar
                                    className="cursor-pointer" // Adiciona cursor pointer
                                />
                            ) : (
                                <ArrowDownFromLine
                                    height={24}
                                    width={24}
                                    onClick={oldMasterBankToggle} // Chama a função ao clicar
                                    className="cursor-pointer" // Adiciona cursor pointer
                                />
                            )}

                            {/*
                                EyeIcon é o olho aberto
                                EyeClosed é o olho fechado
                            */}
                            {isVisibleEyes ? (
                                <EyeClosed
                                    height={28}
                                    width={28}
                                    onClick={setEyesFunction} // Chama a função ao clicar
                                    className="cursor-pointer" // Adiciona cursor pointer
                                />
                            ) : (
                                <EyeIcon
                                    height={28}
                                    width={28}
                                    onClick={setEyesFunction} // Chama a função ao clicar
                                    className="cursor-pointer" // Adiciona cursor pointer
                                />
                            )}
                            
                            <CircleHelp height={28} width={28} className="cursor-pointer" />
                            <MailQuestion height={28} width={28} className="cursor-pointer" />
                        </div>
                    </div>

                    {oldMasterBank ? (
                        <div className="p-5 pl-3 pb-0 mt-7 mb-3">
                            <p className="font-medium text-lg select-none">Olá, {User?.primary_name}</p>
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>
    );
};
export default HeaderNu;