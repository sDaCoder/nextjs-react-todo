"use client"
import React from 'react'
import Iphone15Pro from '../magicui/iphone-15-pro'

const ResponsiveIphone = ({ src, videoSrc, maxWidth = "300px", className = "" }) => {
    return (
        <div 
            className={`relative mx-auto ${className}`}
            style={{ maxWidth }}
        >
            <Iphone15Pro
                src={src}
                videoSrc={videoSrc}
                // Keep original aspect ratio but let CSS handle the sizing
                width={433}
                height={882}
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%'
                }}
            />
        </div>
    )
}

export default ResponsiveIphone
