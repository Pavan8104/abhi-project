"use client";

import React, { useState, useMemo, useTransition, useCallback } from "react";
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
  const queryMinPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 199;
  const queryMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 2200;
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
    setPriceRange([199, 2200]);
    syncUrlParams(selectedCategories, selectedConcerns, selectedAttributes, [199, 2200], inStockOnly, sortOption);
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
    setPriceRange([199, 2200]);
    setInStockOnly(false);
    setSortOption("featured");
    syncUrlParams([], [], [], [199, 2200], false, "featured");
  };

  // Filter and sort the products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
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
    (priceRange[0] > 199 || priceRange[1] < 2200 ? 1 : 0);

  // Dynamic header based on slug
  const title =
    pageTitle ||
    (initialSlug === "all-products"
      ? "All Classical Ayurvedic Formulations"
      : initialSlug.charAt(0).toUpperCase() + initialSlug.slice(1).replace("-", " "));

  const description =
    pageDescription ||
    "Explore our complete range of unadulterated cold-pressed juices, classical kwaths, medicated tailas, and restorative wellness kits.";

  return (
    <div className="bg-ayur-cream min-h-screen py-8 sm:py-14 border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title Banner */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs text-ayur-muted mb-2 font-sans truncate">
            <span>Home</span>
            <span>/</span>
            <span>Collections</span>
            <span>/</span>
            <span className="text-ayur-primary font-medium truncate">{title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-ayur-border/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-ayur-sageLight/70 border border-ayur-sage/30 text-[10px] sm:text-[11px] font-semibold text-ayur-primary uppercase tracking-wider mb-2">
                <Leaf className="w-3 h-3" />
                <span>Vedic Apothecary Catalog</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ayur-dark">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 sm:mt-2 max-w-2xl font-sans leading-relaxed">
                {description}
              </p>
            </div>

            <span className="text-xs font-medium text-ayur-dark font-sans self-start md:self-end">
              Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} formulations
            </span>
          </div>
        </div>

        {/* Filter Bar Controls */}
        <div className="bg-white p-2.5 sm:p-4 rounded-lg border border-ayur-border shadow-soft flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Filter Drawer Trigger */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-all shadow-xs"
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
            <label className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer ml-1">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => handleToggleInStock(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-stone-300 text-ayur-primary focus:ring-ayur-primary"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <SortDropdown currentSort={sortOption} onSortChange={handleSortChange} />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
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
