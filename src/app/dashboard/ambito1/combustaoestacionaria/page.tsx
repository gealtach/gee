'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowRoundBack, IoIosSave } from "react-icons/io";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { useForm } from 'react-hook-form';

interface CombustivelValues {
  unidade: string;
  kgCO2: number | string;
  kgCH4: number | string;
  kgN2O: number | string;
}

interface CombustivelData {
  [key: string]: CombustivelValues;
}

function Page() {
  const navigator = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const combustivelData: CombustivelData = {
    Gasolina: {
      unidade: "tons",
      kgCO2: 3.079,
      kgCH4: 0.00013,
      kgN2O: 0.00003
    },
    FueloleoPesado: {
      unidade: "tons",
      kgCO2: 3.111,
      kgCH4: 0.000,
      kgN2O: 0.000
    },
    GPL: {
      unidade: "tons",
      kgCO2: 2.003,
      kgCH4: 0.00004,
      kgN2O: 0.00019
    },
    GasNatural: {
      unidade: "m3",
      kgCO2: 0.002,
      kgCH4: 0.000,
      kgN2O: 0.000
    },
    GasNaturalLiquefeito: {
      unidade: "tons",
      kgCO2: 2.828,
      kgCH4: 0.0000,
      kgN2O: 0.0000
    },
    Diesel: {
      unidade: "tons",
      kgCO2: 3.209,
      kgCH4: 0.0000,
      kgN2O: 0.0000
    },
    Biodiesel: {
      unidade: "tons",
      kgCO2: 1.912,
      kgCH4: 0.0000,
      kgN2O: 0.0000
    },
    Biogasolina: {
      unidade: "tons",
      kgCO2: 1.912,
      kgCH4: 0.0000,
      kgN2O: 0.0000
    },
    CarvaoVegetal: {
      unidade: 'N/A',
      kgCO2: 'N/A',
      kgCH4: 'N/A',
      kgN2O: 'N/A'
    },
    GasesAterro: {
      unidade: 'N/A',
      kgCO2: 'N/A',
      kgCH4: 'N/A',
      kgN2O: 'N/A'
    },
    GasesLamasDep: {
      unidade: 'N/A',
      kgCO2: 'N/A',
      kgCH4: 'N/A',
      kgN2O: 'N/A'
    },
    LicorNegro: {
      unidade: 'N/A',
      kgCO2: 'N/A',
      kgCH4: 'N/A',
      kgN2O: 'N/A'
    },
    Madeira: {
      unidade: "tons",
      kgCO2: 1.747,
      kgCH4: 0.000,
      kgN2O: 0.000
    },
    Turfa: {
      unidade: 'N/A',
      kgCO2: 'N/A',
      kgCH4: 'N/A',
      kgN2O: 'N/A'
    },
  };
  const combustivelSelecionado = watch('combustivel');
  const qtdSeccted : number = watch('qtd');
  const onSubmit = handleSubmit(async (data) =>{
    console.log(data);    
});

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
          <h1>Tabela 1. Fontes Estacionárias de Combustão</h1>
          <form onSubmit={onSubmit}>
            <Table>
              <TableHeader>
                <TableColumn>Instalação</TableColumn>
                <TableColumn>Denominação da fonte</TableColumn>
                <TableColumn>Combustível</TableColumn>
                <TableColumn>Qtd.</TableColumn>
                <TableColumn>Unidades</TableColumn>
                {/* Fatores de emissão y sus subcolumnas */}
                <TableColumn>kg CO2 / unidade</TableColumn>
                <TableColumn>kg CH4 / unidade</TableColumn>
                <TableColumn>kg N2O / unidade</TableColumn>
                <TableColumn>Emissões de CO2 (t)</TableColumn>
                <TableColumn>Emissões de CH4 (t)</TableColumn>
                <TableColumn>Emissões de N2O (t)</TableColumn>
                <TableColumn>Emissões totais</TableColumn>
                <TableColumn><IoIosSave size={20} /></TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell><input {...(register('instalacao', { required: true }))} type="text" placeholder="Instalação" className='w-10' /></TableCell>
                  <TableCell><input {...(register('denominacaoDaFonte', { required: true }))} type="text" placeholder="Denominação da fonte" className='w-32' /></TableCell>
                  <TableCell>
                    <select {...(register('combustivel', { required: true }))} className='w-20'>
                      <option value="">Selecione Combustível</option>
                      <option value="Gasolina">Combustível para Motor (Gasolina)</option>
                      <option value="FueloleoPesado">Fuelóleo Pesado</option>
                      <option value="GPL">Gás de Petróleo Liquefeito (GPL)</option>
                      <option value="GasNatural">Gás Natural</option>
                      <option value="GasNaturalLiquefeito">Gás Natural Liquefeito</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Biodiesel">Biodiesel</option>
                      <option value="Biogasolina">Biogasolina</option>
                      <option value="CarvaoVegetal">Carvão Vegetal</option>
                      <option value="GasesAterro">Gases de Aterro</option>
                      <option value="GasesLamasDep">Gases de Lamas de Depuração</option>
                      <option value="LicorNegro">Licor Negro</option>
                      <option value="Madeira">Madeira / resíduos de Madeira</option>
                      <option value="Turfa">Turfa</option>
                    </select>
                  </TableCell>
                  <TableCell><input {...(register('qtd', { required: true }))} type="text" placeholder='Qtd.' className="w-10" /></TableCell>
                  <TableCell>
                    {
                      combustivelSelecionado && combustivelData[combustivelSelecionado]
                      ? combustivelData[combustivelSelecionado].unidade
                      : "unidade"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      combustivelSelecionado && combustivelData[combustivelSelecionado]
                      ? combustivelData[combustivelSelecionado].kgCO2
                      : "0"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      combustivelSelecionado && combustivelData[combustivelSelecionado]
                      ? combustivelData[combustivelSelecionado].kgCH4
                      : "0"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      combustivelSelecionado && combustivelData[combustivelSelecionado]
                      ? combustivelData[combustivelSelecionado].kgN2O
                      : "0"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      qtdSeccted && combustivelSelecionado && combustivelData[combustivelSelecionado] && typeof combustivelData[combustivelSelecionado]?.kgCO2 === 'number'
                      ? combustivelData[combustivelSelecionado].kgCO2 * qtdSeccted
                      : "0"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      qtdSeccted && combustivelSelecionado && combustivelData[combustivelSelecionado] && typeof combustivelData[combustivelSelecionado]?.kgCH4 === 'number'
                      ? combustivelData[combustivelSelecionado].kgCH4 * qtdSeccted
                      : "0"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      qtdSeccted && combustivelSelecionado && combustivelData[combustivelSelecionado] && typeof combustivelData[combustivelSelecionado]?.kgN2O === 'number'
                      ? combustivelData[combustivelSelecionado].kgN2O * qtdSeccted
                      : "0"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      qtdSeccted && combustivelSelecionado && combustivelData[combustivelSelecionado]
                        ? (
                            (typeof combustivelData[combustivelSelecionado]?.kgCO2 === 'number' ? combustivelData[combustivelSelecionado].kgCO2 * qtdSeccted : 0) +
                            (typeof combustivelData[combustivelSelecionado]?.kgCH4 === 'number' ? combustivelData[combustivelSelecionado].kgCH4 * qtdSeccted : 0) +
                            (typeof combustivelData[combustivelSelecionado]?.kgN2O === 'number' ? combustivelData[combustivelSelecionado].kgN2O * qtdSeccted : 0)
                          ).toFixed(4)
                        : "0"
                    }
                  </TableCell>
                  <TableCell><button><IoIosSave size={20} className='hover:text-green-500' /></button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page