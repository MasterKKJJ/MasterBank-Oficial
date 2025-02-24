"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null || isAuthenticated === false) {

    return (
      <div className="fullscreen-loader">
        <div className="loader"></div>
      </div>
    );
  }

  return <>{isAuthenticated ? children : null}</>;
}
