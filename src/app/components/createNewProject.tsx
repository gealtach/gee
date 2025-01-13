'use client';

import { useSession } from 'next-auth/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { MdCreateNewFolder } from "react-icons/md";

function CreateNewProject() {
    const { register, handleSubmit, watch } = useForm();
    const { data: session } = useSession();
    const newprojectSubmit = handleSubmit(async (data) =>{
        const response = await fetch('/api/createProject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            type: 'combustaoestacionaria',
            userId: session?.user.id,
          }),
        });
      
        const res = await response.json();
        console.log(res);
      })
  return (
    <div>
        <form onSubmit={newprojectSubmit}>
            <div className='flex gap-x-3'>
              <input {...(register('name', { required: true }))} type="text" />
              <button className='hover:text-blue-500'><MdCreateNewFolder size={30} /></button>
            </div>
          </form>
    </div>
  )
}

export default CreateNewProject