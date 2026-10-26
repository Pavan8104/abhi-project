import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { BestsellerSection } from "@/components/home/BestsellerSection";
import { ShopByConcern } from "@/components/home/ShopByConcern";
import { ManufacturingTrust } from "@/components/home/ManufacturingTrust";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VaidyaBanner } from "@/components/home/VaidyaBanner";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <BrandStorySection />
      <BestsellerSection />
      <ShopByConcern />
      <ManufacturingTrust />
      <HomeFaqSection />
      <TestimonialsSection />
      <VaidyaBanner />
      <NewsletterSection />
    </div>
  );
}
