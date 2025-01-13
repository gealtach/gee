'use client';

import React, { useEffect, useState } from 'react';
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSession } from 'next-auth/react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [aux, setAux] = useState(false);
    const { data: session } = useSession();
    const deleteUser = async (id:string) => {
        try {
            const response = await fetch(`/api/deleteUser?id=${id}&adm=${session?.user.id}`, {
              method: 'DELETE',
            });
        
            const result = await response.json();
            if (result.success) {
              console.log('User deleted:', result.data);
            } else {
              console.error('Error:', result.error);
            }
            setAux(!aux);
          } catch (error) {
            console.error('Fetch error:', error);
          }
    }
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await fetch(`/api/getUsers`);
                const data = await response.json();
                setUsers(data);                
              } catch (error) {
                console.error("Error fetching data:", error);
              }
        }
        fetchData();
    },[aux])
  return (
    <div className='flex flex-col items-center border border-black p-4 w-fit rounded-lg gap-5 mt-10'>
        <h1 className='text-2xl font-bold'>Users</h1>
        <div className='flex w-fit gap-x-5'>
            <Table aria-label='userList'>
                <TableHeader>
                    <TableColumn>Role</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>CreatedAt</TableColumn>
                    <TableColumn className='text-red-600'><RiDeleteBin6Line size={20} /></TableColumn>
                </TableHeader>
                <TableBody>
                    <React.Fragment>
                      {users?.map((user) => (
                        <TableRow className='hover:bg-blue-400' key={user.id}>
                          <TableCell>{user.role === '1' ? 'User' : 'Adm'}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell className='cursor-pointer'>
                            <button
                            disabled={user.id === session?.user.id}                         
                            onClick={()=> deleteUser(user.id)} 
                            className={`text-red-600 ${user.id === session?.user.id && 'cursor-not-allowed'} p-2 hover:bg-green-500 hover:rounded-full`}>
                              <RiDeleteBin6Line size={20} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default UsersList