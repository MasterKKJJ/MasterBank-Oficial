import { Barcode, DollarSign, HandCoins, Smartphone, Flower } from "lucide-react";
import CaixinhasNubakOptions from "../RefatoracaoComponents/CaixinhasOpcoesNu";
const BankAreasPadroes = () => {
    return (
        <div className="flex gap-3">
            <CaixinhasNubakOptions icon={<DollarSign />} text="Área Pix e Transferir" />
            <CaixinhasNubakOptions icon={<Barcode />} text="Pagar" />
            <CaixinhasNubakOptions icon={<HandCoins />} text="Pegar emprestado" />
            <CaixinhasNubakOptions icon={<Smartphone />} text="Recarga de Celular" />
            <CaixinhasNubakOptions icon={<Flower />} text="Caixinhas e Investir" />
        </div>
    );
};
export default BankAreasPadroes;
