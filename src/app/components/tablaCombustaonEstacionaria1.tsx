'use client';

import React, { useEffect, useState } from 'react';
import { IoIosSave } from "react-icons/io";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import CreateNewProject from './createNewProject';
import { RiDeleteBin6Line } from "react-icons/ri";

interface CombustivelValues {
  unidade: string;
  kgCO2: number | string;
  kgCH4: number | string;
  kgN2O: number | string;
}

interface CombustivelData {
  [key: string]: CombustivelValues;
}
type Project = {
  id: string;
  name: string;
  type: string;
  userId: string;
  rows: [];
};
type Rows = {
  id: string;
  instalacao: string;
  fonte: string;
  combustivel: string;
  qtd: string;
  unidade: string;
  co2unidade: string;
  ch4unidade: string;
  n2ounidade: string;
  co2tons: string;
  ch4tons: string;
  n2otons: string;
  totais: string;
  projectId: string;
}

function TablaCombustaonEstacionaria1() {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: { instalacao: '', denominacaoDaFonte: '', combustivel: '', qtd: 0, projectSelect: '' },
  });
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [rows, setRows] = useState<Rows[]>([]);
  const [aux, setAux] = useState(false);
  const [reloadProjects, setReloadProjects] = useState(false);
  const triggerReloadProjects = () => {
    setReloadProjects(!reloadProjects);
  };
  const combustivelData: CombustivelData = {
    Gasolina: {
      unidade: 'tons',
      kgCO2: 3.079,
      kgCH4: 0.00013,
      kgN2O: 0.00003
    },
    FueloleoPesado: {
      unidade: 'tons',
      kgCO2: 3.111,
      kgCH4: 0.000,
      kgN2O: 0.000
    },
    GPL: {
      unidade: 'tons',
      kgCO2: 2.003,
      kgCH4: 0.00004,
      kgN2O: 0.00019
    },
    GasNatural: {
      unidade: 'm3',
      kgCO2: 0.002,
      kgCH4: 0.000,
      kgN2O: 0.000
    },
    GasNaturalLiquefeito: {
      unidade: 'tons',
      kgCO2: 2.828,
      kgCH4: 0.0000,
      kgN2O: 0.0000
    },
    Diesel: {
      unidade: 'tons',
      kgCO2: 3.209,
      kgCH4: 0.0000,
      kgN2O: 0.0000
    },
    Biodiesel: {
      unidade: 'tons',
      kgCO2: 1.912,
      kgCH4: 0.0000,
      kgN2O: 0.0000
    },
    Biogasolina: {
      unidade: 'tons',
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
      unidade: 'tons',
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
  const selectedProject = watch('projectSelect');
  const qtdSeccted : number = watch('qtd');
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch('/api/createRow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instalacao: data.instalacao,
          fonte: data.denominacaoDaFonte,
          combustivel: data.combustivel,
          qtd: data.qtd,
          unidade: combustivelData[data.combustivel].unidade,
          co2unidade: combustivelData[data.combustivel].kgCO2,
          ch4unidade: combustivelData[data.combustivel].kgCH4,
          n2ounidade: combustivelData[data.combustivel].kgN2O,
          projetoId: data.projectSelect,
        }),
      });
  
      if (response.ok) {
        const res = await response.json();
        console.log(res);
  
        // Limpia los campos del formulario
        reset({
          instalacao: '',
          denominacaoDaFonte: '',
          combustivel: '',
          qtd: 0,
          projectSelect: selectedProject,
        });
        setAux(!aux);
      } else {
        console.error('Error al guardar los datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  });
  const deleteRow = async (id:string) => {
    try {
      const response = await fetch(`/api/deleteRow?id=${id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
      if (result.success) {
        console.log('Row deleted:', result.data);
      } else {
        console.error('Error:', result.error);
      }
      setAux(!aux);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getProjects?id=${session?.user.id}&type=combustaoestacionaria`);
        const data = await response.json();
        setProjects(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reloadProjects]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getRows?id=${selectedProject}`);
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  },[selectedProject, aux])
  
  return (
    <div>
      <div>
        <div className='flex flex-col p-4'>
          <CreateNewProject onProjectCreated={triggerReloadProjects} />
          <form className='flex flex-col w-64'>
            <select {...register('projectSelect')} className='p-1 rounded-lg my-4'>
              <option>Select Project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                {project.name}
                </option>
              ))}
            </select>
          </form>
          <div>
            <h1 className='text-3xl'>Combustao estacionaria</h1>
            <span className='font-bold'>Passo 1.    Indique o setor de atividade para o qual está a realizar o inventário</span>
            <br />
            <span className='text-xs'>
              Para os cálculos de emissões de combustão estacionária, a escolha dos Fatores de Emissão depende do setor de atividade, por isso, o cálculo só é efetuado quando selecionado o
              setor de atividade que mais se adequa às atividades da organização. 
              Caso a organização atue em mais do que um setor, selecione aquele que melhor representa a atividade exercida pelas fontes de emissão estacionárias.
              Caso existam diversas unidades de operação em setores muito distintos, utilize uma folha para cada unidade.
            </span>
            <br />
            <span>Sector actividade: <span className='font-bold'>Manufatura ou Construção</span></span><br />
            <span className='font-bold'>Passo 2.    Indique a quantidade total de combustível consumido para cada unidade, local, ou ponto (de acordo com o tipo de combustível) na Tabela 1.</span>
            <br />
            <span className='text-xs'>
              - Selecione "Combustível usado" na caixa em baixo.  Indique a "Quantidade consumida" nas unidades corretas.<br />
              - As unidades corretas para a "Quantidade consumida" aparecem automaticamente na coluna "Unidades". Não altere tais unidades. Se necessário, converta o dado de
              consumo para coincidir com as unidades apresentadas.<br />
              - Observe o exemplo na primeira linha de cada tabela (Itálico e vermelho). Não preencha essa linha.<br />
              - Para liberar mais linhas na Ferramenta clique no botão "+" à esquerda da tabela.
            </span>
          </div>
        </div>
        <div className='p-2'>
          <h1 className='text-xl'>Tabela 1. Fontes Estacionárias de Combustão</h1>
          <form onSubmit={onSubmit}>
            <Table aria-label='combustaoEstacionaria'>
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
                  <TableCell><button disabled={selectedProject === 'Select Project'} className={`${selectedProject === 'Select Project' && 'cursor-not-allowed'}`}><IoIosSave size={20} className='hover:text-green-500' /></button></TableCell>
                </TableRow>
                <React.Fragment>
                  {rows?.map((row) => (
                    <TableRow className='hover:bg-blue-400' key={row.id}>
                      <TableCell>{row.instalacao}</TableCell>
                      <TableCell>{row.fonte}</TableCell>
                      <TableCell>{row.combustivel}</TableCell>
                      <TableCell>{row.qtd}</TableCell>
                      <TableCell>{row.unidade}</TableCell>
                      <TableCell>{row.co2unidade}</TableCell>
                      <TableCell>{row.ch4unidade}</TableCell>
                      <TableCell>{row.n2ounidade}</TableCell>
                      <TableCell>{row.co2tons}</TableCell>
                      <TableCell>{row.ch4tons}</TableCell>
                      <TableCell>{row.n2otons}</TableCell>
                      <TableCell>{row.totais}</TableCell>
                      <TableCell onClick={()=> deleteRow(row.id)} className='text-red-600 cursor-pointer hover:bg-red-500 hover:rounded-full'>
                        <RiDeleteBin6Line size={20} />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
                <TableRow>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell className='font-bold bg-green-400'>Tota fóssil</TableCell>
                  <TableCell className='bg-green-400'>
                    {
                      rows?.reduce((sum, row) => {
                        const co2Value = parseFloat(row.co2tons);
                        return !isNaN(co2Value) ? sum + co2Value : sum;
                      }, 0).toFixed(3)
                    }
                  </TableCell>
                  <TableCell className='bg-green-400'>
                  {
                      rows?.reduce((sum, row) => {
                        const co2Value = parseFloat(row.ch4tons);
                        return !isNaN(co2Value) ? sum + co2Value : sum;
                      }, 0).toFixed(3)
                    }
                  </TableCell>
                  <TableCell className='bg-green-400'>
                  {
                      rows?.reduce((sum, row) => {
                        const co2Value = parseFloat(row.n2otons);
                        return !isNaN(co2Value) ? sum + co2Value : sum;
                      }, 0).toFixed(3)
                    }
                  </TableCell>
                  <TableCell className='bg-green-400'>
                  {
                      rows?.reduce((sum, row) => {
                        const co2Value = parseFloat(row.totais);
                        return !isNaN(co2Value) ? sum + co2Value : sum;
                      }, 0).toFixed(3)
                    }
                  </TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TablaCombustaonEstacionaria1