"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  wishlistIds: string[];
  isWishlistOpen: boolean;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  removeFromWishlist: (productId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: ["prod-amla-juice", "prod-kumkumadi-tailam"], // pleasant default demo state
      isWishlistOpen: false,

      toggleWishlist: (productId: string) => {
        set((state) => {
          const exists = state.wishlistIds.includes(productId);
          return {
            wishlistIds: exists
              ? state.wishlistIds.filter((id) => id !== productId)
              : [...state.wishlistIds, productId],
          };
        });
      },

      isInWishlist: (productId: string) => {
        return get().wishlistIds.includes(productId);
      },

      openWishlist: () => set({ isWishlistOpen: true }),
      closeWishlist: () => set({ isWishlistOpen: false }),

      removeFromWishlist: (productId: string) => {
        set((state) => ({
          wishlistIds: state.wishlistIds.filter((id) => id !== productId),
        }));
      },
    }),
    {
      name: "krishna-ayurveda-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wishlistIds: state.wishlistIds,
      }),
    }
  )
);
