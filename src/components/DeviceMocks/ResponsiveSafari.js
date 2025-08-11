"use client"
import React from 'react'
import { Safari } from '../magicui/safari'

const ResponsiveSafari = ({ url, imageSrc, maxWidth = "1200px", className = "" }) => {
    return (
        <div 
            className={`relative mx-auto ${className}`}
            style={{ maxWidth }}
        >
            <Safari
                url={url}
                imageSrc={imageSrc}
                // Keep original aspect ratio but let CSS handle the sizing
                width={1203}
                height={753}
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%'
                }}
            />
        </div>
    )
}

export default ResponsiveSafari
