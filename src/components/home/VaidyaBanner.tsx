"use client";

import React from "react";
import { Sparkles, Calendar, PhoneCall, Award, ArrowRight } from "lucide-react";
import { useConsultationStore } from "@/store/useConsultationStore";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { VAIDYA_PROFILES } from "@/data/vaidyas";

export function VaidyaBanner() {
  const { openConsultation } = useConsultationStore();
  const doctor = VAIDYA_PROFILES[0];

  return (
    <section className="py-16 bg-gradient-to-br from-ayur-primary via-ayur-secondary to-ayur-dark text-white relative overflow-hidden">
      {/* Decorative leaf watermarks */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-ayur-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text and Highlights */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-ayur-gold text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Ayurvedic Consultation (Demo)</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Unsure Which Herb Matches Your Body&apos;s Prakriti?
            </h2>

            <p className="text-sm sm:text-base text-ayur-sand/90 max-w-2xl leading-relaxed">
              In Ayurveda, there is no one-size-fits-all solution. Two people with the same digestive sluggishness may require opposite herbs depending on whether their imbalance is driven by Vata or Kapha.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-ayur-sand/90">
                <Calendar className="w-4 h-4 text-ayur-gold flex-shrink-0" />
                <span>15-Minute Dedicated Slot</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-ayur-sand/90">
                <PhoneCall className="w-4 h-4 text-ayur-gold flex-shrink-0" />
                <span>Hindi or English Audio/Video</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-ayur-sand/90">
                <Award className="w-4 h-4 text-ayur-gold flex-shrink-0" />
                <span>Verified BAMS &amp; MD Vaidyas</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openConsultation()}
                className="px-6 py-3.5 bg-ayur-gold text-ayur-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-ayur-goldMuted transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <span>Schedule Free 15-Min Vaidya Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-ayur-sand/70 text-center sm:text-left">
                No credit card or booking fee required.
              </span>
            </div>
          </div>

          {/* Doctor Highlight Box */}
          <div className="lg:col-span-4">
            <div className="p-5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white space-y-3">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-ayur-gold flex-shrink-0">
                  <ImageWithFallback
                    src={doctor.avatarUrl}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    fallbackTitle="Vaidya"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    {doctor.name}
                  </h4>
                  <p className="text-xs text-ayur-gold">{doctor.degrees}</p>
                  <p className="text-[11px] text-ayur-sand/80">{doctor.experienceYears}+ years clinical experience</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/15 text-[11px] text-ayur-sand/90 leading-relaxed italic font-serif">
                &ldquo;We guide you on dosage timing (Anupana), diet corrections, and lifestyle alignments for long-lasting root healing.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
