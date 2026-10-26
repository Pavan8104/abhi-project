"use client";

import React from "react";
import { PRODUCTS } from "@/data/products";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { Plus, Sparkles } from "lucide-react";

export function CartCrossSells() {
  const { items, addItem } = useCartStore();
  const { showToast } = useUIStore();

  const currentProductIds = items.map((i) => i.productId);
  // Pick 3 products not already in cart
  const recommendations = PRODUCTS.filter((p) => !currentProductIds.includes(p.id)).slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <div className="pt-4 border-t border-stone-200 mt-4">
      <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-ayur-primary uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
        <span>Frequently Paired Classical Herbs</span>
      </div>

      <div className="space-y-2.5">
        {recommendations.map((prod) => {
          const defaultVariant = prod.variants[0];
          return (
            <div
              key={prod.id}
              className="flex items-center justify-between p-2.5 bg-ayur-parchment/40 rounded border border-ayur-border/80 hover:border-ayur-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded bg-white overflow-hidden flex-shrink-0 border border-stone-200">
                  <ImageWithFallback
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    className="object-contain p-1"
                    fallbackTitle={prod.name}
                  />
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-semibold text-ayur-dark font-serif truncate">
                    {prod.name}
                  </h5>
                  <div className="text-[11px] text-ayur-muted font-sans flex items-center gap-1.5">
                    <span>{defaultVariant.size}</span>
                    <span>•</span>
                    <span className="font-semibold text-ayur-dark">
                      {formatINR(defaultVariant.price)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  addItem(prod, defaultVariant, 1);
                  showToast(`Added ${prod.name} to your bag`, "success");
                }}
                className="px-2.5 py-1.5 bg-white border border-ayur-primary text-ayur-primary hover:bg-ayur-primary hover:text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors flex-shrink-0"
                aria-label={`Add ${prod.name} to bag`}
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
