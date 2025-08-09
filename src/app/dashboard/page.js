import UserDashboard from '@/components/UserDashboard/UserDashboard'
import React from 'react'
import { auth } from '../../../lib/auth'
import { headers } from 'next/headers'

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    return (
      <div className='flex items-center justify-center h-[100vh]'>
        <h1 className='text-3xl font-bold'>You are not logged in</h1>
      </div>
    )

  return (
    <>
      {/* <div className='p-20'> */}
        <UserDashboard />
      {/* </div> */}
    </>
  )
}

export default page