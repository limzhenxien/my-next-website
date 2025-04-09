import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Website - A Modern Web Application",
  description: "A modern web application built with Next.js, TypeScript, and Tailwind CSS",
  keywords: ["next.js", "react", "typescript", "tailwind css", "web application"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
  openGraph: {
    title: "My Website - A Modern Web Application",
    description: "A modern web application built with Next.js, TypeScript, and Tailwind CSS",
    type: "website",
    siteName: "My Website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Website - A Modern Web Application",
    description: "A modern web application built with Next.js, TypeScript, and Tailwind CSS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
