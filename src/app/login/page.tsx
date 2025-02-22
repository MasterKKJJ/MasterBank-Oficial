"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorPassword, setErrorPassword] = useState(""); 
  const [SubmitForm, setSubmitForm] = useState<boolean>(false); 
  const router = useRouter();

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        router.push("/"); // Redireciona se estiver autenticado
      }
    };
      console.log("Teste")
    checkAuth();
  }, [router]);

  const handleLogin = async () => {
    setSubmitForm(true)
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, password }),
      credentials: "include", // Permite enviar cookies na requisição
    });

    const data = await res.json();
    setSubmitForm(false)
    if (res.ok) {
      router.push("/"); // Redireciona após login
    } else {
      alert(data.error);
    }
  };


  const submithandle = async (e: KeyboardEvent) =>{
    if(e.key === "Enter"){
      handleLogin();
      
      
    }
  }
  
  

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <header className="">
        <Image
          width={100}
          height={100}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUAAAD+/v77+/sTExO8vLx/f3+vr6/5+fnBwcHt7e1VVVXy8vKsrKxSUlLe3t4KCgq0tLTV1dV4eHjHx8cmJiZaWlrOzs40NDSdnZ3l5eUVFRVCQkKJiYmVlZVMTEzn5+c9PT02NjZwcHAhISEiIiKCgoLqEYxHAAADR0lEQVR4nO3abVeqQBSGYbBSVCR8S0uzsvr/f7FQwb2HvcrmHMFx3de3ZpjWfgRhHCaKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgKsyWCbZ42OWLOdtV3IWi3QYV4bpQnUO8jTtHuSf1vD7tJuWumkjFf9RGjtUlZ+yJ7HGP6nBzdT8F5u+GzCO+2/H/jvZcWv9h5uOOKLTVN0nm9TzFXWOqgNCTjhap8l2sk6nxlnsrMqjgk04SHrf9WT7PzZ5/UItDww04SDbldObVS21jGWYMBOWcdaibT6MtcNXMcSEH5l7Je7MnK/jeN8cYMJZdbKenY6ejrjZtQaY8Hiq3p2euU6Y7xrDS/hQFZPV+vTsZrhrCy6hKLhb79XX6cAZEEZCcce8q/cuVcJl0RRawmf3FGnvKuG0aAot4YsoZmH0j2Wel6IlsIQrWa57Ky3Icxz3ipbAEj7Hx2o6N8YBA3WZFpO6wBIm8gzdGwc8yWrj1yi4hJmoxUwYqalbMTUNLKGcXdsJ5WcQF8tSgSWU1doJ1c10G11hwgd5yPUnnEROQnOt7WITdsyE039M2PZqokpoPQ91wmLmSsIrSzi1hoSeUC0ZX0NCOa87MeG9+t181vp/55FwKxserCFXlXBsDVEJL+p5eFpCtQBXX7yKnITDs9b/O4+EI9nQt4aohOZn0CCPhK9qzJMxRCU0n5gN+j3hrZtwJhvikTFEPC067jp64zwSRuppZwVQC3Qr44Am+SSUy3PmzXQh+l/OWv4JfBKqWY61QCdXr9q+SL0SGuvgmpi5tv2s8EuoFxh79SGpM6BVPgkj/XK4viXouHhlTuqa5ZXQecXv7gv7qHrM+UDDvBJudEKxvWGnehEwnBn/r2leCfUK4/ep0knKNeTHSwjomVBNTYuTJd/LrQ+NeQPln8AvoW4sHF8fH7Y3jI2Xka3wTBjV9oV1uocZanEj7SWXks8/4UpNTvf60+V6sk3StTUbb41vwmhkRIz3S8aXxTth9GZtQ237h4RBFWj9mtW/gNWm55+3El+KrpCa5/AuPx6R6xvIovvDdvBrMS+39F/OzRMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4L74AZhIf31/GqBEAAAAASUVORK5CYII="
          alt="Image MasterBank"
        />
      </header>
      <main className="flex-1 flex items-center justify-center w-screen">
        <div className="flex flex-col  justify-center h-[250px] w-[350px] ">
          <h1 className="text-white text-[28px] mb-5 tracking-wider font-medium">Acesse o MasterBank</h1>
          <div className="text-gray-400">
            <div className="flex flex-col gap-4 w-[300]">
              <div className="">
                <label htmlFor="cpf" className="text-[16px] font-semibold">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  onKeyDown={(e )=> submithandle(e)}
                  className="bg-transparent outline-none mt-2 border-0 border-b border-b-gray-500 w-full"
                  />
              </div>
              <div >
                <label htmlFor="senha" className="text-[16px] font-semibold">Senha</label>
                <input
                  type="password"
                  id="senha"
                  value={password}
                  onKeyDown={(e )=> submithandle(e)}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none border-0 mt-2  border-b border-b-gray-500 w-full"
                />
              </div>
              
              <div>
                <p className="text-xs">Use a senha de acesso ao app, com 8 letras e/ou números</p>
              </div>
              { /* Colocar os olhos de ver ou não a senha*/ }


              <div className="mt-2">
              <p className="text-purple-500 text-sm p-4 w-max font-bold">Esqueci a senha</p>
            </div>

            {!SubmitForm ? (<div className="items-center flex justify-center rounded-full">
            <button onClick={handleLogin} className="font-semibold  tracking-tight   w-screen py-3 bg-zinc-900/50 text-white rounded-full">
              Acessar
            </button>
         </div>) : (<div className="items-center flex justify-center rounded-full">
            <button onClick={handleLogin} disabled className="font-bold text-sm w-full py-3 bg-zinc-900/50 text-white rounded-full cursor-not-allowed">
              Acessar
            </button>
         </div>)}
            </div>
            
          </div>
         
        </div>
      </main>

      <footer className=" p-8 bg-zinc-800/90">
        <div className="text-purple-400 flex justify-between mx-16">
          <h1 className="text-md font-semibold">Não sou cliente</h1>
          <h1 className="text-md font-semibold">Me Roubaram</h1>
        </div>
      </footer>
    </div>
  );
}
