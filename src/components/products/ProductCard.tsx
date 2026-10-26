"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Check, Plus, Eye } from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { StarRating } from "@/components/common/StarRating";
import { Badge } from "@/components/common/Badge";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUIStore } from "@/store/useUIStore";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { openQuickView, showToast } = useUIStore();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedVariant, 1);
    setJustAdded(true);
    showToast(`Added ${product.name} (${selectedVariant.title}) to your bag`, "success");
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      isFavorited
        ? `Removed ${product.name} from wishlist`
        : `Added ${product.name} to wishlist`,
      "info"
    );
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  // List View Mode
  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded border border-ayur-border/80 hover:border-ayur-primary/50 transition-all duration-300 hover:shadow-card flex flex-col sm:flex-row overflow-hidden p-3.5 sm:p-4 gap-4 sm:gap-5">
        {/* Thumbnail Image */}
        <Link
          href={`/products/${product.slug}`}
          className="relative w-full sm:w-48 h-44 sm:h-48 flex-shrink-0 bg-ayur-parchment/40 overflow-hidden rounded"
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 200px"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            fallbackTitle={product.name}
          />
          {product.isBestseller && (
            <div className="absolute top-2 left-2">
              <Badge variant="bestseller">Bestseller</Badge>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ayur-muted font-medium">
                {product.categoryLabel}
              </span>
              <button
                onClick={handleWishlistToggle}
                className="text-ayur-muted hover:text-ayur-accent p-1 transition-colors"
                aria-label={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited ? "fill-ayur-accent text-ayur-accent" : ""
                  }`}
                />
              </button>
            </div>

            <Link href={`/products/${product.slug}`} className="block group-hover:text-ayur-primary">
              <h3 className="font-serif text-base sm:text-lg font-bold text-ayur-dark leading-snug line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-ayur-secondary font-serif italic mb-1">
                {product.sanskritName}
              </p>
            </Link>

            <div className="my-2">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <p className="text-xs text-ayur-muted line-clamp-2 leading-relaxed mb-3">
              {product.shortDescription}
            </p>

            {/* Key Attributes */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.attributes.slice(0, 3).map((attr) => (
                <Badge key={attr} variant="attribute">
                  {attr}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-ayur-dark font-sans">
                  {formatINR(selectedVariant.price)}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <span className="text-xs text-ayur-muted line-through font-sans">
                    {formatINR(selectedVariant.mrp)}
                  </span>
                )}
                {selectedVariant.discountPercent > 0 && (
                  <Badge variant="discount">
                    Save {selectedVariant.discountPercent}%
                  </Badge>
                )}
              </div>
              <span className="text-[10px] text-ayur-muted font-sans">
                {selectedVariant.unitPriceText} • Incl. of taxes
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenQuickView}
                className="px-3 py-1.5 border border-ayur-border rounded text-xs font-medium text-ayur-dark hover:bg-ayur-parchment transition-colors"
              >
                Quick View
              </button>
              <button
                onClick={handleQuickAdd}
                disabled={!selectedVariant.inStock}
                className={`px-3.5 sm:px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  justAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-ayur-primary text-white hover:bg-ayur-secondary"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode (Default)
  return (
    <div
      className="group relative bg-white rounded border border-ayur-border/80 hover:border-ayur-primary/50 transition-all duration-300 hover:shadow-card flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full bg-ayur-parchment/40 overflow-hidden block"
      >
        <ImageWithFallback
          src={
            isHovered && product.images[1] ? product.images[1] : product.images[0]
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-2.5 sm:p-3.5 transition-all duration-700 group-hover:scale-105"
          fallbackTitle={product.name}
        />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 sm:gap-1.5 z-10">
          {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {selectedVariant.discountPercent > 0 && (
            <Badge variant="discount">
              Save {selectedVariant.discountPercent}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200/80 flex items-center justify-center text-ayur-dark hover:text-ayur-accent hover:bg-white transition-all shadow-sm"
          aria-label={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited
                ? "fill-ayur-accent text-ayur-accent scale-110"
                : "group-hover:scale-105 stroke-[1.75]"
            }`}
          />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <button
          onClick={handleOpenQuickView}
          className="hidden sm:flex absolute bottom-2.5 left-2.5 right-2.5 z-10 py-2 px-3 bg-white/95 backdrop-blur-sm text-ayur-dark text-xs font-semibold rounded items-center justify-center gap-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-ayur-primary hover:text-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </Link>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ayur-muted font-medium block mb-0.5 sm:mb-1 truncate">
            {product.categoryLabel}
          </span>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block group-hover:text-ayur-primary">
            <h3 className="font-serif text-sm sm:text-base font-bold text-ayur-dark leading-snug line-clamp-1 mb-0.5">
              {product.name}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-ayur-secondary font-serif italic line-clamp-1 mb-1.5 sm:mb-2">
              {product.sanskritName}
            </p>
          </Link>

          {/* Rating */}
          <div className="mb-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          {/* Short Benefit */}
          <p className="text-[11px] sm:text-xs text-ayur-muted line-clamp-2 leading-relaxed mb-2.5 sm:mb-3 min-h-[28px] sm:min-h-[32px]">
            {product.shortDescription}
          </p>

          {/* Variant Selector Pills if multi-variant */}
          {product.variants.length > 1 && (
            <div className="flex flex-wrap gap-1 mb-2.5 sm:mb-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(v);
                  }}
                  className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] rounded font-medium transition-all ${
                    selectedVariant.id === v.id
                      ? "bg-ayur-primary text-white"
                      : "bg-ayur-parchment/70 text-ayur-dark hover:bg-ayur-parchment border border-ayur-border/60"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-1.5 sm:gap-2 mt-auto">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 sm:gap-1.5 truncate">
              <span className="text-sm sm:text-base font-bold text-ayur-dark font-sans">
                {formatINR(selectedVariant.price)}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-[10px] sm:text-xs text-ayur-muted line-through font-sans">
                  {formatINR(selectedVariant.mrp)}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-ayur-muted font-sans block truncate">
              {selectedVariant.unitPriceText}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!selectedVariant.inStock}
            className={`px-3 sm:px-3.5 py-2 rounded text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-all flex-shrink-0 min-h-[38px] sm:min-h-[36px] ${
              justAdded
                ? "bg-emerald-700 text-white"
                : "bg-ayur-primary text-white hover:bg-ayur-secondary"
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
