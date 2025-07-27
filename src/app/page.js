import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <h1>This is the home page</h1>
            <Link className='text-blue-800 underline' href="/tasks">Navigate to tasks</Link>
        </>
    )
}

export default page