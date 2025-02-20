"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { CreditCardIcon, HeartPulseIcon, ShieldCheckIcon } from "lucide-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const CarrousellOptions = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const items = [
        {
            href: "/MaterBankVidaSeguro",
            text: "MaterBank Vida: seguro a partir de R$ 4/mês",
            icon: <HeartPulseIcon height={28} width={28} className="text-white" />,
        },
        {
            href: "/MaterBankCartaoCredito",
            text: "Cartão MaterBank: zero anuidade e cashback",
            icon: <CreditCardIcon height={28} width={28} className="text-white" />,
        },
        {
            href: "/MaterBankProtecaoSeguro",
            text: "Proteção MaterBank: mais segurança para você",
            icon: <ShieldCheckIcon height={28} width={28} className="text-white" />,
        },
    ];

    // Animação suave do carrossel
    const [{ x }, setX] = useSpring(() => ({
        x: 0,
        config: { tension: 280, friction: 30 },
    }));

    useEffect(() => {
        setX({ x: -activeIndex * 100 });
    }, [activeIndex, setX]);

    // Mudança automática dos slides
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) {
                setActiveIndex((prev) => (prev + 1) % items.length);
            }
        }, 3000); // Muda de slide a cada 3 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [isDragging, items.length]);

    const THRESHOLD = 50; // Aumentamos o threshold para evitar mudanças ao arrastar pouco

    // Funções para eventos de toque
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const moveX = e.touches[0].clientX - startX;
        setX({ x: -activeIndex * 100 + moveX / 3 });
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const moveX = e.changedTouches[0].clientX - startX;
        handleDragEnd(moveX);
    };

    // Funções para eventos de mouse
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const moveX = e.clientX - startX;
        setX({ x: -activeIndex * 100 + moveX / 3 });
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const moveX = e.clientX - startX;
        handleDragEnd(moveX);
    };

    // Função comum para finalizar o arrasto (toque ou mouse)
    const handleDragEnd = (moveX: number) => {
        if (Math.abs(moveX) > THRESHOLD) {
            if (moveX > 0) {
                setActiveIndex((prev) => Math.max(prev - 1, 0)); // Retrocede um slide
            } else {
                setActiveIndex((prev) => Math.min(prev + 1, items.length - 1)); // Avança um slide
            }
        } else {
            // Se não ultrapassar o threshold, volta para o slide atual
            setX({ x: -activeIndex * 100 });
        }
        setIsDragging(false);
    };

    return (
        <div>
            {/* Carrossel */}
            <div className="w-full  mt-3 mb-4">
                <Carousel className="relative">
                    <CarouselContent
                        as={animated.div}
                        style={{ transform: x.to((val) => `translateX(${val}%)`) }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={() => setIsDragging(false)} // Cancela o arrasto se o mouse sair do carrossel
                    >
                        {items.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className=" justify-center  flex shrink-0 w-full"
                            >
                                <Link href={item.href} className="w-screen max-w-lg">
                                    <div className="bg-zinc-800 w-full h-20 rounded-3xl flex justify-between items-center p-4">
                                        <p className="text-white">{item.text}</p>
                                        {item.icon}
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Indicadores (Bolinhas) */}
                <div className="flex justify-center mt-3 gap-2">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? "bg-white scale-110" : "bg-gray-500"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarrousellOptions;