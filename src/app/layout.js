import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StateContextProvider } from "../context/stateContext";
import { TodoContextProvider } from "../context/TodoContext";
import { SortnFilterContextProvider } from "@/context/SortnFilterContext";
import NavbarDemo from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "Taskmachina",
  title: {
    default: "Taskmachina — Smart Todo & Task Manager",
    template: "%s | Taskmachina",
  },
  description:
    "Taskmachina is a fast, modern, privacy-first todo and task manager. Capture tasks, add deadlines, sort and filter effortlessly, and ship more—on web and mobile.",
  keywords: [
    "todo app",
    "task manager",
    "productivity",
    "to-do list",
    "reminders",
    "projects",
    "deadline tracking",
    "task prioritization",
    "Taskmachina",
  ],
  authors: [{ name: "Taskmachina" }],
  creator: "Taskmachina",
  publisher: "Taskmachina",
  category: "Productivity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Taskmachina — Smart Todo & Task Manager",
    description:
      "Plan, prioritize, and complete tasks faster with Taskmachina. Powerful sorting, filtering, and deadlines that keep you on track.",
    siteName: "Taskmachina",
    images: [
      {
        url: "/feature1.jpg",
        width: 1200,
        height: 630,
        alt: "Taskmachina dashboard preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taskmachina — Smart Todo & Task Manager",
    description:
      "Your all-in-one todo manager with blazing-fast UX, deadlines, and advanced filters.",
    images: ["/feature1.jpg"],
    creator: "@taskmachina",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/calendar-logo.svg",
    apple: "/calendar-logo.svg",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
  ],
  colorScheme: "light dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  referrer: "origin-when-cross-origin",
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="/calendar-logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TodoContextProvider>
          <StateContextProvider>
            <SortnFilterContextProvider>
              <NavbarDemo />
              {children}
              <Footer />
              <Toaster />
            </SortnFilterContextProvider>
          </StateContextProvider>
        </TodoContextProvider>
      </body>
    </html>
  );
}
