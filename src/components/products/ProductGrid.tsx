import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Sparkles, RefreshCw } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: "grid" | "list";
  onResetFilters?: () => void;
}

export function ProductGrid({
  products,
  isLoading = false,
  viewMode = "grid",
  onResetFilters,
}: ProductGridProps) {
  // Loading skeleton matching exact card dimensions
  if (isLoading) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
            : "flex flex-col gap-3 sm:gap-4"
        }
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded border border-stone-200/60 overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-ayur-parchment/60 w-full" />
            <div className="p-4 space-y-3">
              <div className="h-2.5 bg-stone-200 rounded w-1/3" />
              <div className="h-4 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-200 rounded w-1/2" />
              <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                <div className="h-4 bg-stone-200 rounded w-1/4" />
                <div className="h-8 bg-stone-200 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="bg-white rounded border border-ayur-border/80 p-12 text-center my-6">
        <div className="w-16 h-16 rounded-full bg-ayur-parchment flex items-center justify-center mx-auto mb-4 text-ayur-primary">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-ayur-dark mb-2">
          No matching Ayurvedic formulations found
        </h3>
        <p className="text-sm text-ayur-muted max-w-md mx-auto mb-6">
          We couldn&apos;t find any products matching your specific combination of filters. Try broadening your price range or clearing active health concern tags.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
          : "flex flex-col gap-3 sm:gap-4"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
