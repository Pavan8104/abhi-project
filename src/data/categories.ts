import { FormFactor, HealthConcern } from "@/types/product";

export interface CategoryInfo {
  slug: string;
  name: string;
  sanskritName: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ConcernInfo {
  id: HealthConcern;
  slug: string;
  title: string;
  subtitle: string;
  sanskritName: string;
  iconName: string;
  colorAccent: string;
  image: string;
}

export const FORM_FACTORS: { label: FormFactor; slug: string }[] = [
  { label: "Capsules", slug: "capsules" },
];

export const COLLECTIONS = [
  {
    slug: "all-products",
    name: "All Formulations",
    sanskritName: "सर्व योग (Sarva Yoga)",
    description: "Explore our trio of pure, classical Ayurvedic formulations crafted from shade-dried botanicals.",
  },
  {
    slug: "bestsellers",
    name: "Bestselling Formulations",
    sanskritName: "श्रेष्ठ औषध (Shreshtha Aushadha)",
    description: "Our most trusted formulations: Pure Moringa, Classical Triphala, and High-Potency Ashwagandha.",
  },
  {
    slug: "herbal-wellness",
    name: "Herbal Wellness",
    sanskritName: "आयुर्बल (Ayurbala)",
    description: "Restorative herbal adaptogens designed to support neuroendocrine vitality and cellular immunity.",
  },
  {
    slug: "daily-wellness",
    name: "Daily Wellness",
    sanskritName: "नित्य स्वास्थ्य (Nitya Swasthya)",
    description: "Cornerstone daily formulations for effortless morning digestion and vital whole-food nutrition.",
  },
];

export const HEALTH_CONCERNS: ConcernInfo[] = [
  {
    id: "immunity",
    slug: "immunity",
    title: "Superfood & Immunity",
    subtitle: "Ojas Booster & 46 Antioxidants",
    sanskritName: "ओजस वर्धक (Ojas Vardhaka)",
    iconName: "ShieldCheck",
    colorAccent: "#184E3B",
    image: "/images/products/moringa.jpeg",
  },
  {
    id: "digestion",
    slug: "digestion",
    title: "Digestion & Colon Detox",
    subtitle: "Pachana, Ama Shodhana & Gut Motility",
    sanskritName: "अग्नि दीपन (Agni Deepana)",
    iconName: "Apple",
    colorAccent: "#0E382B",
    image: "/images/products/triphala.jpeg",
  },
  {
    id: "stress-sleep",
    slug: "stress-sleep",
    title: "Stress Relief & Deep Sleep",
    subtitle: "Cortisol Modulation & Medhya Rasayana",
    sanskritName: "मनः शान्ति (Manah Shanti)",
    iconName: "Sparkles",
    colorAccent: "#C59B4E",
    image: "/images/products/ashwagandha.jpeg",
  },
  {
    id: "vitality",
    slug: "vitality",
    title: "Energy & Stamina",
    subtitle: "Physical Endurance & Cellular Vitality",
    sanskritName: "बल्य रसायन (Balya Rasayana)",
    iconName: "Flame",
    colorAccent: "#B85A3C",
    image: "/images/products/ashwagandha.jpeg",
  },
  {
    id: "daily-wellness",
    slug: "daily-wellness",
    title: "Daily Wellness & Longevity",
    subtitle: "Holistic Tridoshic Equilibrium",
    sanskritName: "नित्य स्वास्थ्य (Nitya Swasthya)",
    iconName: "Leaf",
    colorAccent: "#2D724F",
    image: "/images/products/moringa.jpeg",
  },
];
