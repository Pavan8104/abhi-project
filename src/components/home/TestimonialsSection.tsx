"use client";

import React from "react";
import Link from "next/link";
import { StarRating } from "@/components/common/StarRating";
import { TESTIMONIALS } from "@/data/testimonials";
import { CheckCircle2, Quote, AlertCircle } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-ayur-cream border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-ayur-primary font-sans block mb-1">
            Real Experiences
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark">
            Trusted by Conscious Wellness Seekers
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-[10px] sm:text-[11px] text-amber-900 font-medium mt-3">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
            <span>Demonstration Notice: Product reviews below are curated illustrative demo content.</span>
          </div>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-5 sm:p-6 rounded-lg border border-ayur-border/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <StarRating rating={t.rating} />
                  <Quote className="w-5 h-5 text-ayur-gold/40" />
                </div>

                <p className="font-serif text-sm font-semibold text-ayur-dark italic mb-3 leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {t.fullReview}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-ayur-dark">
                      {t.author}
                    </h5>
                    <span className="text-[11px] text-stone-400">
                      {t.city} • {t.duration}
                    </span>
                  </div>

                  {t.verifiedBuyer && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <Link
                  href={`/products/${t.productSlug}`}
                  className="mt-2 text-[11px] text-ayur-primary font-medium hover:underline block truncate"
                >
                  Used: {t.productName} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
