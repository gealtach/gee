'use client';
import Login from "./components/login";
import Register from "./components/register";

export default function Home() {
  return (
      <div className="flex flex-col items-center">
        <h1>GEE - Estrutura de Dados e Cálculos Automáticos</h1>
        <Login />
        <Register/>
      </div>
  );
}

