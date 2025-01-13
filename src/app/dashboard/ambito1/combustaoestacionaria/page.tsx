'use client';

import TablaCombustaonEstacionaria1 from '@/app/components/tablaCombustaonEstacionaria1';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

function Page() {
  const navigator = useRouter();
  return (
    <div>
      <div onClick={()=>navigator.push('/dashboard')} className='flex flex-col w-fit items-center m-2 p-2 cursor-pointer rounded hover:bg-red-400'>
        <span className='text-xs'>return to</span>
        <IoMdArrowRoundBack size={30} />
        <span className='text-xs'>dashboard</span>
      </div>
      <TablaCombustaonEstacionaria1 />
    </div>
  )
}

export default Page