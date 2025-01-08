'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

function page() {
  const navigator = useRouter();
  return (
    <div>
      <div onClick={()=>navigator.push('/dashboard')} className='flex flex-col w-fit items-center m-2 p-2 cursor-pointer rounded hover:bg-red-400'>
        <span className='text-xs'>return to</span>
        <IoMdArrowRoundBack size={30} />
        <span className='text-xs'>dashboard</span>
      </div>
      <div>
        <div className='flex flex-col p-3'>
          <h1 className='text-3xl'>Combustao estacionaria</h1>
          <span className='font-bold'>Passo 1.    Indique o setor de atividade para o qual está a realizar o inventário</span>
          <span className='text-xs'>
            Para os cálculos de emissões de combustão estacionária, a escolha dos Fatores de Emissão depende do setor de atividade, por isso, o cálculo só é efetuado quando selecionado o
            setor de atividade que mais se adequa às atividades da organização. 
            Caso a organização atue em mais do que um setor, selecione aquele que melhor representa a atividade exercida pelas fontes de emissão estacionárias.
            Caso existam diversas unidades de operação em setores muito distintos, utilize uma folha para cada unidade.
          </span>
          <span>Sector actividade: <span className='font-bold'>Manufatura ou Construção</span></span>
          <span className='font-bold'>Passo 2.    Indique a quantidade total de combustível consumido para cada unidade, local, ou ponto (de acordo com o tipo de combustível) na Tabela 1.</span>
          <span className='text-xs'>
            - Selecione "Combustível usado" na caixa em baixo.  Indique a "Quantidade consumida" nas unidades corretas.
            - As unidades corretas para a "Quantidade consumida" aparecem automaticamente na coluna "Unidades". Não altere tais unidades. Se necessário, converta o dado de
            consumo para coincidir com as unidades apresentadas.
            - Observe o exemplo na primeira linha de cada tabela (Itálico e vermelho). Não preencha essa linha.
            - Para liberar mais linhas na Ferramenta clique no botão "+" à esquerda da tabela.
          </span>
        </div>
        <div>
          <h1>Tabela 1.  Fontes Estacionárias de Combustão</h1>
          <div className='bg-blue-500 flex justify-center py-2'>
            <div className='flex font-bold items-stretch'>
              <span className='border p-2 flex items-center'>Instalação</span>
              <span className='border p-2 flex items-center'>Denominação da fonte</span>
              <span className='border p-2 flex items-center'>Combustível</span>
              <span className='border p-2 flex items-center'>Qtd.</span>
              <span className='border p-2 flex items-center'>Unidades</span>
              <div className='flex flex-col items-center py-2 border-y'>
                <span className='text-xs'>Fatores de emissão</span>
                <div className='flex text-xs'>
                  <span className='border p-2'>kg CO2 / unidade</span>
                  <span className='border p-2'>kg CH4 / unidade</span>
                  <span className='border p-2'>kg N2O / unidade</span>
                </div>
              </div>
              <span className='border p-2 flex items-center'>Emissões de CO2 (t)</span>
              <span className='border p-2 flex items-center'>Emissões de CH4 (t)</span>
              <span className='border p-2 flex items-center'>Emissões de N2O (t)</span>
              <span className='border p-2 flex items-center'>Emissões totais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page