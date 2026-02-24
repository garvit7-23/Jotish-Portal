import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Astrology Portal",
  description: "Astrologer discovery platform with insights and AI analysis",
  openGraph: {
    title: "Astrology Portal",
    description: "Discover astrologers, insights and cosmic guidance",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astrology Portal",
    description: "Discover astrologers and AI-powered insights",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        <main className="px-6 pt-6">
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  );
}