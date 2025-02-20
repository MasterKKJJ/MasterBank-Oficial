import Link from "next/link";
import { ReactElement } from "react";
interface CaixinhasNubakOptionsProps {
    icon: ReactElement
    text: string,
    href?: string

}
const CaixinhasNubakOptions = ({ icon, text, href = "" }: CaixinhasNubakOptionsProps) => {
    return (
        <Link className="w-20 flex flex-col items-center gap-1 text-center" href={href}>
            <div className="bg-zinc-800 rounded-full w-16 h-16 flex items-center justify-center">
                {icon}
            </div>
            <p className="text-sm leading-tight break-words">{text}</p>
        </Link>
    );
}
export default CaixinhasNubakOptions;