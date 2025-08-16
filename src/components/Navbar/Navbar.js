// "use client"
// import Link from 'next/link'
// import React from 'react'
// import { Button } from '../ui/button'

// const Navbar = () => {

//     return (
//         <div className='relative w-full'>

//             {/* <h1>This is the home page</h1> */}
//             {/* <div className='flex items-center justify-start m-6 gap-4'>
//                 <Link className='text-blue-800 underline' href="/tasks">Navigate to tasks</Link>
//                 <Link className='text-blue-800 underline' href="/dashboard">Navigate to dashboard</Link>
//             </div> */}
//             <div className='flex items-center justify-start m-6 gap-4'>
//                 {/* <Button asChild><Link href="/login">Login</Link></Button>
//                 <Button asChild><Link href="/signup">Signup</Link></Button> */}
//             </div>
//             {/* <DemoSendEmail /> */}
//             <Navbar></Navbar>
//         </div>
//     )
// }

// export default Navbar

"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { cn } from "@/lib/utils";
import { Calendar1Icon } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function NavbarDemo() {

    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter()


    if (pathname === "/tasks" || pathname === "/dashboard") {
        return null
    }

    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        // {
        //     name: "About Us",
        //     link: "/about",
        // },
        {
            name: "Contact Us",
            link: "/contact",
        },
    ];

    return (
        <div className="w-full sticky top-0 z-50 ">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    {/* <NavbarLogo /> */}
                    {/* <Calendar1Icon className="h-6 w-6 text-blue-600" /> */}
                    <Link href="/">
                        <BrandLogo />
                    </Link>
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="secondary" onClick={() => {
                            router.push("/login")
                        }}>
                            Login
                        </NavbarButton>
                        <NavbarButton variant="primary" onClick={() => {
                            router.push("/signup")
                        }}>
                            Register
                        </NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <Calendar1Icon className="h-6 w-6" />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                        {navItems.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300">
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => { setIsMobileMenuOpen(false); router.push("/login") }}
                                variant="primary"
                                className="w-full">
                                Login
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => { setIsMobileMenuOpen(false); router.push("/signup") }}
                                variant="primary"
                                className="w-full">
                                Register
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
            {/* Navbar */}
        </div>
    );
}

export const BrandLogo = ({
    className = ""
}) => {
    return (
        <>
            <div className={cn("flex items-center gap-2", className)}>
                <Calendar1Icon className="h-6 w-6" stroke="black" strokeWidth={3} />
                <h1 className="text-xl font-bold tracking-tight">TaskMachinà</h1>
            </div>
        </>
    )
}