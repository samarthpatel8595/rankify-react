import type { Metadata } from "next";
import LayoutShell from "@/components/common/LayoutShell";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rankify-365 | The Autonomous SEO Intelligence System",
  description: "Combines AEO, GEO, and GEN optimization into one unified AI engine helping your brand rank on Google, dominate AI Overviews, and get cited by LLMs.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
} 
