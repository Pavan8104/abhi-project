"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  CheckCircle2,
  PackageCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/lib/utils";

export function DemoCheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    appliedCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
    clearCart,
  } = useCartStore();

  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod" | "card">("upi");

  // Mock form state
  const [formData, setFormData] = useState({
    name: "Aditya Verma",
    phone: "+91 98765 43210",
    email: "aditya.verma@example.com",
    address: "42, Shanti Niketan, Near Ayurvedic Garden",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302015",
  });

  const [orderId, setOrderId] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const grandTotal = getGrandTotal();

  const handleSimulatePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const demoId = `SARVA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(demoId);
    setStep("confirmation");
    clearCart();
  };

  const handleClose = () => {
    setStep("form");
    closeCheckout();
  };

  return (
    <Dialog.Root open={isCheckoutOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[94vw] sm:w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-lg border border-ayur-border shadow-2xl p-4 sm:p-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-200">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-ayur-primary font-bold">
                Client Demo Environment
              </span>
              <Dialog.Title className="font-serif text-lg sm:text-2xl font-bold text-ayur-dark">
                {step === "form" ? "Simulated Demo Checkout" : "Simulated Order Confirmed"}
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Mandatory Demo Safety Banner */}
          <div className="my-3 sm:my-4 p-3 sm:p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-md flex items-start gap-2.5 sm:gap-3 text-xs text-amber-900 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-amber-950">
                Notice: Simulation Mode Only
              </strong>
              This storefront is an interactive frontend demonstration. No actual monetary payments are processed, no real bank card information is collected, and no real physical orders are dispatched.
            </div>
          </div>

          {step === "form" ? (
            <form onSubmit={handleSimulatePlaceOrder} className="space-y-5 sm:space-y-6">
              {/* Delivery Address Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans mb-3 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span>1. Delivery Destination (Demo Address)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Shipping Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Simulated Payment Method</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <label
                    className={`flex items-center sm:flex-col sm:justify-center p-2.5 sm:p-3 rounded border cursor-pointer text-left sm:text-center transition-all gap-2.5 sm:gap-1 ${
                      paymentMethod === "upi"
                        ? "border-ayur-primary bg-ayur-sageSubtle text-ayur-primary font-bold shadow-sm"
                        : "border-stone-200 text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="sr-only"
                    />
                    <QrCode className="w-5 h-5 text-ayur-primary flex-shrink-0" />
                    <span className="text-xs">UPI / QR (Demo)</span>
                  </label>

                  <label
                    className={`flex items-center sm:flex-col sm:justify-center p-2.5 sm:p-3 rounded border cursor-pointer text-left sm:text-center transition-all gap-2.5 sm:gap-1 ${
                      paymentMethod === "cod"
                        ? "border-ayur-primary bg-ayur-sageSubtle text-ayur-primary font-bold shadow-sm"
                        : "border-stone-200 text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <Banknote className="w-5 h-5 text-ayur-primary flex-shrink-0" />
                    <span className="text-xs">Cash on Delivery</span>
                  </label>

                  <label
                    className={`flex items-center sm:flex-col sm:justify-center p-2.5 sm:p-3 rounded border cursor-pointer text-left sm:text-center transition-all gap-2.5 sm:gap-1 ${
                      paymentMethod === "card"
                        ? "border-ayur-primary bg-ayur-sageSubtle text-ayur-primary font-bold shadow-sm"
                        : "border-stone-200 text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 text-ayur-primary flex-shrink-0" />
                    <span className="text-xs">Cards / NetBanking</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 bg-stone-50 rounded border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between font-medium text-stone-700">
                  <span>Items Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-sans">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-sans">-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-700">
                  <span>Shipping Fee</span>
                  <span className="font-sans">
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-ayur-dark pt-2 border-t border-stone-200">
                  <span>Payable Amount</span>
                  <span className="text-base text-ayur-primary font-sans">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-ayur-primary text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-ayur-secondary transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Simulate Order Placement ({formatINR(grandTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-ayur-dark mb-1">
                  Simulated Order Confirmed!
                </h3>
                <p className="text-xs text-ayur-muted">
                  Demo Reference ID:{" "}
                  <strong className="text-ayur-dark font-mono text-sm">{orderId}</strong>
                </p>
              </div>

              <div className="p-4 bg-ayur-parchment/60 rounded border border-ayur-sand/80 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-ayur-primary font-semibold">
                  <PackageCheck className="w-4 h-4" />
                  <span>Simulated Dispatch Timeline</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  In a production environment, freshly bottled Swarasa juices are cold-packed within 24 hours from our Pratapgarh facility and delivered in insulated packaging.
                </p>
                <div className="pt-2 border-t border-ayur-sand text-stone-700 text-[11px]">
                  <strong>Demo Recipient:</strong> {formData.name} • {formData.phone}
                  <br />
                  <strong>Demo Address:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
