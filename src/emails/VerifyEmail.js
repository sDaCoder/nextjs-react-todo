import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
} from '@react-email/components';

const VerifyEmail = (props) => {
    const { userEmail, verificationLink, companyName } = props;

    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Verify your email address to complete your registration</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="mx-auto bg-white max-w-[600px] px-[48px] py-[40px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-black text-[28px] font-bold m-0 mb-[8px]">
                                Verify Your Email Address
                            </Heading>
                            <Text className="text-gray-600 text-[16px] m-0">
                                Complete your registration to get started
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-black text-[16px] leading-[24px] mb-[16px]">
                                Hello,
                            </Text>
                            <Text className="text-black text-[16px] leading-[24px] mb-[16px]">
                                Thank you for signing up with {companyName}! To complete your registration and secure your account, please verify your email address by clicking the button below.
                            </Text>
                            <Text className="text-gray-600 text-[14px] leading-[20px] mb-[24px]">
                                Email: {userEmail}
                            </Text>
                        </Section>

                        {/* Verification Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={verificationLink}
                                className="bg-black text-white px-[32px] py-[16px] text-[16px] font-semibold no-underline rounded-[8px] box-border"
                            >
                                Verify Email Address
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section className="mb-[32px]">
                            <Text className="text-gray-600 text-[14px] leading-[20px] mb-[16px]">
                                If the button doesn't work, you can copy and paste this link into your browser:
                            </Text>
                            <Text className="text-black text-[14px] leading-[20px] break-all bg-gray-50 p-[12px] rounded-[4px] border border-solid border-gray-200">
                                {verificationLink}
                            </Text>
                        </Section>

                        {/* Security Notice */}
                        <Section className="mb-[32px]">
                            <Hr className="border-gray-200 my-[24px]" />
                            <Text className="text-gray-600 text-[14px] leading-[20px] mb-[8px]">
                                <strong>Security Notice:</strong>
                            </Text>
                            <Text className="text-gray-600 text-[14px] leading-[20px] mb-[16px]">
                                This verification link will expire in 24 hours. If you didn't create an account with us, please ignore this email.
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-t border-solid border-gray-200 pt-[24px]">
                            <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0 mb-[8px]">
                                © 2025 {companyName}. All rights reserved.
                            </Text>
                            <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0 mb-[8px]">
                                123 Business Street, Suite 100, Kolkata, IN 700001
                            </Text>
                            <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0">
                                If you have questions, contact us at support@{companyName.toLowerCase().replace(/\s+/g, '')}.com
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

VerifyEmail.PreviewProps = {
    userEmail: "supravadutta_sda@outlook.com",
    verificationLink: "https://yourwebsite.com/verify?token=abc123xyz789",
    companyName: "Task Machina",
};

export default VerifyEmail;