import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
	return (
		<>
			<h1>This is the home page</h1>
			<div className='flex items-center justify-start m-6 gap-4'>
				<Link className='text-blue-800 underline' href="/tasks">Navigate to tasks</Link>
				<Link className='text-blue-800 underline' href="/dashboard">Navigate to dashboard</Link>
			</div>
			<div className='flex items-center justify-start m-6 gap-4'>
				<Button asChild><Link href="/login">Login</Link></Button>
				<Button asChild><Link href="/signup">Signup</Link></Button>
			</div>
		</>
	)
}

export default page