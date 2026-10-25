"use client";

import React, { useState } from "react";
import { Product, ProductVariant } from "@/types/product";
import { StarRating } from "@/components/common/StarRating";
import { Badge } from "@/components/common/Badge";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useConsultationStore } from "@/store/useConsultationStore";
import { useUIStore } from "@/store/useUIStore";
import {
  ShoppingBag,
  Heart,
  Sparkles,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Flame,
} from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem, openCheckout } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { openConsultation } = useConsultationStore();
  const { showToast } = useUIStore();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setJustAdded(true);
    showToast(`Added ${quantity}x ${product.name} to your bag`, "success");
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    openCheckout();
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeResult("Express Delivery Available: Estimated delivery in 2-3 business days.");
    } else {
      setPincodeResult("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Category and Subtitle */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-ayur-primary font-bold">
            {product.categoryLabel}
          </span>
          <button
            onClick={() => {
              toggleWishlist(product.id);
              showToast(
                isFavorited
                  ? `Removed ${product.name} from wishlist`
                  : `Added ${product.name} to wishlist`,
                "info"
              );
            }}
            className="text-stone-400 hover:text-ayur-accent p-1.5 transition-colors"
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? "fill-ayur-accent text-ayur-accent" : ""
              }`}
            />
          </button>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ayur-dark mt-1 leading-tight">
          {product.name}
        </h1>
        <p className="text-sm font-serif italic text-ayur-secondary mt-1">
          {product.sanskritName} • {product.subtitle}
        </p>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" showDemoNotice />
        <span className="text-stone-300">|</span>
        <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>AYUSH Licensed</span>
        </span>
      </div>

      {/* Pricing Block */}
      <div className="p-4 rounded-lg bg-ayur-parchment/60 border border-ayur-sand/80">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-ayur-dark font-sans">
            {formatINR(selectedVariant.price)}
          </span>
          {selectedVariant.mrp > selectedVariant.price && (
            <span className="text-base text-ayur-muted line-through font-sans">
              {formatINR(selectedVariant.mrp)}
            </span>
          )}
          {selectedVariant.discountPercent > 0 && (
            <Badge variant="discount">
              Save {selectedVariant.discountPercent}% OFF
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-ayur-muted font-sans">
          <span>{selectedVariant.unitPriceText}</span>
          <span>•</span>
          <span>Inclusive of all taxes</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold">Free Express Shipping on ₹399+</span>
        </div>
      </div>

      {/* Short benefit */}
      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
        {product.shortDescription}
      </p>

      {/* Key Attribute Badges */}
      <div className="flex flex-wrap gap-2">
        {product.attributes.map((attr) => (
          <Badge key={attr} variant="attribute">
            {attr}
          </Badge>
        ))}
      </div>

      {/* Variant Selector */}
      {product.variants.length > 1 && (
        <div className="pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans block mb-2.5">
            Select Size / Pack:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.id === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded border text-left transition-all ${
                    isSelected
                      ? "border-ayur-primary bg-ayur-sageSubtle shadow-sm ring-1 ring-ayur-primary"
                      : "border-stone-200 bg-white hover:border-ayur-sage"
                  }`}
                >
                  <span className="text-xs font-bold text-ayur-dark block truncate">
                    {v.title}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs font-bold text-ayur-primary font-sans">
                      {formatINR(v.price)}
                    </span>
                    {v.mrp > v.price && (
                      <span className="text-[10px] text-stone-400 line-through font-sans">
                        {formatINR(v.mrp)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-500 font-sans block mt-0.5">
                    {v.unitPriceText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTAs */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans">
            Quantity:
          </span>
          <div className="inline-flex items-center border border-stone-300 rounded bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3.5 py-1.5 text-stone-700 hover:text-black hover:bg-stone-100 transition-colors font-bold text-sm"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 py-1.5 text-xs font-bold text-ayur-dark font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3.5 py-1.5 text-stone-700 hover:text-black hover:bg-stone-100 transition-colors font-bold text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <span className="text-xs text-stone-500">
            {selectedVariant.inStock ? (
              <span className="text-emerald-700 font-medium">● In Stock (Dispatches within 24h)</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant.inStock}
            className={`py-3.5 px-6 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
              justAdded
                ? "bg-emerald-700 text-white"
                : "bg-ayur-primary text-white hover:bg-ayur-secondary"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-ayur-gold" />
                <span>Add to Bag — {formatINR(selectedVariant.price * quantity)}</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!selectedVariant.inStock}
            className="py-3.5 px-6 bg-ayur-gold text-ayur-dark rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-ayur-goldMuted transition-all shadow-sm active:scale-[0.99]"
          >
            <Flame className="w-4 h-4 text-ayur-dark" />
            <span>Buy Now (Demo Checkout)</span>
          </button>
        </div>
      </div>

      {/* Ask Our Vaidya Interactive Trigger */}
      <div className="p-3.5 sm:p-4 rounded-lg bg-ayur-sageSubtle/70 border border-ayur-sage/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h4 className="text-xs font-bold text-ayur-primary font-sans flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-ayur-gold" />
            <span>Have questions about this formulation?</span>
          </h4>
          <p className="text-[11px] text-stone-600 mt-0.5">
            Speak to an Ayurvedic doctor regarding dosage timing and your Dosha type.
          </p>
        </div>
        <button
          onClick={() =>
            openConsultation({
              concern: product.healthConcerns[0],
              product: { name: product.name, slug: product.slug },
            })
          }
          className="w-full sm:w-auto px-3.5 py-2 bg-white border border-ayur-primary text-ayur-primary hover:bg-ayur-primary hover:text-white rounded text-xs font-semibold whitespace-nowrap transition-colors shadow-xs text-center"
        >
          Ask our Vaidya
        </button>
      </div>

      {/* Pincode Delivery Estimator */}
      <div className="pt-2 border-t border-stone-200">
        <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
          <div className="relative flex-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter 6-digit PIN code..."
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded transition-colors"
          >
            Check
          </button>
        </form>
        {pincodeResult && (
          <p className="text-[11px] text-stone-600 mt-2 font-medium">
            {pincodeResult}
          </p>
        )}
      </div>

      {/* Trust micro-list */}
      <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-ayur-primary flex-shrink-0" />
          <span>Dispatches within 24 Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-ayur-primary flex-shrink-0" />
          <span>7-Day Return / Replacement Policy</span>
        </div>
      </div>
    </div>
  );
}
