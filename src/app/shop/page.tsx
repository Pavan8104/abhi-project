import React, { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Ayurvedic Formulations | Krishna's Herbal & Ayurveda",
  description: "Browse authentic wild-harvested juices, herbal oils, and classical kwaths.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-ayur-muted">
          Loading formulations...
        </div>
      }
    >
      <CatalogView initialSlug="all-products" />
    </Suspense>
  );
}
