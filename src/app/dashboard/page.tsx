'use client';

import Register from '../components/register';
import Logout from '../components/logout';
import { useSession } from 'next-auth/react';
import UserMenu from '../components/userMenu';
import UsersList from '../components/usersList';

function Page() {
  const { data: session } = useSession();
  console.log(session?.user);
  
  return (
    <div className='m-5'>
      <Logout />
      {
        session?.user.role === '2' && 
        <div className='flex p-4 gap-4'>
          <Register />
          <UsersList />
        </div>
      }
      <UserMenu />
    </div>
  )
}

export default Page