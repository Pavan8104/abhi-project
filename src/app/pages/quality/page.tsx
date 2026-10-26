import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Leaf, FileCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality & Lab Standards | SARVA NATURAL — Earth • Health • Wellness",
  description:
    "Explore SARVA NATURAL's rigorous quality framework: ICP-MS heavy metal testing, AYUSH GMP facility compliance, and 100% vegetarian HPMC capsules.",
};

export default function QualityPage() {
  const testingProtocols = [
    {
      title: "ICP-MS Heavy Metal Spectrometry",
      desc: "Inductively Coupled Plasma Mass Spectrometry screening for Lead, Mercury, Arsenic, and Cadmium to ensure all levels fall well below the permissible Ayurvedic Pharmacopoeia of India limits.",
    },
    {
      title: "Microbiological Pathogen Assay",
      desc: "Complete screening for Salmonella, E. coli, Pseudomonas aeruginosa, and total fungal count to guarantee microbial safety across every lot.",
    },
    {
      title: "Active Marker Compound Assay",
      desc: "Standardized active withanolide assay for Ashwagandha and polyphenol/tannin verification for Triphala and Moringa.",
    },
    {
      title: "Zero Synthetic Excipients Guarantee",
      desc: "Zero talc, zero magnesium stearate, zero artificial coloring, and zero chemical flow agents. Encapsulated in 100% vegetarian plant cellulose.",
    },
  ];

  return (
    <div className="bg-ayur-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Testing Standards</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ayur-dark leading-tight">
            Purity Without Compromise
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed font-sans">
            We believe that wellness products should be transparent. Discover the scientific benchmarks, laboratory testing, and manufacturing rigor behind every SARVA NATURAL capsule.
          </p>
        </div>

        {/* Quality Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {testingProtocols.map((p, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl border border-ayur-border shadow-soft">
              <div className="w-10 h-10 rounded-full bg-ayur-parchment flex items-center justify-center text-ayur-primary mb-3 border border-ayur-gold/30">
                <FileCheck className="w-5 h-5 text-ayur-gold" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ayur-dark mb-2">{p.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Vegetarian Guarantee Banner */}
        <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-xl shadow-card mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center flex-shrink-0 text-ayur-gold">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-1 text-ayur-goldLight">
                100% Vegetarian HPMC Capsules
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Many capsules in the market are covertly made of gelatin—an animal byproduct derived from boiling bovine or porcine skin and bones. SARVA NATURAL uses only pharmaceutical-grade HPMC (Hydroxypropyl Methylcellulose) derived entirely from sustainable plant cellulose. Pure, ethical, and suitable for strict vegetarians.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Table */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-ayur-border shadow-soft mb-12">
          <h3 className="font-serif text-xl font-bold text-ayur-dark mb-4">
            Official Manufacturing Certifications
          </h3>
          <div className="divide-y divide-stone-100 text-xs font-sans">
            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="text-ayur-dark block">AYUSH GMP Licensed (Schedule T)</strong>
                <span className="text-stone-500">Ministry of AYUSH, Government of India Good Manufacturing Standards</span>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">VERIFIED</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="text-ayur-dark block">ISO 22000 &amp; HACCP Compliant</strong>
                <span className="text-stone-500">Hazard Analysis Critical Control Point Food Safety System</span>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">VERIFIED</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <strong className="text-ayur-dark block">ICP-MS Heavy Metal Clearance</strong>
                <span className="text-stone-500">Every single batch cleared for Lead, Mercury, Arsenic, Cadmium</span>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/collections/all-products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-ayur-primary text-white font-semibold text-xs uppercase tracking-wider rounded hover:bg-ayur-secondary transition-colors shadow-sm"
          >
            <span>Browse Lab-Tested Formulations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
