"use client";

import React from "react";
import { X } from "lucide-react";
import { HealthConcern } from "@/types/product";
import { HEALTH_CONCERNS, FORM_FACTORS } from "@/data/categories";
import { formatINR } from "@/lib/utils";

interface ActiveFilterChipsProps {
  selectedCategories: string[];
  onRemoveCategory: (slug: string) => void;
  selectedConcerns: HealthConcern[];
  onRemoveConcern: (concern: HealthConcern) => void;
  selectedAttributes: string[];
  onRemoveAttribute: (attr: string) => void;
  priceRange: [number, number];
  onResetPrice: () => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({
  selectedCategories,
  onRemoveCategory,
  selectedConcerns,
  onRemoveConcern,
  selectedAttributes,
  onRemoveAttribute,
  priceRange,
  onResetPrice,
  inStockOnly,
  onToggleInStock,
  onClearAll,
}: ActiveFilterChipsProps) {
  const isCustomPrice = priceRange[0] > 199 || priceRange[1] < 2200;

  const totalChipsCount =
    selectedCategories.length +
    selectedConcerns.length +
    selectedAttributes.length +
    (isCustomPrice ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  if (totalChipsCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 pt-2">
      <span className="text-xs text-ayur-muted font-medium mr-1">
        Active Filters:
      </span>

      {/* Concerns */}
      {selectedConcerns.map((cId) => {
        const item = HEALTH_CONCERNS.find((hc) => hc.id === cId);
        return (
          <span
            key={cId}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-ayur-sageSubtle border border-ayur-sage/30 text-xs text-ayur-primary font-medium"
          >
            <span>{item ? item.title : cId}</span>
            <button
              onClick={() => onRemoveConcern(cId)}
              className="hover:text-ayur-accent focus:outline-none"
              aria-label={`Remove filter ${item?.title || cId}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        );
      })}

      {/* Categories */}
      {selectedCategories.map((catSlug) => {
        const item = FORM_FACTORS.find((f) => f.slug === catSlug);
        return (
          <span
            key={catSlug}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-ayur-parchment border border-ayur-sand text-xs text-ayur-dark font-medium"
          >
            <span>{item ? item.label : catSlug}</span>
            <button
              onClick={() => onRemoveCategory(catSlug)}
              className="hover:text-ayur-accent focus:outline-none"
              aria-label={`Remove category filter ${item?.label || catSlug}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        );
      })}

      {/* Attributes */}
      {selectedAttributes.map((attr) => (
        <span
          key={attr}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-stone-200 text-xs text-stone-700 font-medium"
        >
          <span>{attr}</span>
          <button
            onClick={() => onRemoveAttribute(attr)}
            className="hover:text-ayur-accent focus:outline-none"
            aria-label={`Remove attribute filter ${attr}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {/* Price */}
      {isCustomPrice && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 border border-stone-300 text-xs text-stone-800 font-medium">
          <span>
            {formatINR(priceRange[0])} - {formatINR(priceRange[1])}
          </span>
          <button
            onClick={onResetPrice}
            className="hover:text-ayur-accent focus:outline-none"
            aria-label="Reset price filter"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* In stock */}
      {inStockOnly && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
          <span>In Stock Only</span>
          <button
            onClick={() => onToggleInStock(false)}
            className="hover:text-red-600 focus:outline-none"
            aria-label="Remove in-stock only filter"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Clear all button */}
      <button
        onClick={onClearAll}
        className="text-xs text-ayur-accent hover:text-ayur-clay underline underline-offset-2 ml-2 font-medium"
      >
        Clear All
      </button>
    </div>
  );
}
