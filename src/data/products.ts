import { Product, HealthConcern } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-moringa",
    slug: "moringa",
    name: "Sarva Natural Moringa Capsules",
    sanskritName: "शिग्रु (Shigru)",
    subtitle: "Superfood & Daily Immunity — 60 Veg Capsules",
    category: "capsules",
    categoryLabel: "Herbal Wellness Capsules",
    formFactor: "Capsules",
    healthConcerns: ["immunity", "vitality", "daily-wellness"],
    concernLabels: ["Superfood & Daily Immunity", "Energy & Vitality", "Daily Wellness"],
    shortDescription:
      "Pure organic Moringa oleifera leaf extract in 100% vegetarian capsules. Nature's richest botanical multivitamin containing 90+ nutrients, 46 antioxidants, and essential plant amino acids.",
    fullDescription:
      "Sarva Natural Moringa Capsules are formulated from shade-dried, organically cultivated Moringa oleifera leaves (Shigru). Renowned across classical Ayurveda for its Deepana (metabolic igniting) and Rasayana (rejuvenating) attributes, Moringa delivers bioactive plant iron, calcium, Vitamin A, Vitamin C, and plant protein in highly bioavailable form. Free from synthetic binders, preservatives, and animal gelatin.",
    keyBenefits: [
      "Rich in plant-based bioavailable iron, calcium, and essential micronutrients",
      "Potent daily immune defense with 46 natural antioxidants and polyphenols",
      "Sustains natural vitality and combats physical lethargy without caffeine jitters",
      "Supports healthy metabolic rhythm and natural cellular detoxification",
    ],
    doshaImpact: {
      vata: "Balances",
      pitta: "Neutral",
      kapha: "Balances",
      description: "Pacifies Vata and Kapha doshas. Provides warming, energizing, and nourishing nutrition.",
    },
    ingredients: [
      {
        name: "Organic Moringa Leaf Extract (Shigru)",
        sanskritName: "शिग्रु पत्र (Shigru Patra)",
        botanicalName: "Moringa oleifera",
        percentage: "100%",
        purpose: "Pure standardized botanical extract packed with 90+ plant nutrients and bioflavonoids.",
      },
    ],
    howToConsume:
      "Take 1 to 2 capsules twice daily after meals with lukewarm water, or as directed by your healthcare professional.",
    anupana: "Lukewarm water or fresh coconut water",
    attributes: [
      "GMP Certified Facility",
      "100% Vegetarian Capsules",
      "Zero Heavy Metals (ICP-MS Tested)",
      "No Synthetic Binders or Fillers",
      "Organic Farm Direct",
    ],
    images: [
      "/images/products/moringa.jpeg",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    ],
    variants: [
      {
        id: "var-moringa-1",
        title: "1 Bottle (60 Capsules)",
        size: "60 Capsules",
        price: 499,
        mrp: 649,
        discountPercent: 23,
        unitPriceText: "₹8.32 / capsule",
        inStock: true,
        stockCount: 150,
      },
      {
        id: "var-moringa-2",
        title: "Pack of 2 (120 Capsules)",
        size: "120 Capsules",
        price: 899,
        mrp: 1298,
        discountPercent: 30,
        unitPriceText: "₹7.49 / capsule",
        inStock: true,
        stockCount: 85,
      },
      {
        id: "var-moringa-3",
        title: "Pack of 3 (180 Capsules)",
        size: "180 Capsules",
        price: 1249,
        mrp: 1947,
        discountPercent: 35,
        unitPriceText: "₹6.94 / capsule",
        inStock: true,
        stockCount: 40,
      },
    ],
    rating: 4.9,
    reviewCount: 142,
    isBestseller: true,
    isFeatured: true,
    isNew: false,
    inStock: true,
    shelfLife: "24 Months from manufacturing date",
    certifications: [
      "GMP Certified (Schedule T)",
      "AYUSH Licensed",
      "Heavy Metal Tested",
      "100% Vegetarian HPMC Capsules",
    ],
  },
  {
    id: "prod-triphala",
    slug: "triphala",
    name: "Sarva Natural Triphala Capsules",
    sanskritName: "त्रिफला रसायन (Triphala Rasayana)",
    subtitle: "Digestion & Colon Detox — 60 Veg Capsules",
    category: "capsules",
    categoryLabel: "Herbal Wellness Capsules",
    formFactor: "Capsules",
    healthConcerns: ["digestion", "daily-wellness"],
    concernLabels: ["Digestion & Gut Cleanse", "Gentle Overnight Detox", "Daily Wellness"],
    shortDescription:
      "Classical Ayurvedic synergy of Amalaki, Haritaki, and Bibhitaki in equal proportion. Supports gentle overnight colon detoxification, smooth digestive motility, and nutrient assimilation.",
    fullDescription:
      "Sarva Natural Triphala Capsules encapsulate the celebrated classical Rasayana of Indian medicine. Combining equal ratios of Amalaki (Phyllanthus emblica), Haritaki (Terminalia chebula), and Bibhitaki (Terminalia bellirica), this time-tested formulation provides gentle bowel regulation without cramping, dependency, or electrolyte loss. Cleanses Ama (digestive toxins) while tonifying the intestinal mucosal wall.",
    keyBenefits: [
      "Promotes regular, effortless morning bowel movements without habit formation",
      "Cleanses deep intestinal tract and eliminates accumulated digestive toxins (Ama)",
      "Kindles digestive fire (Jatharagni) and improves nutrient absorption efficiency",
      "Tridoshic Rasayana supporting natural metabolic balance and gut microbiome",
    ],
    doshaImpact: {
      vata: "Balances",
      pitta: "Balances",
      kapha: "Balances",
      description: "True Tridoshic Rasayana. Haritaki calms Vata, Amalaki pacifies Pitta, and Bibhitaki balances Kapha.",
    },
    ingredients: [
      {
        name: "Amalaki Fruit Pulp (Amla)",
        sanskritName: "आमलकी (Amalaki)",
        botanicalName: "Phyllanthus emblica",
        percentage: "33.3%",
        purpose: "Cools digestive fire, delivers natural vitamin C, and protects stomach mucosal lining.",
      },
      {
        name: "Haritaki Fruit Pulp (Harad)",
        sanskritName: "हरीतकी (Haritaki)",
        botanicalName: "Terminalia chebula",
        percentage: "33.3%",
        purpose: "Gentle peristaltic regulator celebrated as the King of Ayurvedic remedies.",
      },
      {
        name: "Bibhitaki Fruit Pulp (Baheda)",
        sanskritName: "बिभीतक (Bibhitaki)",
        botanicalName: "Terminalia bellirica",
        percentage: "33.3%",
        purpose: "Clears excess intestinal Kapha, mucous, and metabolic debris.",
      },
    ],
    howToConsume:
      "Take 1 to 2 capsules at bedtime with lukewarm water, or 30 minutes before sleep for gentle overnight digestive rejuvenation.",
    anupana: "Lukewarm water or warm milk",
    attributes: [
      "Classical Equal 1:1:1 Ratio",
      "Non-Habit Forming",
      "GMP Certified Facility",
      "100% Vegetarian Capsules",
      "Heavy Metal Tested",
    ],
    images: [
      "/images/products/triphala.jpeg",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    ],
    variants: [
      {
        id: "var-triphala-1",
        title: "1 Bottle (60 Capsules)",
        size: "60 Capsules",
        price: 449,
        mrp: 599,
        discountPercent: 25,
        unitPriceText: "₹7.48 / capsule",
        inStock: true,
        stockCount: 180,
      },
      {
        id: "var-triphala-2",
        title: "Pack of 2 (120 Capsules)",
        size: "120 Capsules",
        price: 799,
        mrp: 1198,
        discountPercent: 33,
        unitPriceText: "₹6.65 / capsule",
        inStock: true,
        stockCount: 95,
      },
      {
        id: "var-triphala-3",
        title: "Pack of 3 (180 Capsules)",
        size: "180 Capsules",
        price: 1099,
        mrp: 1797,
        discountPercent: 38,
        unitPriceText: "₹6.10 / capsule",
        inStock: true,
        stockCount: 50,
      },
    ],
    rating: 4.9,
    reviewCount: 189,
    isBestseller: true,
    isFeatured: true,
    isNew: false,
    inStock: true,
    shelfLife: "24 Months from manufacturing date",
    certifications: [
      "GMP Certified (Schedule T)",
      "AYUSH Licensed",
      "Heavy Metal Tested",
      "100% Vegetarian HPMC Capsules",
    ],
  },
  {
    id: "prod-ashwagandha",
    slug: "ashwagandha",
    name: "Sarva Natural Ashwagandha Capsules",
    sanskritName: "अश्वगंधा रसायन (Ashwagandha Rasayana)",
    subtitle: "Stress Relief, Deep Sleep & Vitality — 60 Veg Capsules",
    category: "capsules",
    categoryLabel: "Herbal Wellness Capsules",
    formFactor: "Capsules",
    healthConcerns: ["stress-sleep", "vitality", "immunity"],
    concernLabels: ["Stress & Cortisol Balance", "Vitality & Stamina", "Deep Restorative Sleep"],
    shortDescription:
      "Standardized high-potency Ashwagandha root extract rich in active Withanolides. Premier adaptogen for managing daily stress, soothing nervous exhaustion, and promoting deep restorative sleep.",
    fullDescription:
      "Sarva Natural Ashwagandha Capsules utilize purified full-spectrum root extract of Withania somnifera. Classical Ayurveda designates Ashwagandha as a Medhya Rasayana (mind rejuvenator) and Balya (stamina builder). It naturally modulates serum cortisol levels, nourishes the nervous system (Majja Dhatu), and restores depleted physical vigor without inducing daytime drowsiness.",
    keyBenefits: [
      "Naturally reduces elevated stress hormones and mitigates anxiety-induced exhaustion",
      "Encourages deep, uninterrupted sleep cycles and refreshes cognitive clarity upon waking",
      "Boosts physical endurance, muscle recovery, and overall mitochondrial vitality",
      "Strengthens neuroendocrine resilience and adrenal balance for sustained daily focus",
    ],
    doshaImpact: {
      vata: "Balances",
      pitta: "Neutral",
      kapha: "Balances",
      description: "Premier herb for stabilizing aggravated Vata dosha and grounding nervous system hyperactivity.",
    },
    ingredients: [
      {
        name: "Standardized Ashwagandha Root Extract (Withania somnifera)",
        sanskritName: "अश्वगंधा मूल (Ashwagandha Mula)",
        botanicalName: "Withania somnifera",
        percentage: "100%",
        purpose: "Full-spectrum root extract standardized to high Withanolides for peak adaptogenic efficacy.",
      },
    ],
    howToConsume:
      "Take 1 capsule twice daily with warm milk or lukewarm water after meals. For sleep optimization, take 1 to 2 capsules 45 minutes before bedtime.",
    anupana: "Warm organic milk with a pinch of nutmeg, or lukewarm water",
    attributes: [
      "High-Potency Withanolides",
      "Zero Daytime Drowsiness",
      "GMP Certified Facility",
      "100% Vegetarian Capsules",
      "Heavy Metal Tested",
    ],
    images: [
      "/images/products/ashwagandha.jpeg",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
    ],
    variants: [
      {
        id: "var-ashwa-1",
        title: "1 Bottle (60 Capsules)",
        size: "60 Capsules",
        price: 549,
        mrp: 699,
        discountPercent: 21,
        unitPriceText: "₹9.15 / capsule",
        inStock: true,
        stockCount: 160,
      },
      {
        id: "var-ashwa-2",
        title: "Pack of 2 (120 Capsules)",
        size: "120 Capsules",
        price: 999,
        mrp: 1398,
        discountPercent: 28,
        unitPriceText: "₹8.32 / capsule",
        inStock: true,
        stockCount: 110,
      },
      {
        id: "var-ashwa-3",
        title: "Pack of 3 (180 Capsules)",
        size: "180 Capsules",
        price: 1399,
        mrp: 2097,
        discountPercent: 33,
        unitPriceText: "₹7.77 / capsule",
        inStock: true,
        stockCount: 65,
      },
    ],
    rating: 4.95,
    reviewCount: 215,
    isBestseller: true,
    isFeatured: true,
    isNew: false,
    inStock: true,
    shelfLife: "24 Months from manufacturing date",
    certifications: [
      "GMP Certified (Schedule T)",
      "AYUSH Licensed",
      "Heavy Metal Tested",
      "100% Vegetarian HPMC Capsules",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all-products" || !category) return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByConcern(concernId: HealthConcern | string): Product[] {
  return PRODUCTS.filter((p) => (p.healthConcerns as string[]).includes(concernId));
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured);
}

export function getBestsellerProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isBestseller);
}

export function getRelatedProducts(currentProduct: Product, limit = 2): Product[] {
  return PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, limit);
}
