"use client";

import React from "react";
import { Award, ShieldCheck, Clock, Leaf, FlaskConical, Sun } from "lucide-react";

export function ManufacturingTrust() {
  const pillars = [
    {
      icon: Clock,
      title: "16-Hour Kashayam Decoctions",
      sanskrit: "कषाय कल्पना (Kashaya Kalpana)",
      description:
        "We simmer raw botanicals in heavy copper and stainless cauldrons until the water volume reduces to exactly one-fourth, liberating heat-stable phytocompounds.",
    },
    {
      icon: Leaf,
      title: "Fresh Swarasa Within 48 Hours",
      sanskrit: "स्वरस निष्कर्षण (Swarasa Vidhi)",
      description:
        "Wild Pratapgarh amla and Thar desert aloe are washed in natural spring water and cold-pressed without heating or dilution to preserve active enzymes.",
    },
    {
      icon: FlaskConical,
      title: "4-Stage Heavy Metal & Toxin Screening",
      sanskrit: "विशद परीक्षा (Shodhana Pariksha)",
      description:
        "Every batch is tested via ICP-MS spectrometry for Lead, Mercury, Arsenic, Cadmium, and 120+ organophosphate pesticides to meet stringent safety ceilings.",
    },
    {
      icon: Sun,
      title: "Surya Tapi Natural Purification",
      sanskrit: "सूर्य तापी संस्कार (Surya Tapi)",
      description:
        "Himalayan Shilajit undergoes traditional solar purification through successive Triphala baths over 7 sunny days, ensuring fulvic acid integrity without scorching.",
    },
    {
      icon: Award,
      title: "AYUSH GMP Licensed Facility",
      sanskrit: "प्रमाणित निर्माण (Certified Facility)",
      description:
        "Manufactured in a climate-controlled state-of-the-art facility adhering to Good Manufacturing Practices (Schedule T) certified by the Ministry of AYUSH.",
    },
    {
      icon: ShieldCheck,
      title: "Zero Hidden Fillers or Refined Sugar",
      sanskrit: "विशुद्ध द्रव्य (100% Active Actives)",
      description:
        "We never adulterate our swarasa with high-fructose corn syrup, artificial coloring dyes, chemical thickeners, or sodium benzoate excess.",
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
            The Classical Kashayam &amp; Swarasa Standard
          </h2>
          <div className="w-16 h-0.5 bg-ayur-gold mx-auto my-3 sm:my-4" />
          <p className="text-xs sm:text-base text-stone-600 leading-relaxed font-sans">
            Unlike commercial factories that churn out reconstituted powders and sweetened concentrates, Krishna&apos;s Herbal &amp; Ayurveda adheres strictly to classical pharmaceutical procedures (Bhaishajya Kalpana).
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
