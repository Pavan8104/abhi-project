"use client";

import React from "react";
import { Award, ShieldCheck, Leaf, FlaskConical, Sun, CheckCircle2 } from "lucide-react";

export function ManufacturingTrust() {
  const pillars = [
    {
      icon: Leaf,
      title: "100% Vegetarian HPMC Capsules",
      sanskrit: "शुद्ध वनस्पति (Plant-Based)",
      description:
        "Every formulation is encased in pharmaceutical-grade vegetarian cellulose (HPMC). Absolutely zero animal gelatin, bovine byproducts, or synthetic coatings.",
    },
    {
      icon: FlaskConical,
      title: "ICP-MS Heavy Metal Tested",
      sanskrit: "विशद परीक्षा (Purity Tested)",
      description:
        "Every single batch is tested via ICP-MS spectrometry for Lead, Mercury, Arsenic, and Cadmium, strictly complying with safety thresholds.",
    },
    {
      icon: Award,
      title: "GMP (Schedule T) Facility",
      sanskrit: "प्रमाणित निर्माण (Certified Facility)",
      description:
        "Produced in an audited, climate-controlled facility adhering to strict Good Manufacturing Practices certified by the Ministry of AYUSH.",
    },
    {
      icon: ShieldCheck,
      title: "Zero Chemical Fillers or Flow Agents",
      sanskrit: "विशुद्ध द्रव्य (100% Active Actives)",
      description:
        "We never add magnesium stearate, silicon dioxide, artificial colors, maltodextrin, or synthetic preservatives to bulk up our capsules.",
    },
    {
      icon: Sun,
      title: "Shade-Dried Botanical Preservation",
      sanskrit: "छाया शुष्क (Chhaya Shushka)",
      description:
        "Fresh Moringa leaves and Withania roots are dried under controlled low temperatures to keep fragile polyphenols and withanolides intact.",
    },
    {
      icon: CheckCircle2,
      title: "Authentic Classical Formulations",
      sanskrit: "शास्त्रोक्त योग (Shastrokta)",
      description:
        "Equal 1:1:1 Triphala ratio, organic Moringa oleifera extract, and root-only Ashwagandha formulated in full accordance with classical texts.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-ayur-primary font-sans block mb-1">
            Ancient Science • Modern Verification
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark">
            The SARVA NATURAL Quality Standard
          </h2>
          <div className="w-16 h-0.5 bg-ayur-gold mx-auto my-3 sm:my-4" />
          <p className="text-xs sm:text-base text-stone-600 leading-relaxed font-sans">
            Unlike commercial brands that hide behind proprietary blends and synthetic flow agents, SARVA NATURAL delivers transparent, standardized Ayurvedic botanicals tested for absolute purity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-ayur-parchment/30 border border-ayur-border/80 hover:border-ayur-primary/50 transition-all duration-300 hover:shadow-soft"
              >
                <div className="w-12 h-12 rounded bg-ayur-primary/10 border border-ayur-primary/20 flex items-center justify-center text-ayur-primary mb-4">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[11px] text-ayur-secondary font-serif italic block mb-1">
                  {p.sanskrit}
                </span>
                <h3 className="font-serif text-lg font-bold text-ayur-dark mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
