'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CredentialsError from './credentialsError';

function Login() {
    const { register, handleSubmit } = useForm();
    const navigator = useRouter();
    const [credentialsError, setCredentialsError] = useState(false);
    const onSubmit = handleSubmit(async (data) =>{
        const res = await signIn('credentials',{
            email: data.email,
            password: data.password,
            redirect: false
        });
        if(res?.ok === false){
            setCredentialsError(true);
            setTimeout(() => {
                setCredentialsError(false);
            }, 2000);
        }
        else{
            navigator.push('/dashboard');
        }
    })
  return (
    <div className='flex flex-col items-center gap-5 mt-10'>
        <h1>Login</h1>
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
            <button className='p-2 bg-blue-500 rounded font-bold text-white mt-2'>Entrar</button>
        </form>
        {
            credentialsError && <CredentialsError />
        }
    </div>
  )
}

export default Login