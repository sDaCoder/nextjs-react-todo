"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signIn, signInGithub } from '../../../server/users'
import { useState } from 'react'
import { toast } from 'sonner'
import { redirect, useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const loginSubmit = async (e) => {
        setIsLoading(true);
        const {success, message} = await signIn(email, password);
        e.preventDefault();

        if(success)
        {
            setEmail('');
            setPassword('');
            toast.success('Logged in successfully');
            router.push('/dashboard');
        }
        else
        {
            toast.error(message);
        }
        setIsLoading(false);
    }

    const handleLoginGithub = async () => {
        setIsLoading(true);
        await signInGithub();
        setIsLoading(false);
        redirect('/dashboard');
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); console.log(e.target.value) }}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password" 
                                    placeholder="**********" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); console.log(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="button" onClick={loginSubmit} className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
                                </Button>
                                {/* <Button type="button" variant="outline" className="w-full" onClick={handleLoginGithub}>
                                    {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : 'Login with Github'}
                                </Button> */}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default LoginForm