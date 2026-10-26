"use client";

import React, { useState, useMemo, useTransition, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { HealthConcern, SortOption } from "@/types/product";
import { PRODUCTS } from "@/data/products";
import { HEALTH_CONCERNS, FORM_FACTORS } from "@/data/categories";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFiltersDrawer } from "@/components/products/ProductFiltersDrawer";
import { ActiveFilterChips } from "@/components/products/ActiveFilterChips";
import { SortDropdown } from "@/components/products/SortDropdown";
import { ViewToggle } from "@/components/products/ViewToggle";
import { SlidersHorizontal, Leaf } from "lucide-react";

interface CatalogViewProps {
  initialSlug?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export function CatalogView({
  initialSlug = "all-products",
  pageTitle,
  pageDescription,
}: CatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Read initial states from URL params or props
  const queryConcern = searchParams.get("concern") as HealthConcern | null;
  const queryCategory = searchParams.get("category");
  const querySort = (searchParams.get("sort") as SortOption) || "featured";
  const queryMinPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 350;
  const queryMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 1600;
  const queryInStock = searchParams.get("inStock") === "true";
  const searchQuery = searchParams.get("q") || "";

  // If initialSlug is a specific category or concern, prefill
  const initialCategoryFromSlug = FORM_FACTORS.some((f) => f.slug === initialSlug)
    ? [initialSlug]
    : [];
  const initialConcernFromSlug = HEALTH_CONCERNS.some((c) => c.slug === initialSlug)
    ? ([initialSlug] as HealthConcern[])
    : [];

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (queryCategory) return queryCategory.split(",").filter(Boolean);
    return initialCategoryFromSlug;
  });

  const [selectedConcerns, setSelectedConcerns] = useState<HealthConcern[]>(() => {
    if (queryConcern) return [queryConcern];
    return initialConcernFromSlug;
  });

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(() => {
    const attr = searchParams.get("attributes");
    return attr ? attr.split(",").filter(Boolean) : [];
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([queryMinPrice, queryMaxPrice]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(queryInStock);
  const [sortOption, setSortOption] = useState<SortOption>(querySort);

  // Sync state back to URL parameters seamlessly
  const syncUrlParams = useCallback(
    (
      cats: string[],
      concerns: HealthConcern[],
      attrs: string[],
      price: [number, number],
      inStock: boolean,
      sort: SortOption
    ) => {
      startTransition(() => {
        const params = new URLSearchParams();

        if (cats.length > 0) params.set("category", cats.join(","));
        if (concerns.length > 0) params.set("concern", concerns.join(","));
        if (attrs.length > 0) params.set("attributes", attrs.join(","));
        if (price[0] > 199) params.set("minPrice", price[0].toString());
        if (price[1] < 2200) params.set("maxPrice", price[1].toString());
        if (inStock) params.set("inStock", "true");
        if (sort !== "featured") params.set("sort", sort);
        if (searchQuery) params.set("q", searchQuery);

        const newQueryString = params.toString();
        const targetPath = newQueryString ? `${pathname}?${newQueryString}` : pathname;
        router.replace(targetPath, { scroll: false });
      });
    },
    [pathname, router, searchQuery]
  );

  // Handlers
  const handleToggleCategory = (catSlug: string) => {
    const next = selectedCategories.includes(catSlug)
      ? selectedCategories.filter((c) => c !== catSlug)
      : [...selectedCategories, catSlug];
    setSelectedCategories(next);
    syncUrlParams(next, selectedConcerns, selectedAttributes, priceRange, inStockOnly, sortOption);
  };

  const handleToggleConcern = (concernId: HealthConcern) => {
    const next = selectedConcerns.includes(concernId)
      ? selectedConcerns.filter((c) => c !== concernId)
      : [...selectedConcerns, concernId];
    setSelectedConcerns(next);
    syncUrlParams(selectedCategories, next, selectedAttributes, priceRange, inStockOnly, sortOption);
  };

  const handleToggleAttribute = (attr: string) => {
    const next = selectedAttributes.includes(attr)
      ? selectedAttributes.filter((a) => a !== attr)
      : [...selectedAttributes, attr];
    setSelectedAttributes(next);
    syncUrlParams(selectedCategories, selectedConcerns, next, priceRange, inStockOnly, sortOption);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    syncUrlParams(selectedCategories, selectedConcerns, selectedAttributes, newRange, inStockOnly, sortOption);
  };

  const handleResetPrice = () => {
    setPriceRange([350, 1600]);
    syncUrlParams(selectedCategories, selectedConcerns, selectedAttributes, [350, 1600], inStockOnly, sortOption);
  };

  const handleToggleInStock = (val: boolean) => {
    setInStockOnly(val);
    syncUrlParams(selectedCategories, selectedConcerns, selectedAttributes, priceRange, val, sortOption);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    syncUrlParams(selectedCategories, selectedConcerns, selectedAttributes, priceRange, inStockOnly, newSort);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedConcerns([]);
    setSelectedAttributes([]);
    setPriceRange([350, 1600]);
    setInStockOnly(false);
    setSortOption("featured");
    syncUrlParams([], [], [], [350, 1600], false, "featured");
  };

  // Filter and sort the products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Collection-specific filter
      if (initialSlug === "bestsellers") {
        if (!p.isBestseller) return false;
      } else if (initialSlug === "daily-wellness") {
        if (!p.healthConcerns.includes("daily-wellness")) return false;
      }

      // Search query filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.sanskritName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Categories (canonical slugs)
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(p.category)) return false;
      }

      // Health Concerns
      if (selectedConcerns.length > 0) {
        const matchesConcern = selectedConcerns.some((c) => p.healthConcerns.includes(c));
        if (!matchesConcern) return false;
      }

      // Attributes
      if (selectedAttributes.length > 0) {
        const matchesAttr = selectedAttributes.every((attr) => p.attributes.includes(attr));
        if (!matchesAttr) return false;
      }

      // Price range
      const lowestVariantPrice = Math.min(...p.variants.map((v) => v.price));
      if (lowestVariantPrice < priceRange[0] || lowestVariantPrice > priceRange[1]) {
        return false;
      }

      // In stock
      if (inStockOnly && !p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants[0].price;
      const priceB = b.variants[0].price;

      switch (sortOption) {
        case "price_asc":
          return priceA - priceB;
        case "price_desc":
          return priceB - priceA;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "featured":
        default:
          return (b.isBestseller ? 2 : 0) + (b.isFeatured ? 1 : 0) - ((a.isBestseller ? 2 : 0) + (a.isFeatured ? 1 : 0));
      }
    });
  }, [
    initialSlug,
    searchQuery,
    selectedCategories,
    selectedConcerns,
    selectedAttributes,
    priceRange,
    inStockOnly,
    sortOption,
  ]);

  const activeFiltersCount =
    selectedCategories.length +
    selectedConcerns.length +
    selectedAttributes.length +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] > 350 || priceRange[1] < 1600 ? 1 : 0);

  // Dynamic header based on slug
  let title = pageTitle;
  let description = pageDescription;

  if (!title) {
    if (initialSlug === "all-products") {
      title = "Shop All Products";
      description = "Our complete trio of pure, authenticated Ayurvedic botanical capsules.";
    } else if (initialSlug === "bestsellers") {
      title = "Bestselling Formulations";
      description = "Our most revered classical Ayurvedic formulations consistently chosen for purity and efficacy.";
    } else if (initialSlug === "herbal-wellness") {
      title = "Herbal Wellness Formulations";
      description = "Targeted botanical nutrition for mind, body, and cellular vitality.";
    } else if (initialSlug === "daily-wellness") {
      title = "Daily Wellness Essentials";
      description = "Cornerstone daily herbs for digestive detox and whole-food vitality.";
    } else {
      title = initialSlug.charAt(0).toUpperCase() + initialSlug.slice(1).replace("-", " ");
      description = "Pure, standardized Ayurvedic botanicals tested for absolute purity.";
    }
  }

  return (
    <div className="bg-ayur-cream min-h-screen py-8 sm:py-14 border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb & Centered Title Banner with Generous Whitespace */}
        <div className="text-center pt-2 pb-8 sm:pb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-ayur-muted mb-3 font-sans">
            <Link href="/" className="hover:text-ayur-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections/all-products" className="hover:text-ayur-primary transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span className="text-ayur-primary font-medium">{title}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ayur-sageLight/70 border border-ayur-sage/30 text-[10px] sm:text-[11px] font-semibold text-ayur-primary uppercase tracking-widest mb-3">
            <Leaf className="w-3 h-3 text-ayur-gold" />
            <span>100% PURE BOTANICAL EXTRACTS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ayur-dark tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-2 sm:mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            {description}
          </p>
        </div>

        {/* Clean Horizontal Pill-Shaped Catalog Toolbar */}
        <div className="bg-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-ayur-border/90 shadow-sm flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Filter Drawer Trigger */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-ayur-primary text-white text-xs font-semibold rounded-full hover:bg-ayur-secondary transition-all shadow-xs min-h-[36px]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-ayur-gold text-ayur-dark text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* In stock shortcut toggle on desktop */}
            <label className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer pl-1">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => handleToggleInStock(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-stone-300 text-ayur-primary focus:ring-ayur-primary"
              />
              <span>In Stock Only</span>
            </label>

            <span className="text-xs text-ayur-muted font-sans hidden md:inline-block border-l border-stone-200 pl-3">
              Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} formulations
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            <SortDropdown currentSort={sortOption} onSortChange={handleSortChange} />
          </div>
        </div>

        {/* Active Filter Chips */}
        <ActiveFilterChips
          selectedCategories={selectedCategories}
          onRemoveCategory={handleToggleCategory}
          selectedConcerns={selectedConcerns}
          onRemoveConcern={handleToggleConcern}
          selectedAttributes={selectedAttributes}
          onRemoveAttribute={handleToggleAttribute}
          priceRange={priceRange}
          onResetPrice={handleResetPrice}
          inStockOnly={inStockOnly}
          onToggleInStock={handleToggleInStock}
          onClearAll={handleClearAll}
        />

        {/* Product Grid / Skeleton */}
        <ProductGrid
          products={filteredProducts}
          isLoading={isPending}
          viewMode={viewMode}
          onResetFilters={handleClearAll}
        />
      </div>

      {/* Filter Drawer Dialog */}
      <ProductFiltersDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        selectedConcerns={selectedConcerns}
        onToggleConcern={handleToggleConcern}
        selectedAttributes={selectedAttributes}
        onToggleAttribute={handleToggleAttribute}
        priceRange={priceRange}
        onPriceChange={handlePriceChange}
        inStockOnly={inStockOnly}
        onToggleInStock={handleToggleInStock}
        onClearAll={handleClearAll}
        totalFilteredCount={filteredProducts.length}
      />
    </div>
  );
}
