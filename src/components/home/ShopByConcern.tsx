"use client";

import React from "react";
import Link from "next/link";
import { HEALTH_CONCERNS } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function ShopByConcern() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-ayur-primary font-sans block mb-1">
              Targeted Vedic Healing
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark">
              Shop by Ayurvedic Concern
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl font-sans">
              Every formulation is tailored according to Tridosha dynamics—restoring harmony to your body&apos;s innate constitutional balance.
            </p>
          </div>

          <Link
            href="/collections/all-products"
            className="text-xs font-semibold uppercase tracking-wider text-ayur-primary hover:text-ayur-secondary flex items-center gap-1.5 self-start md:self-end group"
          >
            <span>View All Formulations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {HEALTH_CONCERNS.map((c) => {
            const count = PRODUCTS.filter((p) => p.healthConcerns.includes(c.id)).length;
            return (
              <Link
                key={c.id}
                href={`/collections/all-products?concern=${c.id}`}
                className="group relative rounded-lg overflow-hidden border border-ayur-border/80 bg-ayur-parchment/30 hover:border-ayur-primary/60 transition-all duration-300 hover:shadow-card flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ayur-sand/30">
                  <ImageWithFallback
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    fallbackTitle={c.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-3 text-[9px] sm:text-[10px] text-white font-medium bg-black/40 px-1.5 sm:px-2 py-0.5 rounded backdrop-blur-xs">
                    {count} {count === 1 ? "Formula" : "Formulas"}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-serif italic text-ayur-secondary block mb-0.5 truncate">
                      {c.sanskritName}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-ayur-dark group-hover:text-ayur-primary transition-colors leading-snug line-clamp-1">
                      {c.title}
                    </h3>
                  </div>

                  <div className="mt-2.5 sm:mt-3 flex items-center text-xs font-semibold text-ayur-primary group-hover:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
