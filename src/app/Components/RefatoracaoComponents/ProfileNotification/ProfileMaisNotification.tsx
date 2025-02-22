"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Share2 } from "lucide-react";
import MaisDadosBanc from "./DadosMais";
import { Bank } from "@prisma/client";

interface ProfileNotificationMaisProps {
    Bank: Bank | undefined
}

const ProfileNotificationMais = ({Bank}:ProfileNotificationMaisProps) => {
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
                            <MaisDadosBanc text="Agência" value={Bank?.agency} />
                            <MaisDadosBanc text="Conta" value={Bank?.conta} />
                            <MaisDadosBanc text="Banco" value={Bank?.bankNumber} />
                            <MaisDadosBanc text={Bank?.name} isOneLiner />
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default ProfileNotificationMais;
