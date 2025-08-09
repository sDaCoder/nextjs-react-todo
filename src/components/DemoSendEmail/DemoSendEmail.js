"use client"
import React from 'react'
import { Button } from '../ui/button'
import axios from 'axios'

const DemoSendEmail = () => {
    const sendEmail = async () => {
        try {
            const res = await axios.post('/api/sendMail', {
                to: 'supravadutta_sda@outlook.com',
                subject: 'Verify Your Email Address',
                emailType: 'verify',
                emailProps: {
                    userEmail: 'supravadutta_sda@outlook.com',
                    verificationLink: 'https://localhost:3000/tasks',
                    companyName: 'Task Machina',
                },
            });
            console.log(res.data)   
            console.log('Email sent')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Button onClick={sendEmail}>Send Email</Button>
        </>
    )
}

export default DemoSendEmail