"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Share2 } from "lucide-react";
import MaisDadosBanc from "./DadosMais";

const ProfileNotificationMais = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <span className="text-xs font-semibold tracking-wider text-purple-500">Mais</span>
            </SheetTrigger>

            <SheetContent className="w-full h-[500px] bg-black" side={"bottom"}>
                <SheetHeader>
                    <SheetTitle className="text-white">
                        <div className="flex min-w-full justify-between ">
                            <div></div>
                            <div className="flex">
                                <Share2 />
                            </div>
                        </div>
                    </SheetTitle>
                    <SheetDescription asChild className="text-white">
                        <div className="flex flex-col justify-start gap-2 items-start">
                            <div>
                                <span className="text-xs">Dados bancários</span>
                            </div>
                            <MaisDadosBanc text="Agência" value="0001" />
                            <MaisDadosBanc text="Conta" value="999999999-9" />
                            <MaisDadosBanc text="Banco" value="9191" />
                            <MaisDadosBanc text="Bank Master Pagamentos - Instituição de Pagamento" isOneLiner />
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default ProfileNotificationMais;
