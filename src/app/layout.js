import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StateContextProvider } from "../context/stateContext";
import { TodoContext, TodoContextProvider } from "../context/TodoContext";

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
        <TodoContextProvider>
          <StateContextProvider>
            {children}
            <Toaster />
          </StateContextProvider>
        </TodoContextProvider>
      </body>
    </html>
  );
}
