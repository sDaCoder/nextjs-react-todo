"use client";
import { TodoContext } from '@/Context/TodoContext';
import { usePathname, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

const NavigateProgress = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const delayTime = (ms) => new Promise((res) => setTimeout(res, ms));
    useEffect(() => {
        // let timeout;
        // const startLoading = () => {
        //     setNavigateLoading(true);
        //     timeout = setTimeout(() => {
        //         setNavigateLoading(false);
        //     }, 50);
        // };
        // startLoading();

        // return() => {
        //     clearTimeout(timeout)
        // }

        (async function () {
            // setIsLoading(true);
            await delayTime(1000);
            setIsLoading(false);
        })();
      
    }, [pathname, searchParams])

    const { isLoading, setIsLoading } = useContext(TodoContext);

    return (
        <>
            <div className='fixed top-0 left-0 w-full h-1 bg-white'>
                <div className={`fixed top-0 h-1 left-0 bg-primary transition-all duration-1000 ease-out ${isLoading ? 'w-0' : 'w-full'}`}>
                </div>
            </div>
        </>
    )
}

export default NavigateProgress
