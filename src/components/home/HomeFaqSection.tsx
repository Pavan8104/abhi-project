"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export function HomeFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Why does SARVA NATURAL only make Moringa, Triphala, and Ashwagandha?",
      a: "Classical Ayurveda teaches that human wellness rests on three cornerstone foundations: Whole-Food Cellular Nutrition (Moringa), Colon Detox & Gut Elimination (Triphala), and Adrenal Resilience & Deep Rest (Ashwagandha). Rather than mass-manufacturing dozens of diluted products, we focus exclusively on sourcing, standardizing, and testing these three master botanicals to ensure peerless efficacy.",
    },
    {
      q: "Are SARVA NATURAL capsules 100% vegetarian?",
      a: "Yes. All our formulations use premium plant-derived HPMC (Hydroxypropyl Methylcellulose) vegetarian capsules. We never use animal gelatin, bovine byproducts, or synthetic shellac coatings.",
    },
    {
      q: "Can I take Moringa, Triphala, and Ashwagandha together?",
      a: "Yes, they complement each other synergistically. Classical Ayurvedic protocol recommends taking Moringa in the morning after breakfast for sustained natural energy, Ashwagandha in the evening after dinner for stress reduction, and Triphala at bedtime with warm water for gentle overnight colon cleansing.",
    },
    {
      q: "Are your batches tested for heavy metals and pesticides?",
      a: "Every single production batch undergoes rigorous ICP-MS spectrometry screening for Lead, Mercury, Arsenic, and Cadmium, as well as microbiological assay testing. Our facility operates under strict AYUSH Good Manufacturing Practices (Schedule T).",
    },
    {
      q: "How soon can I expect results from these classical formulations?",
      a: "Triphala typically produces noticeable digestive comfort within 24 to 48 hours. Moringa provides enhanced vitality and morning alertness within 7 to 10 days. Ashwagandha shows cumulative adaptogenic benefits for sleep quality and stress resilience over 2 to 4 weeks of consistent daily use.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-ayur-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ayur-sageSubtle text-ayur-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-ayur-gold" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto">
            Everything you need to know about our sourcing, classical dosage, vegetarian capsules, and delivery.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-ayur-border/80 rounded-lg overflow-hidden transition-all bg-ayur-parchment/20"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-ayur-dark hover:text-ayur-primary transition-colors"
                >
                  <span className="font-serif">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-ayur-primary flex-shrink-0 transition-transform duration-200 ml-3 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-ayur-border/40 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/pages/faqs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ayur-primary hover:text-ayur-secondary"
          >
            <span>View All Detailed FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
