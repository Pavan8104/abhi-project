"use client";

import React from "react";
import { Product } from "@/types/product";
import { getRelatedProducts } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const related = getRelatedProducts(currentProduct, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-stone-200">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-ayur-primary font-bold font-sans block mb-1">
            Complementary Protocols
          </span>
          <h3 className="font-serif text-2xl font-bold text-ayur-dark">
            Frequently Paired Formulations
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} viewMode="grid" />
        ))}
      </div>
    </section>
  );
}
