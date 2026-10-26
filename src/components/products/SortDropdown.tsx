"use client";

import React from "react";
import { SortOption } from "@/types/product";
import { ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (newSort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured & Bestsellers" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest Arrivals" },
];

export function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  return (
    <div className="relative inline-flex items-center gap-1.5">
      <span className="text-xs text-ayur-muted font-medium hidden md:inline">
        Sort by:
      </span>
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none bg-ayur-cream/50 sm:bg-white border border-ayur-border/90 rounded-full text-xs font-medium text-ayur-dark pl-3.5 pr-8 py-1.5 hover:border-ayur-primary focus:outline-none focus:ring-1 focus:ring-ayur-primary cursor-pointer shadow-xs transition-colors"
          aria-label="Sort products by"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
