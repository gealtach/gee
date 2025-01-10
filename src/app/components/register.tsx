'use client';

import React, { useState } from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { useForm } from 'react-hook-form';

function Register() {
    const { register, handleSubmit } = useForm();
    const [success, setSuccess] = useState(false);
    const onSubmit = handleSubmit(async (data) =>{
        const res = await fetch('/api/auth/register',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        const resJson = await res.json();
        console.log(resJson);
        
        if(resJson.message === "User created successfully"){
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000);
        }
    });
  return (
    <div className='flex flex-col items-center border border-black p-4 w-fit rounded-lg gap-5 mt-10'>
        <h1 className='text-2xl font-bold'>Register</h1>
        <form onSubmit={onSubmit} className='bg-slate-500 rounded p-4'>
            <div className='flex flex-col gap-3'>
                <label>User:</label>
                <input className="rounded m-2 p-1 text-black" type="email"
                {...(register('email', { required: true }))}
                placeholder='example@expal.com'
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label>Password:</label>
                <input className="rounded m-2 p-1 text-black" type="password"
                {...(register('password', { required: true }))}
                placeholder='******'
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label>Name:</label>
                <input className="rounded m-2 p-1 text-black" type="text"
                {...(register('name', { required: true }))}
                placeholder='Jonh Doe'
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label>Role:</label>
                <select className='p-1 rounded' {...register('role', { required:true })}>
                    <option value="1">USER</option>
                    <option value="2">ADM</option>
                </select>
            </div>
            <button className='p-2 bg-blue-500 rounded font-bold text-white mt-5'>Entrar</button>
        </form>
        {success && <span className='text-green-500 flex gap-x-4'><FaRegCircleCheck size={30} /> User created successfuly</span>}
    </div>
  )
}

export default Register