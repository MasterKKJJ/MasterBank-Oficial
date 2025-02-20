"use client";

import { useState } from "react";
import DivisaoPequena from "./Components/DivisaoPequena";
import HeaderNu from "./Components/Header";
import MainBank from "./Components/MainBank/MainBank";
import CarrousellOptions from "./Components/MainBank/CarousellNu";
import PartesSeparadasComponents from "./Components/MainBank/PartesSeparadasGenerics/PartesSeparadas";
import PedirCartaoDeCredito from "./Components/MainBank/ComponentesGenericos/PedirCartaoDeCredito";
import CartoesMenuOption from "./Components/MainBank/CartoesNu";
import { Smartphone } from "lucide-react";

export default function Home() {
  const [isVisibleEyes, setIsVisibleEyes] = useState<boolean>(true);

  // Memoiza a função para evitar recriação desnecessária
  const setEyesFunction = () => {
    setIsVisibleEyes(!isVisibleEyes)
  }

  return (
    <div className="flex flex-col">
      <div >
        <HeaderNu setEyesFunction={setEyesFunction} isVisibleEyes={isVisibleEyes} />
        <DivisaoPequena />
        <MainBank isVisibleEyes={isVisibleEyes}>
          <CartoesMenuOption href="/cartoes" icon={<Smartphone />} text="Meus Cartões" />
          <CarrousellOptions />
        </MainBank>
        <DivisaoPequena />
        <PartesSeparadasComponents>
          <PedirCartaoDeCredito />
        </PartesSeparadasComponents>
      </div>
    </div>
  );
}