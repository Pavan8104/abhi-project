"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight, Flame } from "lucide-react";

type FilterTab = "all" | "juices" | "oils" | "combos";

export function BestsellerSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  const displayedProducts = bestsellers.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "juices") return p.category === "juices";
    if (activeTab === "oils") return p.category === "oils" || p.category === "resins";
    if (activeTab === "combos") return p.category === "combos";
    return true;
  });

  return (
    <section className="py-12 sm:py-20 bg-ayur-cream border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ayur-accent font-sans mb-1">
              <Flame className="w-3.5 h-3.5 fill-ayur-accent" />
              <span>Time-Tested Client Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark">
              Our Bestselling Formulations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 sm:mt-2 max-w-xl font-sans">
              Hand-crafted decoctions consistently chosen by over 50,000+ patrons across India for pure potency and uncompromised results.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 self-start md:self-end">
            {(
              [
                { id: "all", label: "All Bestsellers" },
                { id: "juices", label: "Swarasa Juices" },
                { id: "oils", label: "Oils & Resins" },
                { id: "combos", label: "Value Bundles" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-ayur-primary text-white shadow-sm"
                    : "bg-white text-stone-700 hover:bg-ayur-parchment border border-ayur-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} viewMode="grid" />
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/collections/all-products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white border border-ayur-primary text-ayur-primary hover:bg-ayur-primary hover:text-white rounded text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
          >
            <span>Explore Complete Catalog (16 Formulations)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
