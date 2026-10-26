"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { PRODUCTS } from "@/data/products";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { formatINR } from "@/lib/utils";
import Link from "next/link";

export function WishlistDrawer() {
  const { wishlistIds, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { showToast } = useUIStore();

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (prod: (typeof PRODUCTS)[0]) => {
    addItem(prod, prod.variants[0], 1);
    removeFromWishlist(prod.id);
    showToast(`Moved ${prod.name} to your bag`, "success");
  };

  return (
    <Dialog.Root open={isWishlistOpen} onOpenChange={(open) => !open && closeWishlist()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white border-l border-ayur-border shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-ayur-accent fill-ayur-accent/20" />
              <Dialog.Title className="font-serif text-base sm:text-lg font-bold text-ayur-dark">
                Saved Formulations
              </Dialog.Title>
              <span className="text-xs text-ayur-muted font-sans">
                ({savedProducts.length})
              </span>
            </div>

            <Dialog.Close asChild>
              <button
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
            {savedProducts.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-ayur-parchment flex items-center justify-center mx-auto mb-4 text-ayur-accent">
                  <Heart className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-serif text-lg font-bold text-ayur-dark mb-1">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-ayur-muted max-w-xs mx-auto mb-6">
                  Save your favorite classical juices, wellness bundles, and herbal extracts for later.
                </p>
                <Dialog.Close asChild>
                  <Link
                    href="/collections/all-products"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-colors"
                  >
                    <span>Explore Formulations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Dialog.Close>
              </div>
            ) : (
              <div className="space-y-4">
                {savedProducts.map((prod) => {
                  const defaultVar = prod.variants[0];
                  return (
                    <div
                      key={prod.id}
                      className="flex gap-4 p-3 bg-ayur-parchment/40 rounded border border-ayur-border/70 items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Link
                          href={`/products/${prod.slug}`}
                          onClick={closeWishlist}
                          className="relative w-16 h-16 rounded overflow-hidden bg-white border border-stone-200 flex-shrink-0"
                        >
                          <ImageWithFallback
                            src={prod.images[0]}
                            alt={prod.name}
                            fill
                            className="object-contain p-1"
                            fallbackTitle={prod.name}
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            href={`/products/${prod.slug}`}
                            onClick={closeWishlist}
                            className="hover:text-ayur-primary"
                          >
                            <h5 className="text-xs font-bold text-ayur-dark font-serif truncate">
                              {prod.name}
                            </h5>
                          </Link>
                          <span className="text-[11px] text-ayur-muted block">
                            {defaultVar.size}
                          </span>
                          <span className="text-xs font-bold text-ayur-dark font-sans block mt-0.5">
                            {formatINR(defaultVar.price)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-end">
                        <button
                          onClick={() => handleMoveToCart(prod)}
                          className="px-3 py-1.5 bg-ayur-primary text-white text-[11px] font-semibold rounded hover:bg-ayur-secondary flex items-center gap-1 transition-colors whitespace-nowrap shadow-sm"
                        >
                          <ShoppingBag className="w-3 h-3 text-ayur-gold" />
                          <span>Add to Bag</span>
                        </button>
                        <button
                          onClick={() => removeFromWishlist(prod.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${prod.name} from wishlist`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
