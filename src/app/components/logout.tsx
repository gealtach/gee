import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
  return (
    <div>
        <button onClick={() => signOut()} className='bg-red-600 text-white font-bold p-3 rounded-lg'>LogOut</button>
    </div>
  )
}

export default Logout