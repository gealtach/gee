'use client';

import Register from '../components/register';
import Logout from '../components/logout';
import { useSession } from 'next-auth/react';
import UserMenu from '../components/userMenu';

function Page() {
  const { data: session } = useSession()
  console.log(session?.user);
  
  return (
    <div className='m-5'>
      <Logout />
      {
        session?.user.role === '2' && <Register />
      }
      <UserMenu />
    </div>
  )
}

export default Page