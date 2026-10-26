"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Leaf,
  Trash2,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CartCrossSells } from "@/components/cart/CartCrossSells";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { formatINR } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeItem,
    clearCart,
    openCheckout,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
    getRemainingForFreeShipping,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const grandTotal = getGrandTotal();
  const remainingForFreeShipping = getRemainingForFreeShipping();
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) {
      setCouponCode("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-ayur-cream min-h-[75vh] py-16 sm:py-24 border-b border-ayur-border/60">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-ayur-parchment/80 border border-ayur-border flex items-center justify-center mx-auto mb-6 text-ayur-primary">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-ayur-gold uppercase mb-2 font-sans">
            Earth • Health • Wellness
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-dark mb-3">
            Your Ayurvedic Bag is Empty
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto mb-8 font-sans leading-relaxed">
            You have not added any classical herbal formulations yet. Explore our trio of pure, standardized Moringa, Triphala, and Ashwagandha botanical capsules.
          </p>
          <Link
            href="/collections/all-products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-ayur-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-ayur-secondary transition-all shadow-md group"
          >
            <span>Explore All Formulations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-14 pt-8 border-t border-ayur-border/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg border border-ayur-border/60">
              <Leaf className="w-5 h-5 text-ayur-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-ayur-dark font-serif">100% Botanical</h4>
                <p className="text-[11px] text-stone-600">Pure shade-dried whole herb extracts in vegetarian capsules.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg border border-ayur-border/60">
              <Truck className="w-5 h-5 text-ayur-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-ayur-dark font-serif">Free Shipping</h4>
                <p className="text-[11px] text-stone-600">Complimentary priority delivery across India on orders above ₹399.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg border border-ayur-border/60">
              <ShieldCheck className="w-5 h-5 text-ayur-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-ayur-dark font-serif">GMP Certified</h4>
                <p className="text-[11px] text-stone-600">Heavy-metal tested and manufactured under strict AYUSH standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ayur-cream min-h-screen py-8 sm:py-14 border-b border-ayur-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs text-ayur-muted mb-2 font-sans">
            <Link href="/" className="hover:text-ayur-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ayur-primary font-medium">Cart</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-ayur-border/80 pb-4">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ayur-dark">
              Your Ayurvedic Bag
            </h1>
            <span className="text-xs text-ayur-muted font-sans">
              {totalCount} {totalCount === 1 ? "item" : "items"} in your formulation regimen
            </span>
          </div>
        </div>

        {/* Free Shipping Alert Meter */}
        <div className="bg-white p-4 rounded-xl border border-ayur-border shadow-xs mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
            <div className="flex items-center gap-2 font-medium text-ayur-dark">
              <Truck className="w-4 h-4 text-ayur-primary flex-shrink-0" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Congratulations! You unlocked FREE Express Delivery across India.
                </span>
              ) : (
                <span>
                  Add <strong className="text-ayur-primary font-bold">{formatINR(remainingForFreeShipping)}</strong> more to unlock <strong>FREE Express Shipping</strong>
                </span>
              )}
            </div>
            <span className="text-xs text-ayur-muted font-mono hidden sm:inline">
              Target: ₹399
            </span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min(100, Math.round((subtotal / 399) * 100))}%`,
              }}
            />
          </div>
        </div>

        {/* Two-Column Grid: Bag Items vs Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Items Table (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-ayur-border shadow-xs overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 px-6 py-3 bg-stone-50 border-b border-ayur-border/80 text-[11px] font-bold uppercase tracking-wider text-ayur-muted">
                <span className="col-span-6">Formulation</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              <div className="divide-y divide-stone-100 px-4 sm:px-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 sm:py-5 flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 items-center"
                  >
                    {/* Item Details */}
                    <div className="sm:col-span-6 flex items-center gap-3.5 w-full">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-ayur-parchment/50 border border-stone-200/80 overflow-hidden flex-shrink-0"
                      >
                        <ImageWithFallback
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          fallbackTitle={item.product.name}
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-ayur-gold font-bold block mb-0.5">
                          {item.product.categoryLabel}
                        </span>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-serif text-sm sm:text-base font-bold text-ayur-dark hover:text-ayur-primary transition-colors block leading-snug line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[11px] text-ayur-secondary font-serif italic line-clamp-1">
                          {item.product.sanskritName}
                        </p>
                        <span className="inline-block mt-1 text-[11px] text-stone-500 font-sans">
                          {item.variant.title} ({item.variant.size})
                        </span>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-center hidden sm:block">
                      <span className="text-xs sm:text-sm font-semibold text-ayur-dark font-sans">
                        {formatINR(item.variant.price)}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center w-full sm:w-auto">
                      <div className="sm:hidden text-xs text-stone-600 font-medium">
                        Unit: {formatINR(item.variant.price)}
                      </div>
                      <div className="inline-flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-stone-600 hover:text-ayur-dark hover:bg-stone-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold text-ayur-dark font-mono min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-stone-600 hover:text-ayur-dark hover:bg-stone-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="sm:hidden flex items-center gap-3">
                        <span className="text-sm font-bold text-ayur-dark font-sans">
                          {formatINR(item.variant.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Line Total & Remove Button (Desktop) */}
                    <div className="sm:col-span-2 hidden sm:flex items-center justify-end gap-3 text-right">
                      <span className="text-sm font-bold text-ayur-dark font-sans">
                        {formatINR(item.variant.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-stone-100"
                        aria-label={`Remove ${item.product.name} from bag`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Toolbar */}
              <div className="px-4 sm:px-6 py-3.5 bg-stone-50/70 border-t border-stone-200 flex items-center justify-between">
                <Link
                  href="/collections/all-products"
                  className="text-xs text-ayur-primary hover:text-ayur-secondary font-semibold font-sans flex items-center gap-1.5 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>Continue Shopping</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-500 hover:text-red-600 font-medium transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Cross-Sells for Complementary Master Herbs */}
            <div className="bg-white rounded-xl border border-ayur-border shadow-xs p-5">
              <CartCrossSells />
            </div>
          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            <div className="bg-white rounded-xl border border-ayur-border shadow-sm p-5 sm:p-6 sticky top-24">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-ayur-dark pb-3 border-b border-stone-200">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div className="py-4 border-b border-stone-200">
                {appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="text-xs font-bold text-emerald-800">
                          {appliedCoupon.code}
                        </span>
                        <p className="text-[10px] text-emerald-600">
                          {appliedCoupon.discountPercentage}% Ayurvedic discount applied
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-emerald-700 hover:text-red-600 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Promotional Coupon
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try SARVA10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-ayur-primary font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-ayur-dark text-white rounded-lg text-xs font-semibold hover:bg-ayur-primary transition-colors flex-shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 py-4 border-b border-stone-200 text-xs sm:text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-ayur-dark font-sans">
                    {formatINR(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Ayurvedic Discount</span>
                    <span className="font-sans">-{formatINR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>Express Delivery</span>
                    {shipping === 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-ayur-dark font-sans">
                    {shipping === 0 ? "₹0" : formatINR(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Taxes (GST Included)</span>
                  <span className="font-semibold text-emerald-700 font-sans">Included</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-4 pb-5 flex items-baseline justify-between">
                <div>
                  <span className="text-base font-serif font-bold text-ayur-dark">Total Amount</span>
                  <p className="text-[10px] text-ayur-muted font-sans">Inclusive of all applicable taxes</p>
                </div>
                <span className="text-2xl font-serif font-bold text-ayur-primary">
                  {formatINR(grandTotal)}
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={openCheckout}
                className="w-full py-3.5 bg-ayur-primary hover:bg-ayur-secondary text-white rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Payment & Security Reassurances */}
              <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>256-Bit SSL Encrypted &amp; Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-600">
                  <Truck className="w-4 h-4 text-ayur-primary flex-shrink-0" />
                  <span>Dispatched within 24 Hours via Express Courier</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-600">
                  <Sparkles className="w-4 h-4 text-ayur-gold flex-shrink-0" />
                  <span>100% Vegetarian HPMC Capsules • No Gelatin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
