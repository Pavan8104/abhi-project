"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Check, ShoppingBag, Heart, Sparkles, MessageCircle } from "lucide-react";
import { buildProductInquiryWhatsAppUrl } from "@/lib/whatsapp";
import { useUIStore } from "@/store/useUIStore";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useConsultationStore } from "@/store/useConsultationStore";
import { ProductVariant } from "@/types/product";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { StarRating } from "@/components/common/StarRating";
import { Badge } from "@/components/common/Badge";
import { formatINR } from "@/lib/utils";
import Link from "next/link";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, showToast } = useUIStore();
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { openConsultation } = useConsultationStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct && quickViewProduct.variants.length > 0) {
      setSelectedVariant(quickViewProduct.variants[0]);
      setSelectedImageIndex(0);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedVariant) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addItem(quickViewProduct, selectedVariant, quantity);
    setJustAdded(true);
    showToast(`Added ${quantity}x ${quickViewProduct.name} to your bag`, "success");
    setTimeout(() => {
      setJustAdded(false);
      closeQuickView();
    }, 1200);
  };

  const handleAskVaidya = () => {
    closeQuickView();
    openConsultation({
      concern: quickViewProduct.healthConcerns[0],
      product: { name: quickViewProduct.name, slug: quickViewProduct.slug },
    });
  };

  return (
    <Dialog.Root open={!!quickViewProduct} onOpenChange={(open) => !open && closeQuickView()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[94vw] sm:w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg border border-ayur-border shadow-2xl p-4 sm:p-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200">
          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {/* Gallery Section */}
            <div>
              <div className="relative aspect-square w-full rounded bg-ayur-parchment/40 overflow-hidden mb-3 border border-stone-200">
                <ImageWithFallback
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  fill
                  className="object-contain p-3 sm:p-4"
                  fallbackTitle={quickViewProduct.name}
                />
                {quickViewProduct.isBestseller && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="bestseller">Bestseller</Badge>
                  </div>
                )}
              </div>

              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? "border-ayur-primary scale-105"
                          : "border-stone-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt="Thumbnail"
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-ayur-muted font-medium">
                  {quickViewProduct.categoryLabel}
                </span>

                <Dialog.Title className="font-serif text-2xl font-bold text-ayur-dark mt-1">
                  {quickViewProduct.name}
                </Dialog.Title>
                <p className="text-xs text-ayur-secondary font-serif italic mb-2">
                  {quickViewProduct.sanskritName}
                </p>

                <div className="mb-4">
                  <StarRating
                    rating={quickViewProduct.rating}
                    reviewCount={quickViewProduct.reviewCount}
                    showDemoNotice
                  />
                </div>

                {/* Price block */}
                <div className="p-3 bg-ayur-parchment/50 rounded border border-ayur-sand/60 mb-5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-bold text-ayur-dark font-sans">
                      {formatINR(selectedVariant.price)}
                    </span>
                    {selectedVariant.mrp > selectedVariant.price && (
                      <span className="text-sm text-ayur-muted line-through font-sans">
                        {formatINR(selectedVariant.mrp)}
                      </span>
                    )}
                    {selectedVariant.discountPercent > 0 && (
                      <Badge variant="discount">
                        Save {selectedVariant.discountPercent}%
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-ayur-muted font-sans block mt-1">
                    {selectedVariant.unitPriceText} • Free delivery on orders ₹399+
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-5">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Variant Selector */}
                {quickViewProduct.variants.length > 1 && (
                  <div className="mb-5">
                    <span className="text-xs font-semibold text-ayur-dark block mb-2">
                      Select Size / Pack:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 text-xs rounded border font-medium transition-all ${
                            selectedVariant.id === v.id
                              ? "bg-ayur-primary text-white border-ayur-primary shadow-sm"
                              : "bg-white text-stone-700 border-stone-200 hover:border-ayur-primary"
                          }`}
                        >
                          {v.title} — {formatINR(v.price)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-semibold text-ayur-dark">Quantity:</span>
                  <div className="inline-flex items-center rounded border border-stone-200 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-stone-600 hover:text-ayur-dark hover:bg-stone-100 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-semibold text-ayur-dark font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-stone-600 hover:text-ayur-dark hover:bg-stone-100 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-stone-100">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant.inStock}
                    className={`flex-1 py-3 px-4 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                      justAdded
                        ? "bg-emerald-700 text-white"
                        : "bg-ayur-primary text-white hover:bg-ayur-secondary"
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-ayur-gold" />
                        <span>Add to Bag — {formatINR(selectedVariant.price * quantity)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-3 border border-stone-200 rounded text-stone-600 hover:text-ayur-accent hover:border-ayur-accent transition-colors"
                    aria-label="Wishlist toggle"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? "fill-ayur-accent text-ayur-accent" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs pt-1 gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAskVaidya}
                      className="text-ayur-secondary hover:text-ayur-primary font-medium flex items-center gap-1 underline underline-offset-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
                      <span>Ask Vaidya</span>
                    </button>
                    <span className="text-stone-300">•</span>
                    <a
                      href={buildProductInquiryWhatsAppUrl({
                        productName: quickViewProduct.name,
                        variantTitle: selectedVariant.title,
                        price: selectedVariant.price,
                        pageUrl: `https://sarvanatural.com/products/${quickViewProduct.slug}`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                  <Link
                    href={`/products/${quickViewProduct.slug}`}
                    onClick={closeQuickView}
                    className="text-ayur-muted hover:text-ayur-dark underline underline-offset-2"
                  >
                    Full Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
