import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
    url: "https://statecrafthansraj.info",
    siteName: "HRCMUN Society",
    images: [
      {
        url: "https://statecrafthansraj.info/logo-crest.jpg",
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
      <body className={`${playfair.variable} ${inter.variable} antialiased min-h-screen bg-[#020308] text-[#E6E6E6]`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
