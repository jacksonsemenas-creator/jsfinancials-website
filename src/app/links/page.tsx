import type { Metadata } from "next";
import LinksContent from "./LinksContent";

export const metadata: Metadata = {
  title: "Links | JS Financials",
  description:
    "All links for JS Financials. Quantitative trading mentorship, courses, daily macro reports, and community.",
};

export default function LinksPage() {
  return <LinksContent />;
}
