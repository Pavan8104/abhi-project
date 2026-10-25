"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Award, Leaf } from "lucide-react";
import { useConsultationStore } from "@/store/useConsultationStore";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export function HeroSection() {
  const { openConsultation } = useConsultationStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ayur-parchment/60 via-ayur-cream to-white border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ayur-sageLight/70 border border-ayur-sage/30 text-xs font-semibold text-ayur-primary uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-ayur-primary fill-ayur-primary/20" />
              <span>SARVA NATURAL • Authentic Classical Formulations</span>
            </div>

            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ayur-dark tracking-tight leading-[1.12]">
                Earth &bull; Health &bull; Wellness
              </h1>
              <p className="font-serif text-lg sm:text-2xl text-ayur-primary font-medium tracking-tight mt-1 sm:mt-2">
                Pure Ayurvedic Formulations for Mind, Body &amp; Spirit
              </p>
            </div>

            <p className="text-sm sm:text-lg text-ayur-muted font-serif italic max-w-xl leading-relaxed">
              &ldquo;When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.&rdquo;
              <span className="block text-xs font-sans not-italic text-ayur-primary font-semibold mt-1">
                — Classical Ayurvedic Principle (Charaka Samhita)
              </span>
            </p>

            <p className="text-xs sm:text-base text-stone-700 max-w-xl leading-relaxed font-sans">
              Crafted from wild-harvested herbs cold-pressed within 48 hours of picking. Unpasteurized, zero added sugar, and simmered in classical copper cauldrons according to 5,000-year-old Vedic scriptures.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/collections/all-products"
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-ayur-primary text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded hover:bg-ayur-secondary transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.99]"
              >
                <span>Explore All Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => openConsultation()}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-white border border-ayur-border/90 text-ayur-dark font-semibold text-xs sm:text-sm uppercase tracking-wider rounded hover:bg-ayur-parchment/60 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-ayur-gold" />
                <span>Book Free Vaidya Call</span>
              </button>
            </div>

            {/* Credibility Micro-Badges */}
            <div className="pt-4 sm:pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-ayur-primary flex-shrink-0" />
                <span className="font-medium text-stone-700">AYUSH Certified Facility</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-ayur-primary flex-shrink-0" />
                <span className="font-medium text-stone-700">100% Raw Decoctions</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-ayur-primary flex-shrink-0" />
                <span className="font-medium text-stone-700">Wild-Harvested</span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative border frame */}
              <div className="absolute -inset-3 rounded-xl border border-ayur-gold/30 -rotate-1 pointer-events-none" />

              <div className="relative rounded-lg overflow-hidden shadow-elevated bg-white border border-ayur-border aspect-[4/5]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80"
                  alt="Ayurvedic herbs, raw amla and classical decoction preparation"
                  fill
                  priority
                  className="object-cover object-center"
                  fallbackTitle="Ayurvedic Botanical Craft"
                />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-white/95 backdrop-blur-md border border-ayur-border/80 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-ayur-accent tracking-wider block">
                        Signature Formulation
                      </span>
                      <h4 className="font-serif text-sm font-bold text-ayur-dark">
                        Raw Wild Amla Swarasa
                      </h4>
                      <p className="text-[11px] text-stone-600">
                        Cold-pressed from small Pratapgarh wild gooseberries
                      </p>
                    </div>
                    <Link
                      href="/products/raw-wild-amla-juice"
                      className="px-3 py-2 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-colors"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
