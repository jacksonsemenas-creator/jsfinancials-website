import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "JS Financials | Quantitative Trading & Macroeconomic Research",
  description:
    "Institutional-grade quantitative trading education and macroeconomic research by Jackson Semenas. Courses, daily reports, mentorship, and live trading community.",
  openGraph: {
    title: "JS Financials | Quantitative Trading & Macroeconomic Research",
    description:
      "Institutional-grade quantitative trading education and macroeconomic research by Jackson Semenas.",
    url: "https://jsfinancials.com.au",
  },
};

export default function Home() {
  return <HomeContent />;
}
