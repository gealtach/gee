'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function UserMenu() {
    const navigator = useRouter();
    const [ambito1, setAmbito1] = useState(false);
    const [ambito2, setAmbito2] = useState(false);
    const [ambito3, setAmbito3] = useState(false);
    const [ambito4, setAmbito4] = useState(false);
    const onClickAmbito1 = () => {setAmbito1(!ambito1)}
    const onClickAmbito2 = () => {setAmbito2(!ambito2)}
    const onClickAmbito3 = () => {setAmbito3(!ambito3)}
    const onClickAmbito4 = () => {setAmbito4(!ambito4)}
  return (
    <div className='flex flex-col gap-4 mt-4 w-64'>
            <div onClick={onClickAmbito1}>
                <span className='cursor-pointer hover:bg-slate-400 bg-blue-400 p-2 rounded'>Emissões Âmbito 1</span>
                {
                    ambito1 &&
                    <ul className='p-2'>
                        <li onClick={()=>navigator.push('/dashboard/ambito1/combustaoestacionaria')} className='cursor-pointer hover:bg-slate-400 bg-blue-400 p-2'>Combustão estacionária</li>
                        <li onClick={()=>navigator.push('/dashboard/ambito1/combustaomovel')} className='cursor-pointer hover:bg-slate-400 bg-blue-400 p-2'>Combustão móvel</li>
                        <li onClick={()=>navigator.push('/dashboard/ambito1/emissoesfugitivas')} className='cursor-pointer hover:bg-slate-400 bg-blue-400 p-2'>Emissões fugitivas</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-blue-400 p-2'>Efluentes</li>
                    </ul>
                }
            </div>
            <div onClick={onClickAmbito2}>
                <span className='cursor-pointer hover:bg-slate-400 bg-red-400 p-2 rounded'>Emissões Âmbito 2</span>
                {
                    ambito2 &&
                    <ul className='p-2'>
                        <li className='cursor-pointer hover:bg-slate-400 bg-red-400 p-2'>Compra de energia eléctrica</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-red-400 p-2'>Compra de energia térmica</li>
                    </ul>
                }
            </div>
            <div onClick={onClickAmbito3}>
                <span className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2 rounded'>Emissões Âmbito 3</span>
                {
                    ambito3 &&
                    <ul className='p-2'>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Matérias primas e outros</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Bens de investimento</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Combustão estacionária - Scope3</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Combustão móvel - Scope3</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Energia eléctrica - Scope3</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Transporte e Distribuição (upstream)</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Resíduos - Scope3</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Efluentes líquidos - Scope3</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>viagens a negócios</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Permuta casa-trabalho</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Transporte e Distribuição (Downstream)</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Utilização - Scope3</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Fim de vida - Scope3</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-yellow-400 p-2'>Categorias de ambito 3</li>
                    </ul>
                }
            </div>
            <div onClick={onClickAmbito4}>
                <span className='cursor-pointer hover:bg-slate-400 bg-green-400 p-2 rounded'>Emissões de CO2 biogénico</span>
                {
                    ambito4 &&
                    <ul className='p-2'>
                        <li className='cursor-pointer hover:bg-slate-400 bg-green-400 p-2'>Resumo</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-green-400 p-2'>Gráficos</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-green-400 p-2'>Fatores de emissão</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-green-400 p-2'>Conversão de unidades</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-green-400 p-2'>Fatores de emissão_MP e Prod.</li>
                        <li className='cursor-pointer hover:bg-slate-400 bg-green-400 p-2'>Fatores de emissão para bens de investimento</li>
                    </ul>
                }
            </div>
    </div>
  )
}

export default UserMenu