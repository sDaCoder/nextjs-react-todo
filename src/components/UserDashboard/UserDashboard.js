"use client"
import React from 'react'
import { Button } from '../ui/button'
import { LogOutIcon } from 'lucide-react'
import { authClient } from '../../../lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const UserDashboard = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await authClient.signOut()
            toast.success('Logged out successfully')
            router.push('/')
        } catch (error) {
            toast.error('Failed to log out')
        }
    }
    return (
        <>
            <Button variant="outline" onClick={handleSignOut}>
                Logout <LogOutIcon />
            </Button>
        </>
    )
}

export default UserDashboard