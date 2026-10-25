import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ShopByConcern } from "@/components/home/ShopByConcern";
import { BestsellerSection } from "@/components/home/BestsellerSection";
import { ManufacturingTrust } from "@/components/home/ManufacturingTrust";
import { VaidyaBanner } from "@/components/home/VaidyaBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ShopByConcern />
      <BestsellerSection />
      <ManufacturingTrust />
      <VaidyaBanner />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
