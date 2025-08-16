"use client"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { authClient } from '../../../lib/auth-client';
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { User } from 'lucide-react'
import { Mail } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { CheckSquare } from 'lucide-react';
import { LogOutIcon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Shield } from 'lucide-react';

const UserAvatar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending, error } = authClient.useSession();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await authClient.signOut()
            toast.success('Logged out successfully')
            router.push('/')
        } catch (error) {
            toast.error('Failed to log out')
        }
        setIsOpen(false);
    }

    const handleNavigateToTasks = () => {
        router.push('/tasks')
        setIsOpen(false);
    }

    const handleNavigateToDashboard = () => {
        router.push('/dashboard')
        setIsOpen(false);
    }

    if (isPending) {
        return (
            <div className="animate-pulse">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            </div>
        )
    }

    if (error) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full p-0 border-2 border-red-200">
                        <User className="h-5 w-5 text-red-500" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96" align="end">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-red-600 text-sm">
                                <User className="h-4 w-4" />
                                Error Loading Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-gray-600 mb-3">{error.message}</p>
                            <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="w-full">
                                Retry
                            </Button>
                        </CardContent>
                    </Card>
                </PopoverContent>
            </Popover>
        )
    }

    if (!session?.user) {
        return (
            <Button variant="ghost" onClick={() => router.push('/login')} className="h-10 px-3 text-sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
            </Button>
        )
    }

    const user = session.user;
    const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.email?.[0]?.toUpperCase() || 'U';

    return (
        <>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 rounded-full p-0 border-2 border-gray-200 hover:border-gray-300">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.image} alt={user.name || user.email} />
                            <AvatarFallback className="text-sm font-semibold">
                                {userInitials}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96" align="end">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="pb-1 px-3 pt-3">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4" />
                                User Profile
                            </CardTitle>
                            <CardDescription className="text-xs">Your account information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0 px-3 pb-3">
                            {/* User Avatar and Basic Info */}
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.image} alt={user.name || user.email} />
                                    <AvatarFallback className="text-sm font-semibold">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1 flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold truncate">
                                        {user.name || 'User'}
                                    </h3>
                                    <p className="text-xs text-gray-600 flex items-center gap-1 truncate">
                                        <Mail className="h-3 w-3 flex-shrink-0" />
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* User Details */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-700">User ID</span>
                                    <Badge variant="secondary" className="font-mono text-xs">
                                        {user.id.slice(0, 8)}...
                                    </Badge>
                                </div>

                                {user.createdAt && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Member Since
                                        </span>
                                        <span className="text-xs text-gray-600">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                {user.emailVerified && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                                            <Shield className="h-3 w-3" />
                                            Email Status
                                        </span>
                                        <Badge variant="default" className="text-xs">
                                            Verified
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Navigation and Actions */}
                            <div className="flex flex-col gap-2">
                                {pathname === '/dashboard' ? (
                                    <Button variant="default" onClick={handleNavigateToTasks} className="w-full h-8 text-xs">
                                        <CheckSquare className="h-3 w-3" />
                                        Go to Tasks
                                    </Button>
                                ) : (
                                    <Button variant="default" onClick={handleNavigateToDashboard} className="w-full h-8 text-xs">
                                        <ArrowLeft className="h-3 w-3" />
                                        Back to Dashboard
                                    </Button>
                                )}
                                <Button variant="outline" onClick={handleSignOut} className="w-full h-8 text-xs">
                                    <LogOutIcon className="h-3 w-3" />
                                    Sign Out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default UserAvatar
