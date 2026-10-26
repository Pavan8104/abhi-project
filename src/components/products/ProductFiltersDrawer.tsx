"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import { X, SlidersHorizontal, Check, RefreshCw } from "lucide-react";
import { FORM_FACTORS, HEALTH_CONCERNS } from "@/data/categories";
import { HealthConcern } from "@/types/product";
import { formatINR } from "@/lib/utils";

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onToggleCategory: (catSlug: string) => void;
  selectedConcerns: HealthConcern[];
  onToggleConcern: (concernId: HealthConcern) => void;
  selectedAttributes: string[];
  onToggleAttribute: (attr: string) => void;
  priceRange: [number, number];
  onPriceChange: (newRange: [number, number]) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  onClearAll: () => void;
  totalFilteredCount: number;
}

const AVAILABLE_ATTRIBUTES = [
  "GMP Certified Facility",
  "100% Vegetarian Capsules",
  "Zero Heavy Metals (ICP-MS Tested)",
  "No Synthetic Binders or Fillers",
  "Organic Farm Direct",
];

export function ProductFiltersDrawer({
  isOpen,
  onClose,
  selectedCategories,
  onToggleCategory,
  selectedConcerns,
  onToggleConcern,
  selectedAttributes,
  onToggleAttribute,
  priceRange,
  onPriceChange,
  inStockOnly,
  onToggleInStock,
  onClearAll,
  totalFilteredCount,
}: FiltersDrawerProps) {
  const activeFiltersCount =
    selectedCategories.length +
    selectedConcerns.length +
    selectedAttributes.length +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] > 199 || priceRange[1] < 2200 ? 1 : 0);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white border-l border-ayur-border shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-ayur-primary" />
              <Dialog.Title className="font-serif text-base sm:text-lg font-bold text-ayur-dark">
                Refine Formulations
              </Dialog.Title>
              {activeFiltersCount > 0 && (
                <span className="bg-ayur-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {activeFiltersCount > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-ayur-accent hover:text-ayur-clay font-medium transition-colors"
                >
                  Clear All
                </button>
              )}
              <Dialog.Close asChild>
                <button
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Scrollable Filter Options */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-6 sm:space-y-7">
            {/* Health Concerns */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ayur-primary mb-3 font-sans">
                Ayurvedic Health Concern
              </h4>
              <div className="space-y-2">
                {HEALTH_CONCERNS.map((c) => {
                  const isChecked = selectedConcerns.includes(c.id);
                  return (
                    <label
                      key={c.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-ayur-parchment/60 cursor-pointer transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleConcern(c.id)}
                          className="w-4 h-4 rounded border-stone-300 text-ayur-primary focus:ring-ayur-primary"
                        />
                        <span className={isChecked ? "font-semibold text-ayur-dark" : "text-stone-700"}>
                          {c.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-ayur-muted font-serif italic">
                        {c.subtitle}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Classical Form Factors */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ayur-primary mb-3 font-sans">
                Form Factor / Kalpana
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {FORM_FACTORS.map((f) => {
                  const isChecked = selectedCategories.includes(f.slug);
                  return (
                    <button
                      key={f.slug}
                      type="button"
                      onClick={() => onToggleCategory(f.slug)}
                      className={`px-3 py-2 text-xs rounded text-left flex items-center justify-between border transition-all ${
                        isChecked
                          ? "bg-ayur-primary text-white border-ayur-primary font-medium"
                          : "bg-white text-stone-700 border-stone-200 hover:border-ayur-sage"
                      }`}
                    >
                      <span>{f.label}</span>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dual-Thumb Price Range Slider */}
            <div className="pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ayur-primary font-sans">
                  Price Range
                </h4>
                <span className="text-xs font-medium text-ayur-dark font-sans">
                  {formatINR(priceRange[0])} — {formatINR(priceRange[1])}
                </span>
              </div>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5 py-4"
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(val) => onPriceChange([val[0], val[1]])}
                min={199}
                max={2200}
                step={25}
                aria-label="Price range filter"
              >
                <Slider.Track className="bg-stone-200 relative grow rounded-full h-1.5">
                  <Slider.Range className="absolute bg-ayur-primary rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-ayur-primary rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-ayur-primary/30 transition-transform hover:scale-110 cursor-grab active:cursor-grabbing"
                  aria-label="Min price"
                />
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-ayur-primary rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-ayur-primary/30 transition-transform hover:scale-110 cursor-grab active:cursor-grabbing"
                  aria-label="Max price"
                />
              </Slider.Root>
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>Min: ₹199</span>
                <span>Max: ₹2,200</span>
              </div>
            </div>

            {/* Formulation Attributes */}
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ayur-primary mb-3 font-sans">
                Manufacturing & Purity
              </h4>
              <div className="space-y-2">
                {AVAILABLE_ATTRIBUTES.map((attr) => {
                  const isChecked = selectedAttributes.includes(attr);
                  return (
                    <label
                      key={attr}
                      className="flex items-center gap-2.5 p-1.5 rounded hover:bg-ayur-parchment/60 cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleAttribute(attr)}
                        className="w-4 h-4 rounded border-stone-300 text-ayur-primary focus:ring-ayur-primary"
                      />
                      <span className={isChecked ? "font-semibold text-ayur-dark" : "text-stone-700"}>
                        {attr}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div className="pt-4 border-t border-stone-100">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-medium text-stone-700">
                  In Stock Formulations Only
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => onToggleInStock(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-ayur-primary focus:ring-ayur-primary"
                />
              </label>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-stone-300 rounded text-xs font-medium text-stone-700 hover:bg-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <Dialog.Close asChild>
              <button className="flex-1 py-2.5 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-colors text-center shadow-sm">
                View {totalFilteredCount} {totalFilteredCount === 1 ? "Product" : "Products"}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
