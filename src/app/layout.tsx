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
  metadataBase: new URL("https://statecrafthansraj.info"),
  title: {
    template: "%s | Model United Nations",
    default: "Model United Nations | Statecraft MUN Society",
  },
  description:
    "Empowering the next generation of leaders through diplomacy, dialogue, and change. Join our Model United Nations society at Hansraj College.",
  keywords: [
    "MUN",
    "Model United Nations",
    "Diplomacy",
    "Debate",
    "Leadership",
    "Students",
    "Hansraj College",
    "StateCraft MUN",
    "StateCraft",
  ],
  authors: [{ name: "Statecraft MUN Society" }],
  creator: "Statecraft MUN Society",
  publisher: "Statecraft MUN Society",
  openGraph: {
    title: "Model United Nations | Statecraft MUN Society",
    description:
      "Empowering the next generation of leaders through diplomacy, dialogue, and change.",
    url: "https://statecrafthansraj.info",
    siteName: "Statecraft MUN Society",
    images: [
      {
        url: "/logo-crest.jpg",
        width: 1200,
        height: 630,
        alt: "Statecraft MUN Society Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Model United Nations | Statecraft MUN Society",
    description:
      "Empowering the next generation of leaders through diplomacy, dialogue, and change.",
    images: ["/logo-crest.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Statecraft MUN Society",
  alternateName: "StateCraft",
  url: "https://statecrafthansraj.info",
  logo: "https://statecrafthansraj.info/logo-crest.jpg",
  description:
    "Model United Nations society at Hansraj College empowering leaders through diplomacy and dialogue.",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased min-h-screen bg-[#020308] text-[#E6E6E6]`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
