
import Link from "next/link";
import { ReactElement } from "react";
interface CartoesMenuOptionProps {
    href: string
    icon: ReactElement
    text: string
}
const CartoesMenuOption = ({ href, icon, text }: CartoesMenuOptionProps) => {
    return (
        <div>
            <Link href={href} className="flex items-center  text-center mt-3">
                <div className="bg-zinc-800 w-screen h-16 rounded-3xl flex flex-row items-center">
                    <div className="p-5 flex">
                        {icon}
                        <p className="ml-4">{text}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
export default CartoesMenuOption;