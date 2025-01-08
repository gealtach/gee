'use client';

import Register from '../components/register';
import Logout from '../components/logout';
import { useSession } from 'next-auth/react';

function page() {
  const { data: session } = useSession()
  console.log(session?.user);
  
  return (
    <div className='m-5'>
      <Logout />
      {
        session?.user.role === '2' && <Register />
      }
    </div>
  )
}

export default page