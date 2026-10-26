"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { ChevronDown, Leaf, ShieldCheck, Sparkles, Clock, HelpCircle, Truck } from "lucide-react";

interface ProductDetailsAccordionProps {
  product: Product;
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  const [openSections, setOpenSections] = useState<string[]>([
    "benefits",
    "ingredients",
    "usage",
    "shipping",
  ]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const productSpecificFaqs: Record<string, { q: string; a: string }[]> = {
    moringa: [
      {
        q: "When is the best time to take Moringa capsules?",
        a: "Take 1 to 2 capsules in the morning after breakfast or lunch with lukewarm water. Because Moringa provides natural botanical energy and rich plant micronutrients, morning or mid-day consumption is optimal.",
      },
      {
        q: "Can I take Moringa during pregnancy or lactation?",
        a: "While Moringa is traditionally celebrated as a galactagogue (nourishing maternal milk), we recommend pregnant or nursing women consult their doctor or an Ayurvedic practitioner before starting any new herbal supplement.",
      },
      {
        q: "What makes Sarva Natural Moringa different from supermarket powders?",
        a: "Our leaves are shade-dried at strictly controlled temperatures under 40°C to prevent heat degradation of Vitamin C, chlorophyll, and antioxidants. Packed in 100% plant-cellulose capsules with zero binders.",
      },
    ],
    triphala: [
      {
        q: "Is Triphala habit-forming like chemical laxatives?",
        a: "No. Unlike senna, bisacodyl, or synthetic laxatives that irritate colon nerve endings and cause dependency, classical Triphala is a gentle rejuvenative (Rasayana). It tones the intestinal musculature and supports natural peristalsis safely for long-term use.",
      },
      {
        q: "Should I take Triphala with warm water or milk?",
        a: "For colon cleansing and morning elimination, take 1 to 2 capsules 30-45 minutes before sleep with lukewarm water. For deep tissue nourishment, it can be taken with warm milk.",
      },
      {
        q: "What is the exact ratio of the three fruits?",
        a: "We adhere strictly to the classical Charaka Samhita equal ratio of 1:1:1 — 33.3% Haritaki, 33.3% Bibhitaki, and 33.3% Amalaki fruit pulp.",
      },
    ],
    ashwagandha: [
      {
        q: "Will Ashwagandha make me sleepy during daytime?",
        a: "No. Ashwagandha is an adaptogen, not a sedative. It modulates cortisol and calms nervous tension, providing steady mental clarity during the day and facilitating deep restorative REM sleep at night.",
      },
      {
        q: "How long does it take for Ashwagandha to work?",
        a: "Many patrons experience noticeable calm within 3 to 5 days. For substantial cortisol regulation, enhanced physical endurance, and deep sleep architecture, consistent daily use for 3 to 6 weeks is recommended.",
      },
      {
        q: "Are these capsules made from the root or the leaf?",
        a: "Classical Ayurveda prescribes Withania somnifera root (Ashwagandha Mula) for tonic and Rasayana benefits. We use standardized pure root extract, never cheap leaf fillers.",
      },
    ],
  };

  const faqs = productSpecificFaqs[product.slug] || [
    {
      q: "How should I store these capsules?",
      a: "Keep tightly sealed in a cool, dry place away from direct sunlight and moisture. No refrigeration needed.",
    },
    {
      q: "Are there any synthetic additives?",
      a: "Zero. We do not use magnesium stearate, talc, artificial coloring, or preservatives.",
    },
  ];

  return (
    <div className="border-t border-stone-200 mt-12 pt-8">
      <h3 className="font-serif text-2xl font-bold text-ayur-dark mb-6">
        Classical Formulation Details &amp; Composition
      </h3>

      <div className="space-y-4">
        {/* 1. Benefits & Dosha Impact */}
        <div className="border border-ayur-border/80 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleSection("benefits")}
            className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-ayur-dark bg-ayur-parchment/30 hover:bg-ayur-parchment/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-ayur-gold" />
              <span>Key Health Benefits &amp; Tridosha Action</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                openSections.includes("benefits") ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.includes("benefits") && (
            <div className="p-5 border-t border-stone-100 text-xs text-stone-700 space-y-4">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {product.keyBenefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-ayur-primary mt-1.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Dosha impact pill matrix */}
              <div className="p-4 bg-ayur-sageSubtle/60 rounded-md border border-ayur-sage/30 mt-4">
                <span className="font-semibold text-ayur-primary uppercase tracking-wider text-[10px] block mb-2">
                  Tridoshic Influence (Prakriti Analysis)
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded border border-stone-200">
                    <strong className="block text-ayur-dark">Vata</strong>
                    <span className="text-[11px] text-stone-600">{product.doshaImpact.vata}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-stone-200">
                    <strong className="block text-ayur-dark">Pitta</strong>
                    <span className="text-[11px] text-stone-600">{product.doshaImpact.pitta}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-stone-200">
                    <strong className="block text-ayur-dark">Kapha</strong>
                    <span className="text-[11px] text-stone-600">{product.doshaImpact.kapha}</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-600 italic mt-2.5 leading-relaxed">
                  {product.doshaImpact.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. Classical Ingredients Breakdown */}
        <div className="border border-ayur-border/80 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleSection("ingredients")}
            className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-ayur-dark bg-ayur-parchment/30 hover:bg-ayur-parchment/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Leaf className="w-4 h-4 text-ayur-primary" />
              <span>Classical Botanical Composition (100% Transparent)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                openSections.includes("ingredients") ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.includes("ingredients") && (
            <div className="p-3.5 sm:p-5 border-t border-stone-100 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 font-sans uppercase tracking-wider text-[10px]">
                    <th className="pb-2 font-semibold">Botanical Herb</th>
                    <th className="pb-2 font-semibold">Latin Botanical Name</th>
                    <th className="pb-2 font-semibold">Ratio / Purity</th>
                    <th className="pb-2 font-semibold">Therapeutic Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-sans">
                  {product.ingredients.map((ing, idx) => (
                    <tr key={idx} className="hover:bg-ayur-parchment/20">
                      <td className="py-2.5 pr-3 font-medium text-ayur-dark">
                        {ing.name}
                        {ing.sanskritName && (
                          <span className="block text-[10px] text-ayur-secondary font-serif italic">
                            {ing.sanskritName}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-3 italic text-stone-600">
                        {ing.botanicalName || "—"}
                      </td>
                      <td className="py-2.5 pr-3 font-mono font-semibold text-ayur-primary">
                        {ing.percentage || "100%"}
                      </td>
                      <td className="py-2.5 text-stone-600 leading-snug">
                        {ing.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 p-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded text-[11px] text-emerald-900">
                Encapsulated in 100% plant-cellulose vegetarian HPMC capsules. Zero gelatin, bovine extracts, or chemical binders.
              </div>
            </div>
          )}
        </div>

        {/* 3. Directions for Use & Daily Dosage */}
        <div className="border border-ayur-border/80 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleSection("usage")}
            className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-ayur-dark bg-ayur-parchment/30 hover:bg-ayur-parchment/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-ayur-clay" />
              <span>Directions for Use &amp; Recommended Anupana</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                openSections.includes("usage") ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.includes("usage") && (
            <div className="p-5 border-t border-stone-100 text-xs text-stone-700 space-y-3 leading-relaxed">
              <div>
                <strong className="block text-ayur-dark font-sans uppercase tracking-wider text-[11px] mb-1">
                  Daily Dosage Instructions:
                </strong>
                <p className="p-3 bg-stone-50 rounded border border-stone-200 font-sans">
                  {product.howToConsume}
                </p>
              </div>

              <div>
                <strong className="block text-ayur-dark font-sans uppercase tracking-wider text-[11px] mb-1">
                  Recommended Anupana (Carrier Vehicle):
                </strong>
                <p className="text-stone-600 font-sans">
                  {product.anupana}. In classical Ayurveda, the anupana acts as a targeted biological escort, facilitating optimal absorption across the intestinal wall.
                </p>
              </div>

              <div className="pt-2 text-[11px] text-stone-500">
                <strong>Storage:</strong> Store tightly sealed in a cool, dry place away from direct sunlight. Shelf Life: {product.shelfLife}.
              </div>
            </div>
          )}
        </div>

        {/* 4. Manufacturing Certifications & Testing */}
        <div className="border border-ayur-border/80 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleSection("certifications")}
            className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-ayur-dark bg-ayur-parchment/30 hover:bg-ayur-parchment/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Safety, Manufacturing Standards &amp; Lab Verification</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                openSections.includes("certifications") ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.includes("certifications") && (
            <div className="p-5 border-t border-stone-100 text-xs text-stone-700 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-emerald-50/60 rounded border border-emerald-200/80 text-center"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                    <span className="font-semibold text-emerald-900 text-[11px] block">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed pt-2">
                Every batch is manufactured in an audited GMP (Schedule T) certified facility licensed by the Ministry of AYUSH. Tested via ICP-MS spectrometry for zero heavy metal toxicity and compliant with stringent microbiological purity standards.
              </p>
            </div>
          )}
        </div>

        {/* 5. Product FAQs */}
        <div className="border border-ayur-border/80 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleSection("faqs")}
            className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-ayur-dark bg-ayur-parchment/30 hover:bg-ayur-parchment/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-ayur-primary" />
              <span>Product FAQs &amp; Usage Guidance</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                openSections.includes("faqs") ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.includes("faqs") && (
            <div className="p-5 border-t border-stone-100 text-xs text-stone-700 space-y-3">
              {faqs.map((f, idx) => (
                <div key={idx} className="pb-3 border-b border-stone-100 last:border-b-0 last:pb-0">
                  <h5 className="font-semibold text-ayur-dark text-[12px] mb-1 font-serif">
                    {f.q}
                  </h5>
                  <p className="text-stone-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. Shipping & Delivery Details */}
        <div className="border border-ayur-border/80 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleSection("shipping")}
            className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-ayur-dark bg-ayur-parchment/30 hover:bg-ayur-parchment/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-ayur-gold" />
              <span>Shipping, Express Delivery &amp; Returns</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                openSections.includes("shipping") ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.includes("shipping") && (
            <div className="p-5 border-t border-stone-100 text-xs text-stone-700 space-y-3 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <strong className="block text-ayur-dark font-sans uppercase tracking-wider text-[10px] mb-1">
                    Free Express Delivery
                  </strong>
                  <p className="text-[11px] text-stone-600">
                    Complimentary express dispatch on all orders above ₹399 across all serviceable PIN codes in India.
                  </p>
                </div>
                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <strong className="block text-ayur-dark font-sans uppercase tracking-wider text-[10px] mb-1">
                    Same-Day Dispatch
                  </strong>
                  <p className="text-[11px] text-stone-600">
                    Orders placed before 2 PM IST are packed and handed over to our courier partner within 24 hours.
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                Typical delivery timeline is 2 to 4 business days for metropolitan regions and 3 to 6 days for tier 2/3 cities. In case of transit damage, we provide immediate free replacements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
