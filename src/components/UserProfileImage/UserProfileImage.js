"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Pencil } from 'lucide-react';
import { authClient } from '../../../lib/auth-client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

const UserProfileImage = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const user = session.user;
    const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.email?.[0]?.toUpperCase() || 'U';

    const handleDeleteImage = async () => {
        if (!user?.id) return;
        try {
            setIsDeleting(true);
            const res = await axios.patch(`/api/${user.id}`, {
                image: user.image
            });
            console.log(res.data);
            toast.success('Profile image removed');
            router.refresh();
            setIsDialogOpen(false);
        } catch (error) {
            console.log("Error in deleting the user image: ", error);
            toast.error(error?.message || "Failed to delete image");
        } finally {
            setIsDeleting(false);
        }
        // try {
        //     setIsDeleting(true);
        //     const res = await fetch(`/api/${user.id}`, { method: 'DELETE' });
        //     if (!res.ok) {
        //         console.error('Failed to delete image');
        //     }
        //     // Refresh data and close dialog
        //     router.refresh();
        //     setIsDialogOpen(false);
        // } catch (e) {
        //     console.error(e);
        //     toast.error('Failed to delete image');
        // } finally {
        //     setIsDeleting(false);
        // }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="relative group h-12 w-12 cursor-pointer rounded-full hover:shadow-lg transition-shadow duration-300" size="icon">
                        <Avatar className="h-12 w-12 cursor-pointer">
                            <AvatarImage src={user.image} alt={user.name || user.email} />
                            <AvatarFallback className="text-sm font-semibold">
                                {userInitials}
                            </AvatarFallback>
                        </Avatar>
                        <span className='absolute inset-0 flex items-center justify-center bg-black/20 border-2 border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <Pencil />
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle asChild>
                            <h1 className='text-2xl font-bold'>
                                Update Profile Image
                            </h1>
                        </DialogTitle>
                        {/* <DialogDescription>
                            Update your profile image here. Click save when you're done.
                        </DialogDescription> */}
                        <div className='space-y-2 mx-auto'>
                            {user.image ? (
                                <Image
                                    quality={100}
                                    src={user.image}
                                    alt={user.name || user.email}
                                    width={200}
                                    height={200}
                                    className='rounded-full object-cover aspect-square border-2 border-foreground my-4'
                                />
                            ) : (
                                <Avatar className='h-[200px] w-[200px] rounded-full border-2 border-foreground my-4'>
                                    <AvatarFallback className='text-5xl font-semibold'>
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button className="w-full" variant="outline">
                            {user.image ? 'Update Image' : 'Add Image'}
                        </Button>
                        {user.image &&
                            (<Button
                                disabled={!user.image || isDeleting}
                                className="w-full"
                                type="button"
                                onClick={handleDeleteImage}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Image'}
                            </Button>)
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UserProfileImage