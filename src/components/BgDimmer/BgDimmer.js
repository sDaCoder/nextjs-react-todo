"use client"
import useStatedata from '@/app/hooks/useStatedata';
import React from 'react'

const BgDimmer = () => {

    const { isOpen, setIsOpen, isSmallScreen } = useStatedata();

    return (
        <>
            {/* For dimming the background in large screens, when the drawer or dialog is open */}
            {(isOpen && !isSmallScreen) && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    aria-hidden="true"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    )
}

export default BgDimmer