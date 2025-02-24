import { Copy } from "lucide-react";
import DivisaoPequena from "../../DivisaoPequena";


interface MaisDadosBancProps {
    isOneLiner?: boolean
    text: string | undefined
    value?: string | number
}

const MaisDadosBanc = ({ text, value, isOneLiner }: MaisDadosBancProps) => {


    if (isOneLiner) {
        return (
            <div className="mb-1">
                <div className="w-full rounded-lg">
                    <div className="flex flex-col gap-2">
                        {/* Container principal dos dados */}
                        <div className="flex justify-between items-start">
                            {/* Dados à esquerda */}
                            <div className="flex flex-col items-start">
                                <span className="text-md text-white">{text}</span>
                            </div>
                            {/* Botão de copiar à direita */}
                            <div className="flex flex-col items-end gap-2">
                                <button className="p-1 hover:bg-gray-800 rounded-full">
                                    <Copy className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wrapper para "anular" o padding do container */}
                <div className="mt-2">
                    <DivisaoPequena ignorePadding />
                </div>
            </div>
        )
    }

    return (
        <div className="mb-1">
            <div className="w-full rounded-lg">
                <div className="flex flex-col gap-2">
                    {/* Container principal dos dados */}
                    <div className="flex justify-between items-start">
                        {/* Dados à esquerda */}
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-zinc-300">{text}</span>
                            <span className="text-white">{value}</span>
                        </div>
                        {/* Botão de copiar à direita */}
                        <div className="flex flex-col items-end gap-2">
                            <button className="p-1 hover:bg-gray-800 rounded-full">
                                <Copy className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wrapper para "anular" o padding do container */}
            <div className="mt-2">
                <DivisaoPequena ignorePadding />
            </div>
        </div>
    );
}

export default MaisDadosBanc
    ;