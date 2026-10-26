import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Sarthak Dilip Deore — Software Engineer & AI Systems",
  description:
    "Software Engineer specializing in Agentic AI systems, full-stack architecture, machine learning analytics, and high-performance web systems.",
  openGraph: {
    title: "Sarthak Dilip Deore — Software Engineer & AI Systems",
    description: "Agentic AI, Full-Stack Architecture & Predictive Machine Learning",
    url: "https://github.com/sarthak-codes11",
    siteName: "Sarthak Deore Portfolio",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black font-sans selection:bg-neutral-900 selection:text-white">
        <Navigation />
        <div className="flex-1 w-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
