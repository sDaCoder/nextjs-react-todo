import LoginForm from '@/components/LoginForm/LoginForm'
import React from 'react'
import { auth } from '../../../lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session)
    {
        redirect('/tasks');
    }

    return (
        <>
            <div className='h-[100vh] w-full flex items-center justify-center'>
                <LoginForm />
            </div>
        </>
    )
}

export default page