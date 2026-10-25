"use client";

import { create } from "zustand";
import { Product } from "@/types/product";

interface ToastNotification {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface UIState {
  quickViewProduct: Product | null;
  isSearchOpen: boolean;
  toast: ToastNotification | null;

  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  openSearch: () => void;
  closeSearch: () => void;

  showToast: (message: string, type?: "success" | "info" | "error") => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  quickViewProduct: null,
  isSearchOpen: false,
  toast: null,

  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  showToast: (message, type = "success") => {
    const id = Date.now().toString();
    set({ toast: { id, message, type } });
    setTimeout(() => {
      set((state) => (state.toast?.id === id ? { toast: null } : state));
    }, 3500);
  },

  hideToast: () => set({ toast: null }),
}));
