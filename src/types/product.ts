export type FormFactor =
  | "Juices"
  | "Tablets"
  | "Churna/Powders"
  | "Resins"
  | "Herbal Oils"
  | "Combos";

export type HealthConcern =
  | "digestion"
  | "blood-sugar"
  | "liver-detox"
  | "immunity"
  | "hair-skin"
  | "joint-care"
  | "womens-wellness";

export interface ProductVariant {
  id: string;
  title: string;          // e.g. "500 ml", "1000 ml", "Pack of 2 (1000 ml x 2)"
  size: string;           // e.g. "500ml", "1000ml", "2000ml"
  price: number;          // e.g. 270
  mrp: number;            // e.g. 330
  discountPercent: number;// e.g. 18
  unitPriceText: string;  // e.g. "₹0.27 / ml"
  inStock: boolean;
  stockCount: number;
}

export interface IngredientItem {
  name: string;
  sanskritName?: string;
  botanicalName?: string;
  percentage?: string;
  purpose: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sanskritName: string;
  subtitle: string;
  category: "juices" | "tablets" | "powders" | "resins" | "oils" | "combos";
  categoryLabel: string;
  formFactor: FormFactor;
  healthConcerns: HealthConcern[];
  concernLabels: string[];
  shortDescription: string;
  fullDescription: string;
  keyBenefits: string[];
  doshaImpact: {
    vata: "Balances" | "Neutral" | "Reduces" | "May Increase";
    pitta: "Balances" | "Neutral" | "Reduces" | "May Increase";
    kapha: "Balances" | "Neutral" | "Reduces" | "May Increase";
    description: string;
  };
  ingredients: IngredientItem[];
  howToConsume: string;
  anupana: string;        // Recommended vehicle (lukewarm water, milk, honey, etc.)
  attributes: string[];   // e.g. ["GMP Certified", "Raw & Unpasteurized", "Cold Pressed", "No Added Sugar"]
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
  isFeatured: boolean;
  isNew: boolean;
  inStock: boolean;
  shelfLife: string;
  certifications: string[];
}

export type SortOption =
  | "featured"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "newest";

export interface FilterState {
  categories: string[];
  concerns: HealthConcern[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  searchQuery: string;
  sort: SortOption;
}
