import transporter from "@/emails/transporter";
import { config } from "dotenv";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import ContactFormResponse from "@/emails/ContactEmail";

config({ path: ".env.local" });

export async function POST(request) {
    const { name, email, message } = await request.json();

    const html = await render(
        <ContactFormResponse
            customerName={name}
            customerEmail={email}
            userMessage={message}
        />
    )

    const mailOptions = {
        // from: process.env.EMAIL_USER,
        from: {
            name: "Suprava Dutta from TaskMachinà",
            address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Thank you for contacting us - We've received your message",
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return NextResponse.json({ name, email, message });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}