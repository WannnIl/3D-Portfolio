import type { Metadata } from "next";
import { Cinzel, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const primaryFont = Cinzel({
  weight: ["400", "700", "900"],
  variable: "--font-primary",
  subsets: ["latin"],
});

const secondaryFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "Awwwards Portfolio | 3D Cinematic",
  description: "Immersive 3D cinematic portfolio built with Next.js, R3F, and GSAP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${primaryFont.variable} ${secondaryFont.variable} antialiased dark`}>
      <body className="bg-black text-white font-secondary min-h-screen selection:bg-blue-600 selection:text-white overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
