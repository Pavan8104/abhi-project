"use client";

import React, { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { PRODUCTS } from "@/data/products";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { formatINR } from "@/lib/utils";
import Link from "next/link";

const POPULAR_SEARCHES = [
  "Raw Amla Juice",
  "Triphala Swarasa",
  "Diabic Care",
  "Shilajit Resin",
  "Kumkumadi Tailam",
  "Hair Oil",
];

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sanskritName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.healthConcerns.some((c) => c.toLowerCase().includes(q)) ||
        p.ingredients.some((i) => i.name.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  return (
    <Dialog.Root open={isSearchOpen} onOpenChange={(open) => !open && closeSearch()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-12 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-[94vw] sm:w-full max-w-2xl bg-white rounded-lg border border-ayur-border shadow-2xl overflow-hidden p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200">
          {/* Search Input Bar */}
          <div className="relative flex items-center px-3.5 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-ayur-primary mr-2.5 sm:mr-3 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search amla, triphala, digestion..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs sm:text-sm text-ayur-dark placeholder:text-stone-400 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 text-stone-400 hover:text-stone-700 mr-2"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <Dialog.Close asChild>
              <button
                className="text-xs text-stone-400 hover:text-stone-700 px-2 py-1 rounded bg-stone-100"
                aria-label="Close search"
              >
                ESC
              </button>
            </Dialog.Close>
          </div>

          {/* Results or Suggestions */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            {query.trim().length === 0 ? (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ayur-primary block mb-3 font-sans">
                  Popular Ayurvedic Searches
                </span>
                <div className="flex flex-wrap gap-2 mb-6">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-ayur-parchment/70 hover:bg-ayur-parchment text-xs text-ayur-dark font-medium border border-ayur-sand/60 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-ayur-sageSubtle/60 rounded border border-ayur-sage/20 flex items-start gap-3 text-xs text-ayur-dark">
                  <Sparkles className="w-4 h-4 text-ayur-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block text-ayur-primary">
                      Unsure what your Dosha needs?
                    </strong>
                    Consult our Ayurvedic Vaidyas for free personalized guidance on herb combinations and daily dinacharya regimens.
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm font-medium text-ayur-dark mb-1">
                  No formulations found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-ayur-muted">
                  Try searching for general concerns like &ldquo;digestion&rdquo;, &ldquo;liver&rdquo; or form factor &ldquo;juices&rdquo;.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ayur-muted block mb-3 font-sans">
                  Matching Formulations ({results.length})
                </span>
                <div className="space-y-2">
                  {results.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.slug}`}
                      onClick={closeSearch}
                      className="flex items-center justify-between p-3 rounded hover:bg-ayur-parchment/60 transition-colors group border border-transparent hover:border-ayur-border"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded bg-white overflow-hidden border border-stone-200 flex-shrink-0">
                          <ImageWithFallback
                            src={prod.images[0]}
                            alt={prod.name}
                            fill
                            className="object-cover"
                            fallbackTitle={prod.name}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-ayur-dark font-serif group-hover:text-ayur-primary truncate">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] text-ayur-muted font-serif italic truncate block">
                            {prod.sanskritName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-ayur-dark font-sans">
                          {formatINR(prod.variants[0].price)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-ayur-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 text-center">
                  <Link
                    href={`/collections/all-products?q=${encodeURIComponent(query)}`}
                    onClick={closeSearch}
                    className="text-xs font-semibold text-ayur-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>View all results for &ldquo;{query}&rdquo;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
