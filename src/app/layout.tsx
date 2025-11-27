import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import GlobalNavbar from "@/components/global-navbar";
import { personalInfo } from "@/lib/portfolio-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${personalInfo.name} - Portfolio`,
  description: `Portfolio of ${personalInfo.name}, a software engineer specializing in web and mobile development with expertise in React, Node.js, and more.`,
  openGraph: {
    title: `${personalInfo.name} - Portfolio`,
    description: `Portfolio of ${personalInfo.name}, a software engineer specializing in web and mobile development.`,
    images: [personalInfo.image],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - Portfolio`,
    description: `Portfolio of ${personalInfo.name}, a software engineer specializing in web and mobile development.`,
    images: [personalInfo.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <GlobalNavbar />
        {children}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
      </body>
    </html>
  );
}
