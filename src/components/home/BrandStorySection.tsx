"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, CheckCircle2 } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="py-14 sm:py-20 bg-ayur-parchment/40 border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Visual Composition */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-xl overflow-hidden shadow-card border border-ayur-border bg-white p-6 sm:p-8 relative">
                <div className="w-16 h-16 rounded-full bg-ayur-parchment overflow-hidden border-2 border-ayur-gold/40 shadow-sm mx-auto mb-6 flex items-center justify-center">
                  <Image
                    src="/images/sarva-natural-emblem.png"
                    alt="SARVA NATURAL"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ayur-dark text-center mb-2">
                  SARVA NATURAL
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-ayur-primary font-bold text-center mb-6">
                  Earth &bull; Health &bull; Wellness
                </p>
                <div className="space-y-3.5 text-xs text-stone-600 font-sans border-t border-stone-100 pt-5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-ayur-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Ancient Wisdom, Modern Integrity:</strong> We strictly specialize in only classical botanicals that have stood the test of centuries.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-ayur-gold flex-shrink-0 mt-0.5" />
                    <span><strong>100% Plant-Powered:</strong> Clean vegetarian HPMC capsules with zero bovine gelatin, binders, or artificial colors.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-ayur-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Radical Transparency:</strong> What is on the label is exactly what is inside. No proprietary blends.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ayur-sageLight text-ayur-primary text-xs font-semibold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Our Guiding Philosophy</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark leading-tight">
              Why We Formulate Only Three Cornerstone Herbs
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              In an industry overwhelmed by hundreds of diluted multivitamins and trendy concoctions, SARVA NATURAL was founded on a deliberate principle: <strong>Do a few things with uncompromising perfection.</strong>
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Classical Ayurveda identifies three core pillars of lasting human vitality: whole-food nutrition, effortless colon cleansing, and deep restorative nervous system balance. By focusing our complete energy, laboratory testing, and botanical sourcing on <strong>Moringa</strong>, <strong>Triphala</strong>, and <strong>Ashwagandha</strong>, we ensure you receive the most potent, authentic herbal capsules available in India.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/pages/about-us"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ayur-primary hover:text-ayur-secondary group"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pages/quality"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-ayur-dark"
              >
                <span>View Quality &amp; Lab Standards &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
