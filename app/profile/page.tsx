import { auth } from '@/auth'
import Image from 'next/image'
import React from 'react'

const page = async() => {
    

    const session = await auth()
    const user = session?.user

    console.log(user)


  return (
    <section className='bg-slate-500  h-screen'>
        <div className='text-center'>
            {user?.email}
            <p>{user?.name}</p>
            <Image  />
        </div>

    </section>
    
  )
}

export default page