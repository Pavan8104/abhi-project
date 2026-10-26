import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | SARVA NATURAL — Earth • Health • Wellness",
  description:
    "The journey of SARVA NATURAL: How our quest for unadulterated Ayurvedic botanicals led to our signature trio of Moringa, Triphala, and Ashwagandha.",
};

export default function OurStoryPage() {
  return (
    <div className="bg-ayur-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Roots &amp; Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ayur-dark leading-tight">
            Our Story: Rediscovering Pure Potency
          </h1>
          <div className="w-16 h-0.5 bg-ayur-gold mx-auto my-4" />
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-xl border border-ayur-border shadow-soft space-y-6 text-sm text-stone-700 leading-relaxed font-sans mb-10">
          <h2 className="font-serif text-2xl font-bold text-ayur-dark">
            The Quest for Authentic Botanical Purity
          </h2>
          <p>
            The story of <strong>SARVA NATURAL</strong> began with a disheartening realization. While visiting herbal processing units across North India, our founders observed a troubling trend: ancient Ayurvedic preparations were being stripped of their therapeutic integrity. Herbs were blended with chemical anti-caking agents, scorched under rapid hot-air drying to reduce processing times, and encapsulated in cheap animal-derived gelatin shells.
          </p>
          <p>
            Traditional texts like the <em>Charaka Samhita</em> and <em>Bhavaprakasha</em> are unequivocal: herbs must be harvested at the correct biological maturity, shade-dried to safeguard volatile phytochemicals, and administered without adulteration.
          </p>

          <h2 className="font-serif text-2xl font-bold text-ayur-dark pt-4 border-t border-stone-100">
            A Return to Classical Mastery
          </h2>
          <p>
            Instead of building an empire of mediocre products, we made a vow to master just three foundational formulations:
          </p>
          <div className="space-y-4 my-4">
            <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-200/60">
              <h4 className="font-serif font-bold text-base text-emerald-950 mb-1">Organic Moringa Oleifera (Shigru)</h4>
              <p className="text-xs text-stone-600">Sourced from organic farmlands where mature leaves are hand-picked at dawn, washed in pure water, and dried under shade below 40°C to preserve heat-sensitive bio-flavonoids.</p>
            </div>
            <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200/60">
              <h4 className="font-serif font-bold text-base text-amber-950 mb-1">Classical Equal-Ratio Triphala</h4>
              <p className="text-xs text-stone-600">We refuse commercial shortcuts that skimp on Haritaki or Bibhitaki. Our Triphala maintains the canonical 1:1:1 ratio formulated strictly from de-seeded fruit pulp.</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <h4 className="font-serif font-bold text-base text-ayur-dark mb-1">Standardized Ashwagandha Root Extract</h4>
              <p className="text-xs text-stone-600">Derived exclusively from mature Withania somnifera roots, verified for active withanolides without any synthetic cortisol-modulating additives.</p>
            </div>
          </div>

          <p>
            Today, SARVA NATURAL stands as a sanctuary of honest herbal integrity for patrons across India seeking real wellness rooted in the soil, vetted by science, and honored by tradition.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/collections/all-products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-ayur-primary text-white font-semibold text-xs uppercase tracking-wider rounded hover:bg-ayur-secondary transition-colors shadow-sm"
          >
            <span>Explore The 3 Formulations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
