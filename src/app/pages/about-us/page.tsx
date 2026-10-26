import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | SARVA NATURAL — Earth • Health • Wellness",
  description:
    "Learn about SARVA NATURAL's commitment to classical Ayurvedic formulations, 100% vegetarian capsules, and pure botanical sourcing.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-ayur-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 rounded-full bg-ayur-parchment overflow-hidden border-2 border-ayur-gold/40 shadow-sm mx-auto mb-4 flex items-center justify-center">
            <Image
              src="/images/sarva-natural-emblem.png"
              alt="SARVA NATURAL"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-ayur-primary font-sans block mb-1">
            Our Purpose &amp; Lineage
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ayur-dark leading-tight">
            Earth &bull; Health &bull; Wellness
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed font-sans">
            SARVA NATURAL was established on a radical standard in modern wellness: rejecting commercial shortcuts to formulate only pure, classical Ayurvedic botanicals tested for absolute purity.
          </p>
        </div>

        {/* Narrative */}
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-ayur-border shadow-soft space-y-6 text-sm text-stone-700 leading-relaxed font-sans mb-10">
          <h2 className="font-serif text-2xl font-bold text-ayur-dark">
            The Philosophy of Restraint
          </h2>
          <p>
            In today&apos;s commercial landscape, wellness brands race to release dozens of trendy products every season—often diluting active ingredients with synthetic excipients, silicon dioxide, and bovine gelatin capsules.
          </p>
          <p>
            At <strong>SARVA NATURAL</strong>, we practice deliberate restraint. We formulate exclusively around the three most revered botanical masterworks of classical Ayurvedic science:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-ayur-parchment/40 rounded-lg border border-ayur-border">
              <h3 className="font-serif font-bold text-base text-ayur-dark mb-1">1. Moringa (Shigru)</h3>
              <p className="text-xs text-stone-600">The premier botanical whole-food multivitamin providing 90+ plant nutrients and natural vitality.</p>
            </div>
            <div className="p-4 bg-ayur-parchment/40 rounded-lg border border-ayur-border">
              <h3 className="font-serif font-bold text-base text-ayur-dark mb-1">2. Triphala Rasayana</h3>
              <p className="text-xs text-stone-600">The classical equal 1:1:1 synergy of Amalaki, Haritaki, and Bibhitaki for gentle colon detox.</p>
            </div>
            <div className="p-4 bg-ayur-parchment/40 rounded-lg border border-ayur-border">
              <h3 className="font-serif font-bold text-base text-ayur-dark mb-1">3. Ashwagandha</h3>
              <p className="text-xs text-stone-600">Pure root extract standardized with withanolides to reduce stress and foster restorative sleep.</p>
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold text-ayur-dark pt-4 border-t border-stone-100">
            Our Strict Quality Commitments
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span><strong>100% Plant-Based HPMC Capsules:</strong> We never compromise with animal gelatin or bovine collagen shells.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span><strong>ICP-MS Spectrometry Testing:</strong> Every batch is independently verified for zero toxic heavy metals (Lead, Mercury, Cadmium, Arsenic).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span><strong>AYUSH GMP Licensed Facility:</strong> Manufactured strictly under certified Good Manufacturing Practices (Schedule T).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span><strong>Zero Fillers or Binders:</strong> No magnesium stearate, artificial food dyes, or preservative powders.</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-ayur-primary text-white rounded-xl shadow-card">
          <h3 className="font-serif text-2xl font-bold mb-2 text-ayur-gold">Experience The Three Formulations</h3>
          <p className="text-xs text-ayur-sand/80 max-w-md mx-auto mb-6">
            Begin your journey towards grounded digestion, vibrant cellular energy, and tranquil restorative sleep.
          </p>
          <Link
            href="/collections/all-products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ayur-gold text-ayur-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-ayur-goldMuted transition-colors"
          >
            <span>Explore All 3 Formulations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
