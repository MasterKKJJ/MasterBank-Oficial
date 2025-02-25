"use client";

import { EventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";

// Esquema de validação usando Zod
const loginSchema = z.object({
  cpf: z.union([
    z.string().regex(/^\d{11}$/, "CPF inválido"),
    z.string().email("E-mail inválido"),
    z.string().regex(/^\d{12,15}$/, "Número de telefone inválido"),
  ]),
  password: z.string().min(5, "A senha deve ter pelo menos 8 caracteres"),
});

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [SubmitForm, setSubmitForm] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        router.push("/");
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("bank");
        localStorage.removeItem("balanceUser");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async () => {
    setErrorMessage(""); // Limpa erro anterior
    setSubmitForm(true);

    // Validação com Zod
    const result = loginSchema.safeParse({ cpf, password });
    if (!result.success) {
      setErrorMessage(result.error.errors[0].message);
      setSubmitForm(false);
      return;
    }

    // Se a validação passar, envia para API
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, password }),
      credentials: "include",
    });

    const data = await res.json();
    setSubmitForm(false);
    if (res.ok) {
      router.push("/");
    } else {
      setErrorMessage(data.error);
    }
  };

  const submithandle = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const naoselecionar = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-black min-h-screen flex flex-col select-none">
      <header>
        <Image
          width={100}
          height={100}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUAAAD+/v77+/sTExO8vLx/f3+vr6/5+fnBwcHt7e1VVVXy8vKsrKxSUlLe3t4KCgq0tLTV1dV4eHjHx8cmJiZaWlrOzs40NDSdnZ3l5eUVFRVCQkKJiYmVlZVMTEzn5+c9PT02NjZwcHAhISEiIiKCgoLqEYxHAAADR0lEQVR4nO3abVeqQBSGYbBSVCR8S0uzsvr/f7FQwb2HvcrmHMFx3de3ZpjWfgRhHCaKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgKsyWCbZ42OWLOdtV3IWi3QYV4bpQnUO8jTtHuSf1vD7tJuWumkjFf9RGjtUlZ+yJ7HGP6nBzdT8F5u+GzCO+2/H/jvZcWv9h5uOOKLTVN0nm9TzFXWOqgNCTjhap8l2sk6nxlnsrMqjgk04SHrf9WT7PzZ5/UItDww04SDbldObVS21jGWYMBOWcdaibT6MtcNXMcSEH5l7Je7MnK/jeN8cYMJZdbKenY6ejrjZtQaY8Hiq3p2euU6Y7xrDS/hQFZPV+vTsZrhrCy6hKLhb79XX6cAZEEZCcce8q/cuVcJl0RRawmf3FGnvKuG0aAot4YsoZmH0j2Wel6IlsIQrWa57Ky3Icxz3ipbAEj7Hx2o6N8YBA3WZFpO6wBIm8gzdGwc8yWrj1yi4hJmoxUwYqalbMTUNLKGcXdsJ5WcQF8tSgSWU1doJ1c10G11hwgd5yPUnnEROQnOt7WITdsyE039M2PZqokpoPQ91wmLmSsIrSzi1hoSeUC0ZX0NCOa87MeG9+t181vp/55FwKxserCFXlXBsDVEJL+p5eFpCtQBXX7yKnITDs9b/O4+EI9nQt4aohOZn0CCPhK9qzJMxRCU0n5gN+j3hrZtwJhvikTFEPC067jp64zwSRuppZwVQC3Qr44Am+SSUy3PmzXQh+l/OWv4JfBKqWY61QCdXr9q+SL0SGuvgmpi5tv2s8EuoFxh79SGpM6BVPgkj/XK4viXouHhlTuqa5ZXQecXv7gv7qHrM+UDDvBJudEKxvWGnehEwnBn/r2leCfUK4/ep0knKNeTHSwjomVBNTYuTJd/LrQ+NeQPln8AvoW4sHF8fH7Y3jI2Xka3wTBjV9oV1uocZanEj7SWXks8/4UpNTvf60+V6sk3StTUbb41vwmhkRIz3S8aXxTth9GZtQ237h4RBFWj9mtW/gNWm55+3El+KrpCa5/AuPx6R6xvIovvDdvBrMS+39F/OzRMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4L74AZhIf31/GqBEAAAAASUVORK5CYII="
          alt="Image MasterBank"

          onDragStart={naoselecionar} // <- Bloqueia tentativa de arrasto
        />
      </header>
      <main className="flex-1 flex items-center justify-center w-screen">
        <div className="flex flex-col justify-center h-[250px] w-[350px]">
          <h1 className="text-white text-[28px] mb-5 tracking-wider font-medium">
            Acesse o MasterBank
          </h1>
          <div className="text-gray-400">
            <div className="flex flex-col gap-4 w-[300]">
              <div>
                <label htmlFor="cpf" className="text-[16px] font-semibold">
                  CPF / E-mail / Telefone
                </label>
                <input
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  onKeyDown={submithandle}
                  className="bg-transparent outline-none mt-2 border-0 border-b border-b-gray-500 w-full"
                />
              </div>
              <div>
                <label htmlFor="senha" className="text-[16px] font-semibold">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={submithandle}
                  className="bg-transparent outline-none border-0 mt-2 border-b border-b-gray-500 w-full"
                />
              </div>
              <p className="text-xs">Use a senha de acesso ao app, com 8 letras e/ou números</p>

              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

              <div className="mt-2">
                <p className="text-purple-500 text-sm p-4 w-max font-bold">Esqueci a senha</p>
              </div>

              <div className="items-center flex justify-center rounded-full">
                <button
                  onClick={handleLogin}
                  disabled={SubmitForm}
                  className={`font-semibold tracking-tight w-screen py-3 ${SubmitForm ? "bg-zinc-900/50 cursor-not-allowed" : "bg-purple-600"
                    } text-white rounded-full`}
                >
                  Acessar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-8 bg-zinc-800/90">
        <div className="text-purple-400 flex justify-between mx-16">
          <h1 className="text-md font-semibold">Não sou cliente</h1>
          <h1 className="text-md font-semibold">Me Roubaram</h1>
        </div>
      </footer>
    </div>
  );
}
