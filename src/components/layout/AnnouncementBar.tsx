"use client";

import React from "react";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-ayur-dark text-ayur-cream/90 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-ayur-secondary/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left message on desktop */}
        <div className="hidden md:flex items-center gap-2 text-ayur-sand/90 text-[11px] font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-ayur-gold" />
          <span>AYUSH Licensed • Traditional Slow-Decoctions • Farm Direct</span>
        </div>

        {/* Center highlight */}
        <div className="w-full md:w-auto text-center flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium tracking-wide flex-wrap">
          <Truck className="w-3.5 h-3.5 text-ayur-goldMuted inline flex-shrink-0" />
          <span>
            <strong className="text-white font-semibold">FREE Express Delivery</strong> on orders above ₹399
          </span>
          <span className="hidden sm:inline text-ayur-sand/60">|</span>
          <span className="hidden sm:inline text-ayur-cream/80">
            Use Code: <span className="bg-ayur-primary/80 px-1.5 py-0.5 rounded text-ayur-goldMuted font-mono font-bold tracking-wider">SARVA10</span> for 10% off
          </span>
        </div>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3 text-[11px]">
          <Link
            href="/consultation"
            className="text-ayur-goldMuted hover:text-white transition-colors flex items-center gap-1 underline underline-offset-4"
          >
            <Sparkles className="w-3 h-3" />
            <span>Consult a Vaidya</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
