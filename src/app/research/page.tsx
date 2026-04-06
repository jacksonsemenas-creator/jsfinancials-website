import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Published research and working papers by Jackson Semenas, spanning macroeconomics, quantitative finance, and economic policy.",
};

const publications = [
  {
    title:
      "Balancing Immigration and Inflation in the Australian Economy: A Policy Proposal",
    type: "Economic Policy Proposal",
    date: "October 2025",
    status: "Submitted to the Australian Treasury for review and implementation",
    abstract:
      "This paper proposes a framework for balancing immigration intake with inflationary pressures in the Australian economy, analysing the transmission mechanisms through housing, labour markets, and aggregate demand.",
    tags: ["Macroeconomics", "Economic Policy", "Australia"],
  },
];

const workingPapers = [
  {
    title: "Research papers will be published here",
    description:
      "Upcoming publications on quantitative methods, market microstructure, and applied statistical modelling will appear in this section.",
  },
];

export default function ResearchPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Research & Publications
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Published research and working papers spanning macroeconomics,
            quantitative finance, market microstructure, and economic policy.
          </p>
        </div>
      </section>

      {/* Publications */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-8">
            Publications
          </h2>

          <div className="space-y-8">
            {publications.map((pub) => (
              <article
                key={pub.title}
                className="border border-gray-200 rounded-xl p-6 hover:border-gold/40 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-semibold rounded">
                    {pub.type}
                  </span>
                  <span className="text-gray-400 text-xs">{pub.date}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy mb-2">
                  {pub.title}
                </h3>
                <p className="text-sm text-gold/80 font-medium mb-3">
                  {pub.status}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {pub.abstract}
                </p>
                <div className="flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-navy/5 text-navy text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Working Papers / Coming Soon */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-8">
            Working Papers
          </h2>
          <div className="space-y-6">
            {workingPapers.map((paper) => (
              <div
                key={paper.title}
                className="bg-white border border-dashed border-gray-300 rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-gray-400 mb-2">
                  {paper.title}
                </h3>
                <p className="text-gray-400 text-sm">{paper.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-8 text-center">
            Research Areas
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Quantitative Methods in Finance",
              "Macroeconomic Theory & Policy",
              "Market Microstructure",
              "Latency Arbitrage & HFT",
              "Applied Statistical Modelling",
              "Stochastic Processes",
              "Cross-Asset Analysis",
              "Economic Policy Design",
            ].map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-navy font-medium text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
