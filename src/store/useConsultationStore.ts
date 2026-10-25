"use client";

import { create } from "zustand";
import { HealthConcern } from "@/types/product";

interface ConsultationState {
  isOpen: boolean;
  prefillConcern?: HealthConcern;
  prefillProduct?: {
    name: string;
    slug: string;
  } | null;

  openConsultation: (options?: {
    concern?: HealthConcern;
    product?: { name: string; slug: string };
  }) => void;
  closeConsultation: () => void;
}

export const useConsultationStore = create<ConsultationState>((set) => ({
  isOpen: false,
  prefillConcern: undefined,
  prefillProduct: null,

  openConsultation: (options) => {
    set({
      isOpen: true,
      prefillConcern: options?.concern,
      prefillProduct: options?.product || null,
    });
  },

  closeConsultation: () => {
    set({
      isOpen: false,
      prefillConcern: undefined,
      prefillProduct: null,
    });
  },
}));
