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
import { BrandLogo } from '../Navbar/Navbar'

const SignupForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const uploadImageIfAny = async () => {
        if (!imageFile) return undefined;
        // Cloudinary unsigned upload
        // Requires env: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        if (!cloudName || !uploadPreset) {
            toast.error('Image upload not configured. Missing Cloudinary env vars.');
            return undefined;
        }
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', uploadPreset);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText || 'Image upload failed');
        }
        const data = await res.json();
        return data.secure_url;
    }

    const signupSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let imageUrl;
        try {
            imageUrl = await uploadImageIfAny();
        } catch (err) {
            toast.error('Failed to upload image');
            setIsLoading(false);
            return;
        }
        const {success, message} = await signUp(name, email, password, imageUrl);

        if(success)
        {
            setName('');
            setEmail('');
            setPassword('');
            setImageFile(null);
            setImagePreview('');
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
            <Card className='z-[+1] shadow-lg bg-background/70 backdrop-blur-[4px] supports-[backdrop-filter]:bg-background/75'>
                <CardHeader>
                    <BrandLogo className='flex-col py-4'/>
                    <CardTitle>Create a new account</CardTitle>
                    <CardDescription>
                        Please fill up the form to create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={signupSubmit}>
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
                            <div className="grid gap-3">
                                <Label htmlFor="avatar">Profile image (optional)</Label>
                                <Input 
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setImageFile(file || null);
                                        if (file) setImagePreview(URL.createObjectURL(file));
                                        else setImagePreview('');
                                    }}
                                />
                                {imagePreview && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={imagePreview} alt="Selected avatar preview" className="h-20 w-20 rounded-full object-cover border" />
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <RainbowButton 
                                    type="submit" 
                                    className="w-full"
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