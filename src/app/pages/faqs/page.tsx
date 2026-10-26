"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqsPage() {
  const [openItem, setOpenItem] = useState<string | null>("gen-1");

  const categories = [
    {
      name: "General & Brand Philosophy",
      items: [
        {
          id: "gen-1",
          q: "Why does SARVA NATURAL only make Moringa, Triphala, and Ashwagandha?",
          a: "Rather than mass-producing dozens of diluted products, we focus our entire sourcing and laboratory resources exclusively on three cornerstone botanicals: Moringa for whole-food vitality and plant nutrition, Triphala for digestive detoxification, and Ashwagandha for deep rest and adrenal resilience. This ensures every capsule delivers maximum therapeutic potency.",
        },
        {
          id: "gen-2",
          q: "Are all SARVA NATURAL formulations 100% vegetarian?",
          a: "Yes. All our capsules use premium plant-derived HPMC (Hydroxypropyl Methylcellulose) vegetarian capsules. We never use animal gelatin, bovine byproducts, or synthetic shellac coatings.",
        },
        {
          id: "gen-3",
          q: "Where are the products manufactured?",
          a: "Manufactured in a certified GMP (Schedule T) climate-controlled facility licensed by the Ministry of AYUSH in Rajasthan, India.",
        },
      ],
    },
    {
      name: "Product & Dosage Specifics",
      items: [
        {
          id: "prod-1",
          q: "Can I take Moringa, Triphala, and Ashwagandha simultaneously?",
          a: "Yes, they form a harmonious classical regimen. Take Moringa in the morning after breakfast for natural whole-food vitality; take Ashwagandha in the evening after dinner for stress reduction; and take Triphala before bedtime with warm water for gentle overnight colon cleansing.",
        },
        {
          id: "prod-2",
          q: "How many capsules come in a bottle, and what is the shelf life?",
          a: "Each bottle contains 60 vegetarian capsules, providing a 30 to 60 day supply depending on your dosage protocol (1 to 2 capsules daily). The shelf life is 24 months from the manufacturing date.",
        },
        {
          id: "prod-3",
          q: "Is Triphala habit-forming like chemical laxatives?",
          a: "No. Triphala is a gentle classical Rasayana. Unlike senna, bisacodyl, or synthetic laxatives that irritate colon nerve endings and cause dependency, classical Triphala tones the intestinal musculature and supports natural peristalsis safely for long-term use.",
        },
        {
          id: "prod-4",
          q: "Will Ashwagandha make me drowsy during daytime work?",
          a: "No. Ashwagandha is an adaptogen, not a tranquilizer. It balances cortisol levels and nervous exhaustion, offering calm mental clarity during the day and facilitating deep restorative REM sleep at night.",
        },
      ],
    },
    {
      name: "Orders, Shipping & Returns",
      items: [
        {
          id: "ship-1",
          q: "What is your shipping fee and delivery timeline?",
          a: "We offer FREE express shipping across India on all orders above ₹399. Orders below ₹399 have a nominal flat delivery fee of ₹50. Standard delivery timeline is 2 to 4 business days for metros and 3 to 6 days for tier 2/3 locations.",
        },
        {
          id: "ship-2",
          q: "What payment methods are supported?",
          a: "We accept UPI (Google Pay, PhonePe, Paytm), Net Banking, major Credit & Debit Cards, and Cash on Delivery (COD).",
        },
        {
          id: "ship-3",
          q: "What if my package arrives damaged?",
          a: "If your parcel arrives damaged or tampered with, email photos to care@sarvanatural.com within 48 hours and we will dispatch a replacement at zero additional charge.",
        },
      ],
    },
  ];

  return (
    <div className="bg-ayur-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ayur-sageSubtle text-ayur-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-ayur-gold" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ayur-dark leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto leading-relaxed">
            Everything you need to know about SARVA NATURAL&apos;s classical trio of Moringa, Triphala, and Ashwagandha.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((cat, cIdx) => (
            <div key={cIdx} className="bg-white p-6 sm:p-8 rounded-xl border border-ayur-border shadow-soft">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ayur-dark mb-4 pb-2 border-b border-stone-100">
                {cat.name}
              </h2>

              <div className="space-y-3">
                {cat.items.map((item) => {
                  const isOpen = openItem === item.id;
                  return (
                    <div
                      key={item.id}
                      className="border border-stone-200/80 rounded-lg overflow-hidden transition-all bg-ayur-parchment/10"
                    >
                      <button
                        onClick={() => setOpenItem(isOpen ? null : item.id)}
                        className="w-full flex items-center justify-between p-4 text-left font-serif text-sm sm:text-base font-bold text-ayur-dark hover:text-ayur-primary transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-ayur-primary flex-shrink-0 transition-transform duration-200 ml-3 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-100 pt-3 animate-in fade-in duration-150">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-8 bg-ayur-parchment/60 rounded-xl border border-ayur-border">
          <h3 className="font-serif text-xl font-bold text-ayur-dark mb-1">
            Still Have Questions About Your Health Concerns?
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto mb-4">
            Our certified Ayurvedic Vaidyas offer complimentary 15-minute consultations to help align your daily routine and Dosha type.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pages/contact-us"
              className="px-5 py-2.5 bg-white border border-ayur-primary text-ayur-primary font-semibold text-xs uppercase tracking-wider rounded hover:bg-ayur-primary hover:text-white transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/consultation"
              className="px-5 py-2.5 bg-ayur-primary text-white font-semibold text-xs uppercase tracking-wider rounded hover:bg-ayur-secondary transition-colors"
            >
              Consult a Vaidya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
