'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

type Rows = {
    id: string;
    combustivel: string;
    unidade: string;
    kgCO2: string;
    kgCH4: string;
    kgN2O: string;
}

function DataCombMovel() {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { combustivel: '', unidade: '', kgCO2: '', kgCH4: '', kgN2O:'' }
    });
    const [aux,setAux] = useState(false);
    const [rows, setRows] = useState<Rows[]>([]);
    const deleteRow = async (id:string) =>{
        try {
            const response = await fetch(`/api/deleteDataCombMovel?id=${id}`, {
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
    const onSubmit = handleSubmit( async(data)=>{
        try {
            const response = await fetch('/api/createDataCombMovel', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    combustivel: data.combustivel,
                    unidade: data.unidade,
                    kgCO2: data.kgCO2,
                    kgCH4: data.kgCH4,
                    kgN2O: data.kgN2O
                }),
              });
              setAux(!aux);
              reset();
        } catch (error) {
           console.log(error) 
        }
    });
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch('/api/getDataCombMovel');
            const data = await response.json();
            setRows(data);
        }
        fetchData()
    },[aux]);
  return (
    <div className='border-black border rounded-lg p-4'>
        <h1 className='text-2xl font-bold'>DataCombMovel</h1>
        <form onSubmit={onSubmit}>
            <Table aria-label='combMobelData'>
                <TableHeader>
                    <TableColumn>Combustivel</TableColumn>
                    <TableColumn>Unidade</TableColumn>
                    <TableColumn>KgCO2/unidade</TableColumn>
                    <TableColumn>KgCO2/unidade</TableColumn>
                    <TableColumn>KgCO2/unidade</TableColumn>
                    <TableColumn><IoIosSave size={20} /></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <input className="rounded m-2 p-1 text-black" type="text"
                            {...(register('combustivel', { required: true }))}
                            placeholder='Combustivel'
                            />
                        </TableCell>
                        <TableCell>
                            <input className="rounded m-2 p-1 text-black" type="text"
                            {...(register('unidade', { required: true }))}
                            placeholder='Unidade'
                            />
                        </TableCell>
                        <TableCell>
                            <input className="rounded m-2 p-1 text-black" type="text"
                            {...(register('kgCO2', { required: true }))}
                            placeholder='KgCO2'
                            />
                        </TableCell>
                        <TableCell>
                            <input className="rounded m-2 p-1 text-black" type="text"
                            {...(register('kgCH4', { required: true }))}
                            placeholder='KgCH4'
                            />
                        </TableCell>
                        <TableCell>
                            <input className="rounded m-2 p-1 text-black" type="text"
                            {...(register('kgN2O', { required: true }))}
                            placeholder='KgN2O'
                            />
                        </TableCell>
                        <TableCell><button><IoIosSave size={20} /></button></TableCell>
                    </TableRow>
                    <React.Fragment>
                        {
                            rows?.map((row)=>(
                                <TableRow key={row.id}>
                                    <TableCell>{row.combustivel}</TableCell>
                                    <TableCell>{row.unidade}</TableCell>
                                    <TableCell>{row.kgCO2}</TableCell>
                                    <TableCell>{row.kgCH4}</TableCell>
                                    <TableCell>{row.kgN2O}</TableCell>
                                    <TableCell onClick={() => deleteRow(row.id)} className='text-red-600 cursor-pointer hover:bg-red-500 hover:rounded-full'><RiDeleteBin6Line size={20} /></TableCell>
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

export default DataCombMovel