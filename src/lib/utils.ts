import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency with standard Indian numbering system (e.g., ₹1,499)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate percentage savings
 */
export function calculateSavings(price: number, mrp: number): { amount: number; percentage: number } {
  const amount = Math.max(0, mrp - price);
  const percentage = mrp > 0 ? Math.round((amount / mrp) * 100) : 0;
  return { amount, percentage };
}

/**
 * Canonical lowercase slug normalizer
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
