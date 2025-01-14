'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface CombustivelValues {
    id: string;
    nome: string;
    unidade: string;
    kgCO2: string;
    kgCH4: string;
    kgN2O: string;
    categoria: string
  }

function CombustivelList() {
    const [combustivels, setCombustivels] = useState<CombustivelValues[]>([]);
    const [aux, setAux] = useState(false);
    const deleteCombustivel = async (id: string) => {
        try {
            const response = await fetch(`/api/deleteCombustivel?id=${id}`, {
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
    const { register, handleSubmit, reset } = useForm({
            defaultValues: {
                nome: '',
                unidade: '',
                kgCO2: '',
                kgCH4: '',
                kgN2O: '',
                categoria: '',
              }
        });
        const onSubmit = handleSubmit(async (data) =>{
            const res = await fetch('/api/createCombustivelData',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });        
            if(res.status === 201){
                reset({
                    nome: '',
                    unidade: '',
                    kgCO2: '',
                    kgCH4: '',
                    kgN2O: '',
                    categoria: '',
                  });
            }
            setAux(!aux);
        });
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch('/api/getCombustivels');
            const data = await response.json();
            setCombustivels(data);
        }
        fetchData();
    },[aux])
  return (
    <div className='flex flex-col items-center border border-black p-4 w-fit rounded-lg gap-5 mt-10'>
        <h1 className='text-2xl font-bold'>CombustivelList</h1>
        <form onSubmit={onSubmit}>
            <Table>
                <TableHeader>
                    <TableColumn>Nome</TableColumn>
                    <TableColumn>Unidade</TableColumn>
                    <TableColumn>KgCO2</TableColumn>
                    <TableColumn>KgCH4</TableColumn>
                    <TableColumn>KgN2O</TableColumn>
                    <TableColumn>Categoria</TableColumn>
                    <TableColumn className='text-red-600'><RiDeleteBin6Line size={20} /></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <input className="rounded border border-black m-2 p-1 text-black" type="text"
                            {...(register('nome', { required: true }))}
                            placeholder='Combustivel'
                            />
                        </TableCell>
                        <TableCell>
                            <select className='p-1 rounded border border-black' {...register('unidade', { required:true })}>
                                <option value="tons">tons</option>
                                <option value="m3">m3</option>
                                <option value="N/A">N/A</option>
                            </select>
                        </TableCell>
                        <TableCell>
                            <input className="rounded border border-black m-2 p-1 text-black" type="text"
                            {...(register('kgCO2', { required: true }))}
                            placeholder='kgCO2'
                            />
                        </TableCell>
                        <TableCell>
                            <input className="rounded border border-black m-2 p-1 text-black" type="text"
                            {...(register('kgCH4', { required: true }))}
                            placeholder='kgCH4'
                            />
                        </TableCell>
                        <TableCell>
                            <input className="rounded border border-black m-2 p-1 text-black" type="text"
                            {...(register('kgN2O', { required: true }))}
                            placeholder='kgN2O'
                            />
                        </TableCell>
                        <TableCell>
                            <select className='p-1 rounded border border-black' {...register('categoria', { required:true })}>
                                <option value="combustaoe stacionaria">Combustão estacionária</option>
                                <option value="combustao movel">Combustão móvel</option>
                            </select>
                        </TableCell>
                        <TableCell><button><IoIosSave size={20} /></button></TableCell>
                    </TableRow>
                    <React.Fragment>
                        {
                            combustivels?.map((combustivel)=>(
                                <TableRow key={combustivel.id}>
                                    <TableCell>{combustivel.nome}</TableCell>
                                    <TableCell>{combustivel.unidade}</TableCell>
                                    <TableCell>{combustivel.kgCO2}</TableCell>
                                    <TableCell>{combustivel.kgCH4}</TableCell>
                                    <TableCell>{combustivel.kgN2O}</TableCell>
                                    <TableCell>{combustivel.categoria}</TableCell>
                                    <TableCell onClick={()=> deleteCombustivel(combustivel.id)} className='text-red-600 cursor-pointer hover:bg-red-500 hover:rounded-full'>
                                      <RiDeleteBin6Line size={20} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </React.Fragment>
                </TableBody>
            </Table>
        </form>
    </div>
  )
}

export default CombustivelList