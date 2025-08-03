import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import VerifyEmail from '@/emails/VerifyEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const body = await req.json();
    const { to, subject, emailType, emailProps } = body;

    try {
        let emailComponent;
        
        // Handle different email types
        if (emailType === 'verify') {
            emailComponent = VerifyEmail(emailProps);
        }
        // Add more email types as needed
        // else if (emailType === 'welcome') {
        //     emailComponent = WelcomeEmail(emailProps);
        // }
        else {
            return NextResponse.json({ success: false, error: 'Invalid email type' }, { status: 400 });
        }

        const response = await resend.emails.send({
            from: 'Suprava Dutta <onboarding@resend.dev>',
            to,
            subject,
            react: emailComponent,
        });

        return NextResponse.json({ success: true, data: response });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
