'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosSave } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

type Rows = {
    id: string;
    ref: string;
    combustivel: string;
    unidade: string;
    type: string;
    CO2: string;
    CH4: string;
    N2O: string;
}

function DataCombEstacionaria2() {
    const { register, handleSubmit, reset } =useForm({
        defaultValues: {ref: '', combustivel: '', unidade: '', CO2: '', CH4: '', N2O: '', type: ''}
    });
    const [rows, setRows] = useState<Rows[]>([]);
    const [aux, setAux] = useState(false);
    const onSubmit = handleSubmit(async (data) =>{
        try {
            const fetching = await fetch('/api/createCombEstTab2', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ref: data.ref,
                  combustivel: data.combustivel,
                  unidade: data.unidade,
                  CO2: data.CO2,
                  CH4: data.CH4,
                  N2O: data.N2O,
                  type: data.type
                }),
              });
              const ans = await fetching.json();
              console.log(ans);
              reset()
              setAux(!aux);             
        } catch (error) {
            console.log(error);
        }
    });
    const deleteRow = async (id:string) =>{
        try {
            const response = await fetch(`/api/deleteRowCombEst?id=${id}`, {
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
    useEffect(()=>{
        const fetchData = async() =>{
            const data = await fetch('/api/getCombEstTab2');
            const ans = await data.json();
            setRows(ans);
        }
        fetchData();
    },[aux]);
  return (
    <div>
        <h1 className='text-2xl font-bold'>Data combustao estacionaria tabla 2</h1>
        <form onSubmit={onSubmit}>
            <Table aria-label='combest2'>
                <TableHeader>
                  <TableColumn>N° Ref</TableColumn>
                  <TableColumn>Combustível</TableColumn>
                  <TableColumn>Tipo</TableColumn>
                  <TableColumn>Unidade</TableColumn>
                  <TableColumn>CO2 (kg/un)</TableColumn>
                  <TableColumn>CH4 (kg/un)</TableColumn>
                  <TableColumn>N2O (kg/un)</TableColumn>
                  <TableColumn><IoIosSave size={20} /></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell><input {...(register('ref', { required: true }))} type="text" placeholder="referência" className='p-2' /></TableCell>
                        <TableCell><input {...(register('combustivel', { required: true }))} type="text" placeholder="combustível" className='p-2' /></TableCell>
                        <TableCell>
                            <select {...(register('type', { required: true }))}>
                                <option value="fosseis">fósseis</option>
                                <option value="biomassa">biomassa</option>
                            </select>
                        </TableCell>
                        <TableCell><input {...(register('unidade', { required: true }))} type="text" placeholder="unidade" className='p-2' /></TableCell>
                        <TableCell><input {...(register('CO2', { required: true }))} type="text" placeholder="CO2(kg/un)" className='p-2' /></TableCell>
                        <TableCell><input {...(register('CH4', { required: true }))} type="text" placeholder="CH4(kg/un)" className='p-2' /></TableCell>
                        <TableCell><input {...(register('N2O', { required: true }))} type="text" placeholder="N2O(kg/un)" className='p-2' /></TableCell>
                        <TableCell><button className='cursor-pointer hover:bg-green-400 hover:rounded-full'><IoIosSave size={20} /></button></TableCell>
                    </TableRow>
                    <React.Fragment>
                        {
                            rows?.map((row) =>(
                                <TableRow className='hover:bg-blue-400' key={row.id}>
                                    <TableCell>{row.ref}</TableCell>
                                    <TableCell>{row.combustivel}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.unidade}</TableCell>
                                    <TableCell>{row.CO2}</TableCell>
                                    <TableCell>{row.CH4}</TableCell>
                                    <TableCell>{row.N2O}</TableCell>
                                    <TableCell onClick={()=> deleteRow(row.id)} className='text-red-600 cursor-pointer hover:bg-red-500 hover:rounded-full'><RiDeleteBin6Line size={20} /></TableCell>
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

export default DataCombEstacionaria2