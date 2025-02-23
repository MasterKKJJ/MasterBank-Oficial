


import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Ban, Bell, Bolt, CornerDownLeft, Landmark, MailQuestion, Plus, ShieldQuestion, Smartphone, UserPlus, UserRoundPen } from "lucide-react";
import Image from "next/image";
import ProfileNotificationMais from "./ProfileMaisNotification";
import Link from "next/link";
import DivisaoPequena from "../../DivisaoPequena";
import CartoesMenuOption from "../../MainBank/CartoesNu";
import { Bank, User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ProfileNotificationProp {
    User: User | undefined
    Bank: Bank | undefined

}
const ProfileNotification = ({ User, Bank }: ProfileNotificationProp) => {
    const router = useRouter();

    const handleLogout = async () => {


        await fetch("/api/logout", { method: "POST", credentials: "include" });
        // Exemplo de logout
        localStorage.removeItem('nu-user');
        localStorage.removeItem('nu-bank');

        router.push("/login"); // redireciona para a página de login
    };

    // console.log(User?.conta)
    return (

        <Sheet >
            <SheetTrigger>
                <Image

                    src="/fotopadrao.png"
                    height={60}
                    width={60}
                    className="rounded-full"
                    alt="foto padrao"

                />
            </SheetTrigger>

            <SheetContent className="w-full h-[600px] bg-black " side={"bottom"}>
                <SheetHeader>
                    <SheetTitle className="text-white">

                        <div className="flex min-w-full justify-between">
                            <div>
                            </div>
                            <div className="flex gap-4">
                                <MailQuestion />
                                <Bolt />
                                <Bell />
                            </div>
                        </div>
                    </SheetTitle>
                    <SheetDescription asChild className="text-white select-none">
                        <div className="text-start ">
                            <div className="flex flex-row items-center gap-3" >
                                <UserRoundPen width={32} height={32} />
                                <div>
                                    <span className="justify-start items-start flex font-medium -tracking-tighter">{User?.primary_name}</span>
                                    <span className="justify-start items-start text-[13px] flex gap-1 text-zinc-300">
                                        {Bank?.agency}
                                        <span>&bull;&nbsp;</span>
                                        Conta {Bank?.conta}
                                    </span>
                                </div>
                                <ProfileNotificationMais Bank={Bank} />
                            </div>

                            <div className="mt-4 text-xs -mx-6 bg-purple-900">
                                <div className="pl-4 p-1 text-zinc-100 flex items-center gap-3">
                                    <ShieldQuestion width={20} height={20} />
                                    <span className="tracking-wider">Essa tela mudou. <Link className="underline" href="Ajuda">Entenda aqui </Link></span>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-col gap-2">
                                <div className="mt-2">
                                    <span className="text-xs tracking-wider">Outras Contas</span>
                                </div>
                                <div className="flex flex-row items-center  justify-between" >
                                    <div className="flex flex-row items-center gap-3 ">
                                        <Plus width={32} height={32} className="bg-purple-700 rounded-full items-center text-purple-200" /> <div>
                                            <span className="justify-start items-start flex font-medium text-[13px] -tracking-tighter">Abrir Conta Pj</span>
                                            <span className="justify-start items-start flex gap-1 text-[12px] text-zinc-300">
                                                Crie a conta da sua empresa
                                            </span>
                                        </div>
                                    </div>
                                    <span className="bg-purple-900 rounded-xl flex justify-center items-center px-2">
                                        <div className=" text-sm">
                                            Conheça
                                        </div>
                                    </span>
                                </div>
                                <DivisaoPequena ignorePadding />
                                <CartoesMenuOption href="/openfinance" icon={<Landmark />} text="Open Finance" />
                                <CartoesMenuOption href="/convidaramigos" icon={<UserPlus />} text="Convidar Amigos" />
                                <DivisaoPequena ignorePadding />

                                <div onClick={() => handleLogout()} className="flex cursor-pointer justify-center gap-3 p-2 items-center bg-zinc-800 rounded-full">
                                    <CornerDownLeft />
                                    <span > Sair do Aplicativo</span>
                                </div>
                            </div>


                        </div>

                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    );
}

export default ProfileNotification;