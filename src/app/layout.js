import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { format } from 'date-fns'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Task Machine | Your todo manager",
  description: "This is a todo manager, remembers your every pending!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <h1 className='bg-primary text-primary-foreground font-bold py-2 text-center text-xl'>
          {format(new Date(), "do MMMM, yyyy, eeee")}
        </h1>
        {children}
      </body>
    </html>
  );
}
