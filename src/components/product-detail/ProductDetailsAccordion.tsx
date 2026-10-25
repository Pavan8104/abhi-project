"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { ChevronDown, Leaf, ShieldCheck, Sparkles, Clock } from "lucide-react";

interface ProductDetailsAccordionProps {
  product: Product;
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
  const [openSections, setOpenSections] = useState<string[]>(["benefits", "ingredients"]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

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
              <span>Classical Botanical Composition</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                openSections.includes("ingredients") ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSections.includes("ingredients") && (
            <div className="p-3.5 sm:p-5 border-t border-stone-100 overflow-x-auto">
              <span className="text-[10px] text-stone-400 block sm:hidden mb-2 italic">← Swipe table sideways to inspect botanical details →</span>
              <table className="min-w-[500px] w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-ayur-primary font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-2">Ingredient / Sanskrit Name</th>
                    <th className="pb-2">Botanical Taxon</th>
                    <th className="pb-2">Proportion</th>
                    <th className="pb-2">Classical Therapeutic Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {product.ingredients.map((ing, idx) => (
                    <tr key={idx} className="py-2.5">
                      <td className="py-2.5 font-semibold text-ayur-dark">
                        {ing.name}
                        {ing.sanskritName && (
                          <span className="text-[11px] text-ayur-muted block font-serif italic">
                            {ing.sanskritName}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 font-mono text-[11px] text-stone-600 italic">
                        {ing.botanicalName}
                      </td>
                      <td className="py-2.5 font-sans font-medium text-stone-800">
                        {ing.percentage || "Classical Q.S."}
                      </td>
                      <td className="py-2.5 text-stone-600 leading-relaxed max-w-xs">
                        {ing.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 3. Usage & Anupana */}
        <div className="border border-ayur-border/80 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleSection("usage")}
            className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-bold text-ayur-dark bg-ayur-parchment/30 hover:bg-ayur-parchment/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-ayur-primary" />
              <span>How to Consume &amp; Recommended Anupana</span>
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
                  {product.anupana}. Taking herbs with the appropriate classical anupana helps escort the herbal actives through cellular membranes for enhanced bioavailability.
                </p>
              </div>

              <div className="pt-2 text-[11px] text-stone-500">
                <strong>Storage:</strong> Store in a cool, dry place away from direct sunlight. Refrigerate after opening and consume within 30-45 days. Shelf Life: {product.shelfLife}.
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
              <span>Safety, Manufacturing Standards &amp; Lab Reports</span>
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
                Every batch is manufactured under AYUSH Ministry GMP guidelines. Tested for absence of microbial pathogens (E. coli, Salmonella) and compliant with maximum permissible limits for heavy metals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
