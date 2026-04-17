import type { Metadata } from "next";
import { Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { siteData } from "../lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${siteData.owner} | ${siteData.role}`,
  description: `Personal portfolio of ${siteData.owner}, a ${siteData.role} specializing in Next.js, PostgreSQL, and AI Integrations.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${shareTechMono.variable} font-sans bg-bgPrimary text-textPrimary antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
