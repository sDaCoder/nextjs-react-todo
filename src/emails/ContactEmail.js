import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';
import { config } from 'dotenv';

config({ path: '.env.local' });

const ContactFormResponse = (props) => {
    const { customerName, customerEmail, userMessage, supportEmail } = props;

    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Thank you for contacting us - We've received your message</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">

                        <Section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-[8px] p-[32px] text-center">
                            <Heading className="text-[28px] font-bold tracking-tight mb-[8px] m-0">
                                TaskMachinà
                            </Heading>
                        </Section>

                        <Section>
                            <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] text-center">
                                Thank You for Reaching Out!
                            </Heading>

                            <Text className="text-[16px] text-gray-700 mb-[20px] leading-[24px]">
                                Hello {customerName},
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[20px] leading-[24px]">
                                We've successfully received your message through our website contact form. Thank you for taking the time to get in touch with us!
                            </Text>

                            <Section className="bg-blue-50 rounded-[8px] p-[24px] mb-[24px]">
                                <Text className="text-[14px] text-gray-600 mb-[12px] font-semibold">
                                    Your Message:
                                </Text>
                                <Text className="text-[14px] text-gray-700 mb-[8px] leading-[20px] bg-white p-[16px] rounded-[4px] border">
                                    {userMessage}
                                </Text>
                                <Text className="text-[12px] text-gray-500 mt-[12px]">
                                    Contact Email: {customerEmail}
                                </Text>
                            </Section>

                            <Text className="text-[16px] text-gray-700 mb-[20px] leading-[24px]">
                                Our team is currently reviewing your inquiry and will respond within 24-48 hours during business days. We appreciate your patience and look forward to assisting you.
                            </Text>

                            <Section className="bg-gray-50 rounded-[8px] p-[24px] mb-[24px] border-l-[4px] border-solid border-blue-600">
                                <Text className="text-[14px] text-gray-600 mb-[12px] font-semibold">
                                    What happens next?
                                </Text>
                                <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                                    • Our team will review your message carefully
                                </Text>
                                <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                                    • You'll receive a personalized response within 1-2 business days
                                </Text>
                                <Text className="text-[14px] text-gray-600 mb-[0px] leading-[20px]">
                                    • For urgent matters, feel free to call us directly
                                </Text>
                            </Section>

                            <Text className="text-[16px] text-gray-700 mb-[20px] leading-[24px]">
                                If you have any urgent questions or need immediate assistance, please don't hesitate to contact us directly at{' '}
                                <Link href={`mailto:${process.env.EMAIL_USER || "supravadutta_sda@outlook.com"}`} className="text-blue-600 underline">
                                    {process.env.EMAIL_USER || "supravadutta_sda@outlook.com"}
                                </Link>.
                            </Text>

                            <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                                Best regards,<br />
                                The TaskMachinà Team
                            </Text>
                        </Section>

                        <Section className="border-t border-gray-200 pt-[24px]">
                            <Text className="text-[12px] text-gray-500 text-center mb-[8px] m-0">
                                TaskMachinà | Visit our website:{' '}
                                <Link href={process.env.NEXT_PUBLIC_SITE_URL} className="text-blue-600 underline">
                                    {process.env.NEXT_PUBLIC_SITE_URL}
                                </Link>
                            </Text>
                            <Text className="text-[12px] text-gray-500 text-center m-0">
                                &copy; {new Date().getFullYear()} TaskMachinà. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

ContactFormResponse.PreviewProps = {
    customerName: "John Smith",
    customerEmail: "john@example.com",
};

export default ContactFormResponse;