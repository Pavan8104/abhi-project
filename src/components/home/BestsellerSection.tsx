"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight, Flame, ShieldCheck } from "lucide-react";

export function BestsellerSection() {
  return (
    <section className="py-12 sm:py-20 bg-ayur-cream border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ayur-accent font-sans mb-1">
              <Flame className="w-3.5 h-3.5 fill-ayur-accent" />
              <span>Our Classical Trio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark">
              Three Cornerstone Formulations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 sm:mt-2 max-w-xl font-sans leading-relaxed">
              Formulated strictly according to classical Ayurvedic texts. Pure botanical extracts encapsulated in 100% vegetarian HPMC capsules with zero synthetic excipients.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-ayur-primary font-medium">
            <ShieldCheck className="w-4 h-4 text-ayur-gold" />
            <span>Heavy Metal Tested &bull; GMP Certified</span>
          </div>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="grid" />
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/collections/all-products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-white border border-ayur-primary text-ayur-primary hover:bg-ayur-primary hover:text-white rounded text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
          >
            <span>View All 3 Formulations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
