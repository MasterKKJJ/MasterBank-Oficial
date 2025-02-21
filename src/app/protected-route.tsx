"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname(); 

  // 🔓 Rotas permitidas para usuários NÃO logados
  const publicRoutes = ["/login", "/register"];
  // 🔐 Rotas protegidas (somente para usuários logados)
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();

        if (res.ok && data.authenticated) {
          setIsAuthenticated(true);
          // Se estiver logado e tentar acessar uma rota pública, redireciona para o dashboard
          if (publicRoutes.includes(pathname)) {
            router.replace("/dashboard");
          }
        } else {
          setIsAuthenticated(false);
          // Se não estiver logado e tentar acessar uma rota protegida, redireciona para login
          if (protectedRoutes.includes(pathname)) {
            router.replace("/login");
          }
          router.replace("/login");
        }
      } catch {
        setIsAuthenticated(false);
        router.replace("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isAuthenticated === null) return <p>Carregando...</p>;

  // Renderiza o conteúdo protegido apenas se estiver autenticado
  return <>{isAuthenticated ? children : null}</>;
}
