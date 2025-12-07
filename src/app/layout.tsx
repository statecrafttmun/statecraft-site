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

export const metadata: Metadata = {
  title: {
    template: "%s | Model United Nations",
    default: "Model United Nations",
  },
  description: "Empowering the next generation of leaders through diplomacy, dialogue, and change. Join our Model United Nations society.",
  keywords: ["MUN", "Model United Nations", "Diplomacy", "Debate", "Leadership", "Students"],
  openGraph: {
    title: "Model United Nations",
    description: "Empowering the next generation of leaders.",
    url: "https://example.com", // Replace with actual domain
    siteName: "Model United Nations",
    images: [
      {
        url: "https://example.com/og-image.jpg", // Replace with actual image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
