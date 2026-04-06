import type { Metadata } from "next";
import { Inter, Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JS Financials | Quantitative Trading & Macroeconomic Research",
    template: "%s | JS Financials",
  },
  description:
    "Institutional-grade quantitative trading education and macroeconomic research by Jackson Semenas. Courses, daily reports, mentorship, and live trading community.",
  keywords: [
    "quantitative trading",
    "macroeconomics",
    "algorithmic trading",
    "trading education",
    "financial markets",
    "quant research",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
