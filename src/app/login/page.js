import LoginForm from '@/components/LoginForm/LoginForm'
import React from 'react'
import { auth } from '../../../lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { BackgroundLines } from '@/components/ui/background-lines'

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session) {
        redirect('/tasks');
    }

    return (
        <>
            {/* <div className='h-[100vh] w-full flex items-center justify-center'>
                <LoginForm />
            </div> */}
            <BackgroundLines className="flex items-center justify-center h-screen w-full flex-col px-4">
                <LoginForm />
            </BackgroundLines>
        </>
    )
}

export default page