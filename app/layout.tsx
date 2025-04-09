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
  title: "SydneyShuttle - Badminton Court Booking",
  description: "Find and book available badminton courts across Sydney in just a few clicks",
  keywords: ["badminton", "sydney", "court booking", "NBC", "KBC", "Alpha", "badminton courts"],
  authors: [{ name: "SydneyShuttle" }],
  creator: "SydneyShuttle",
  publisher: "SydneyShuttle",
  openGraph: {
    title: "SydneyShuttle - Badminton Court Booking",
    description: "Find and book available badminton courts across Sydney in just a few clicks",
    type: "website",
    siteName: "SydneyShuttle",
  },
  twitter: {
    card: "summary_large_image",
    title: "SydneyShuttle - Badminton Court Booking",
    description: "Find and book available badminton courts across Sydney in just a few clicks",
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
