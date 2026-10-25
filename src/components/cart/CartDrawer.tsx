"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Tag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CartItemRow } from "./CartItemRow";
import { CartCrossSells } from "./CartCrossSells";
import { formatINR } from "@/lib/utils";
import Link from "next/link";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
    getRemainingForFreeShipping,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const grandTotal = getGrandTotal();
  const remainingForFreeShipping = getRemainingForFreeShipping();

  const freeShippingProgress = Math.min(100, Math.round((subtotal / 399) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput("");
  };

  return (
    <Dialog.Root open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white border-l border-ayur-border shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-ayur-primary" />
              <Dialog.Title className="font-serif text-base sm:text-lg font-bold text-ayur-dark">
                Your Ayurvedic Bag
              </Dialog.Title>
              <span className="text-xs text-ayur-muted font-sans">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>

            <Dialog.Close asChild>
              <button
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-ayur-parchment/60 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-stone-200">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 font-medium text-ayur-dark text-[11px] sm:text-xs">
                <Truck className="w-4 h-4 text-ayur-primary flex-shrink-0" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    You unlocked FREE Express Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatINR(remainingForFreeShipping)}</strong> more for FREE delivery
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] text-ayur-muted font-mono flex-shrink-0">
                ₹399 Target
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-ayur-primary h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
            {items.length === 0 ? (
              <div className="py-14 text-center">
                <div className="w-16 h-16 rounded-full bg-ayur-parchment flex items-center justify-center mx-auto mb-4 text-ayur-primary">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h4 className="font-serif text-lg font-bold text-ayur-dark mb-1">
                  Your bag is empty
                </h4>
                <p className="text-xs text-ayur-muted max-w-xs mx-auto mb-6">
                  Explore our classical wild-harvested juices, herbal oils, and health bundles.
                </p>
                <Dialog.Close asChild>
                  <Link
                    href="/collections/all-products"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-colors"
                  >
                    <span>Browse All Formulations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Dialog.Close>
              </div>
            ) : (
              <div className="space-y-1">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} onItemClick={closeCart} />
                ))}

                {/* Cross-Sell Carousel */}
                <CartCrossSells />
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 p-4 sm:p-6 bg-stone-50/70 space-y-3.5 sm:space-y-4">
              {/* Promo code form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercentage}% off)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-emerald-700 hover:text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. SARVA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-ayur-primary uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-ayur-dark text-white rounded text-xs font-semibold hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">{couponError}</p>
                )}
              </div>

              {/* Cost summary table */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900 font-sans">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-medium font-sans">-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Express Shipping</span>
                  <span className="font-medium font-sans">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-ayur-dark pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="text-base text-ayur-primary font-sans">
                    {formatINR(grandTotal)}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 block text-right">
                  Inclusive of all applicable GST
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={openCheckout}
                className="w-full py-3.5 px-4 bg-ayur-primary text-white rounded font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-ayur-secondary transition-all shadow-md active:scale-[0.99]"
              >
                <span>Proceed to Demo Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-ayur-muted text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-ayur-primary" />
                <span>Demo prototype: No real financial transaction will occur.</span>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
