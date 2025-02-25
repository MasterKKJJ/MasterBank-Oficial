"use client";

import { useEffect, useState } from "react";
import { Banknote, Bolt, ChevronLeft, Info, X } from "lucide-react";
import DivisaoPequena from "../Components/DivisaoPequena";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/app/protected-route";
import { useRouter } from "next/navigation";

interface Notification {
    id: string;
    title: string;
    content: string;
}

export default function Home() {

    const router = useRouter();
    const [notifications, setnotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notificacao", { method: "POST" });

            if (!res.ok) {
                router.push('login');
                return;
            }

            const { dados } = await res.json(); // Ajuste no nome de `dados`
            console.log(dados);
            setnotifications(dados);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000); // Atualizando a cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    async function voltar() {
        router.back()
    }



    return (
        <ProtectedRoute>
            <div className="relative  font-ubuntu bg-black">
                {/* Cabeçalho */}
                <div className="my-3 px-2 flex justify-between">
                    <ChevronLeft height={22} width={22} className="text-zinc-100 cursor-pointer" onClick={() => voltar()} />
                    <Bolt height={22} width={22} className="text-zinc-100" />
                </div>

                {/* Lista de Notificações */}
                {notifications.length > 0 ? (

                    notifications.map((notification) => (
                        <div key={notification.id}>
                            <div
                                className="p-4 flex gap-4 items-center cursor-pointer hover:bg-zinc-900 transition rounded-md"
                                onClick={() => setSelectedNotification(notification)}
                            >
                                <div className="h-11 w-11 flex bg-zinc-900 rounded-full justify-center items-center text-zinc-100">
                                    <Banknote />
                                </div>

                                <div>
                                    <h1 className="text-lg font-medium text-zinc-100">{notification.title}</h1>
                                    <h3 className="text-sm text-zinc-300">{notification.content}</h3>
                                </div>
                            </div>
                            <DivisaoPequena />
                        </div>

                    ))

                ) : (
                    <div >
                        <div
                            className="p-4 flex gap-4 items-center cursor-pointer hover:bg-zinc-900 transition rounded-md"

                        >
                            <div className="h-11 w-11 flex bg-zinc-900 rounded-full justify-center items-center text-zinc-100">
                                <Info />
                            </div>

                            <div>
                                <h1 className="text-lg font-medium text-zinc-100">Não Há Notificações</h1>
                                <h3 className="text-sm text-zinc-300">:)</h3>
                            </div>
                        </div>
                        <DivisaoPequena />
                    </div>
                )}

                {/* Card de Detalhes - Nova Versão */}
                <AnimatePresence>
                    {selectedNotification && (
                        <motion.div
                            key="detail-panel"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 3 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed top-0 left-0 h-full w-screen pointer-events-none"
                        >
                            <div className="relative h-full w-screen bg-black backdrop-blur-lg p-4 shadow-xl pointer-events-auto">
                                <button
                                    onClick={() => setSelectedNotification(null)}
                                    className="text-zinc-400 hover:text-zinc-100 transition-colors absolute top-4 right-4"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold text-zinc-100">
                                        {selectedNotification.title}
                                    </h2>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-zinc-300 leading-relaxed">
                                        {selectedNotification.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ProtectedRoute>
    );
}
