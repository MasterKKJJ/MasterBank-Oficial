"use client"
import { Barcode, DollarSign, HandCoins, Smartphone, Flower } from "lucide-react";
import CaixinhasNubakOptions from "../Components/RefatoracaoComponents/CaixinhasOpcoesNu";
import { useRef, useState } from "react";
const AreaPixUser = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        e.preventDefault(); // Impede comportamento padrão
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!scrollRef.current || !isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Ajusta a velocidade do arraste
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isDragging) {
            e.preventDefault(); // Impede o clique nos links
            e.stopPropagation(); // Evita que o evento se propague
        }
    };

    return (
        <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none"
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            <div className="flex gap-3 min-w-max" onClick={handleClick}>
                <CaixinhasNubakOptions icon={<DollarSign />} href="/areapix" text="Área Pix e Transferir" />
                <CaixinhasNubakOptions icon={<Barcode />} text="Pagar" />
                <CaixinhasNubakOptions icon={<HandCoins />} text="Pegar emprestado" />
                <CaixinhasNubakOptions icon={<Smartphone />} text="Recarga de Celular" />
                <CaixinhasNubakOptions icon={<Flower />} text="Caixinhas e Investir" /><CaixinhasNubakOptions icon={<DollarSign />} href="/areapix" text="Área Pix e Transferir" />
                <CaixinhasNubakOptions icon={<Barcode />} text="Pagar" />
                <CaixinhasNubakOptions icon={<HandCoins />} text="Pegar emprestado" />
                <CaixinhasNubakOptions icon={<Smartphone />} text="Recarga de Celular" />
                <CaixinhasNubakOptions icon={<Flower />} text="Caixinhas e Investir" /><CaixinhasNubakOptions icon={<DollarSign />} href="/areapix" text="Área Pix e Transferir" />
                <CaixinhasNubakOptions icon={<Barcode />} text="Pagar" />
                <CaixinhasNubakOptions icon={<HandCoins />} text="Pegar emprestado" />
                <CaixinhasNubakOptions icon={<Smartphone />} text="Recarga de Celular" />
                <CaixinhasNubakOptions icon={<Flower />} text="Caixinhas e Investir" /><CaixinhasNubakOptions icon={<DollarSign />} href="/areapix" text="Área Pix e Transferir" />
                <CaixinhasNubakOptions icon={<Barcode />} text="Pagar" />
                <CaixinhasNubakOptions icon={<HandCoins />} text="Pegar emprestado" />
                <CaixinhasNubakOptions icon={<Smartphone />} text="Recarga de Celular" />
                <CaixinhasNubakOptions icon={<Flower />} text="Caixinhas e Investir" />
            </div>
        </div>
    );
};
export default AreaPixUser;
