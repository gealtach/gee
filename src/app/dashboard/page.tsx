'use client';

import Register from '../components/register';
import Logout from '../components/logout';
import { useSession } from 'next-auth/react';
import UserMenu from '../components/userMenu';
import UsersList from '../components/usersList';
import CombustivelList from '../components/combustivelList';
import DataCombEstacionaria2 from '../components/dataCombEstacionaria2';
import DataCombMovel from '../components/dataCombMovel';

function Page() {
  const { data: session } = useSession();  
  return (
    <div className='p-5'>
      <Logout />
      {
        session?.user.role === '2' && 
        <div className='flex flex-wrap p-4 gap-4'>
          <DataCombMovel />
          <DataCombEstacionaria2 />
          <Register />
          <UsersList />
          <CombustivelList />
        </div>
      }
      <UserMenu />
    </div>
  )
}

export default Page