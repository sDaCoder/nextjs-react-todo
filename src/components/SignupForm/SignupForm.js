"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signUp } from '../../../server/users'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { RainbowButton } from '../magicui/rainbow-button'

const SignupForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const signupSubmit = async (e) => {
        setIsLoading(true);
        const {success, message} = await signUp(name, email, password);
        e.preventDefault();

        if(success)
        {
            setName('');
            setEmail('');
            setPassword('');
            toast.success('Signed up successfully');
            router.push('/tasks');
        }
        else
        {
            toast.error(message);
        }
        setIsLoading(false);
    }

    return (
        <>
            <Card className='z-[+1] shadow-lg'>
                <CardHeader>
                    <CardTitle>Create a new account</CardTitle>
                    <CardDescription>
                        Please fill up the form to create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value); console.log(e.target.value);}}
                                    placeholder="Suprava Dutta"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value); console.log(e.target.value);}}
                                    placeholder="suprava@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input 
                                    id="password"
                                    placeholder="**********" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value); console.log(e.target.value);}}
                                    required 
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <RainbowButton 
                                    type="button" 
                                    className="w-full"
                                    onClick={signupSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
                                </RainbowButton>
                                {/* <Button variant="outline" className="w-full">
                                    Sign up with Google
                                </Button> */}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="underline underline-offset-4">
                                Log In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default SignupForm