'use client';
import Login from "./components/login";

export default function Home() {
  return (
      <div className="flex flex-col items-center">
        <h1>GEE - Estrutura de Dados e Cálculos Automáticos</h1>
        <Login />
      </div>
  );
}

