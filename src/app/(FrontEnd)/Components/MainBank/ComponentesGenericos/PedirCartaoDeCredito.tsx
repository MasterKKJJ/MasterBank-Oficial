import { Button } from "@/components/ui/button";
import Link from "next/link";

const PedirCartaoDeCredito = () => {
    return (
        <div className="select-none">
            <div>
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">Cartão de crédito</h1>
                        <p className="text-zinc-400">
                            Peça seu cartão de crédito sem anuidade e tenha mais controle da sua vida financeira
                        </p>
                    </div>
                </div>

                {/* Uso de `asChild` para evitar aninhamento desnecessário */}
                <Button asChild className="bg-purple-700 rounded-full mt-2 hover:bg-purple-700">
                    <Link href="/pedircartao">Pedir cartão</Link>
                </Button>
            </div>
        </div>

    );
}

export default PedirCartaoDeCredito;