'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdCreateNewFolder } from "react-icons/md";

interface CreateNewProjectProps {
  onProjectCreated: () => void;
}

const CreateNewProject: React.FC<CreateNewProjectProps> = ({ onProjectCreated }) => {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();

  const newProjectSubmit = handleSubmit(async (data) => {
    try {
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

      if (response.ok) {
        const res = await response.json();
        onProjectCreated();
        console.log(res);
      } else {
        console.error('Error al crear el proyecto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  });

  return (
    <div>
      <form onSubmit={newProjectSubmit}>
        <div className="flex gap-x-3">
          <input 
            {...register('name', { required: true })} 
            type="text" 
            placeholder="Nombre del proyecto" 
            className="border rounded px-2 py-1"
          />
          <button 
            type="submit" 
            className="hover:text-blue-500"
          >
            <MdCreateNewFolder size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewProject;
