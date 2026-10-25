"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariant } from "@/types/product";
import { CartItem, CouponCode } from "@/types/cart";

export const AVAILABLE_COUPONS: CouponCode[] = [
  {
    code: "SARVA10",
    discountPercentage: 10,
    description: "10% off on authentic SARVA NATURAL formulations",
    minOrderValue: 399,
  },
  {
    code: "SARVA15",
    discountPercentage: 15,
    description: "15% off on orders above ₹999",
    minOrderValue: 999,
  },
  {
    code: "AYURVEDA10",
    discountPercentage: 10,
    description: "10% off on authentic Ayurvedic formulations",
    minOrderValue: 399,
  },
  {
    code: "VEDA15",
    discountPercentage: 15,
    description: "15% off on orders above ₹999",
    minOrderValue: 999,
  },
];

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  appliedCoupon: CouponCode | null;
  couponError: string | null;

  // Actions
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Getters
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getGrandTotal: () => number;
  getItemCount: () => number;
  getRemainingForFreeShipping: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      appliedCoupon: null,
      couponError: null,

      addItem: (product, variant, quantity = 1) => {
        const selectedVariant = variant || product.variants[0];
        const lineId = `${product.id}-${selectedVariant.id}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === lineId);
          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems, isCartOpen: true };
          } else {
            return {
              items: [
                ...state.items,
                {
                  id: lineId,
                  productId: product.id,
                  product,
                  variant: selectedVariant,
                  quantity,
                },
              ],
              isCartOpen: true,
            };
          }
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, couponError: null });
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
        const subtotal = get().getSubtotal();

        if (!found) {
          set({ couponError: "Invalid coupon code. Try 'SARVA10'." });
          return false;
        }

        if (subtotal < found.minOrderValue) {
          set({
            couponError: `Order subtotal must be at least ₹${found.minOrderValue} to apply ${found.code}.`,
          });
          return false;
        }

        set({ appliedCoupon: found, couponError: null });
        return true;
      },

      removeCoupon: () => set({ appliedCoupon: null, couponError: null }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const { appliedCoupon } = get();
        const subtotal = get().getSubtotal();
        if (!appliedCoupon) return 0;
        return Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 399 ? 0 : 50;
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getRemainingForFreeShipping: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, 399 - subtotal);
      },
    }),
    {
      name: "sarva-natural-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
);
