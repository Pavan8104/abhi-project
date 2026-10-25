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
  iconName: string; // Lucide icon identifier
  colorAccent: string;
  image: string;
}

export const FORM_FACTORS: { label: FormFactor; slug: string }[] = [
  { label: "Juices", slug: "juices" },
  { label: "Tablets", slug: "tablets" },
  { label: "Churna/Powders", slug: "powders" },
  { label: "Resins", slug: "resins" },
  { label: "Herbal Oils", slug: "oils" },
  { label: "Combos", slug: "combos" },
];

export const HEALTH_CONCERNS: ConcernInfo[] = [
  {
    id: "digestion",
    slug: "digestion",
    title: "Digestion & Gut Health",
    subtitle: "Pachana & Agni Deepana",
    sanskritName: "अग्नि दीपन (Agni Deepana)",
    iconName: "Apple",
    colorAccent: "#1B3B28",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "blood-sugar",
    slug: "blood-sugar",
    title: "Blood Sugar Support",
    subtitle: "Prameha & Glycemic Balance",
    sanskritName: "प्रमेह शामक (Prameha Shamaka)",
    iconName: "Activity",
    colorAccent: "#2E5E41",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "liver-detox",
    slug: "liver-detox",
    title: "Liver & Detox Cleanse",
    subtitle: "Yakrit Shodhana & Vitality",
    sanskritName: "यकृत शोधन (Yakrit Shodhana)",
    iconName: "Sparkles",
    colorAccent: "#3B6E4C",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "immunity",
    slug: "immunity",
    title: "Immunity & Rasayana",
    subtitle: "Ojas Booster & Longevity",
    sanskritName: "ओजस वर्धक (Ojas Vardhaka)",
    iconName: "ShieldCheck",
    colorAccent: "#9E4327",
    image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hair-skin",
    slug: "hair-skin",
    title: "Hair & Skin Radiance",
    subtitle: "Keshya & Kanti Vardhana",
    sanskritName: "कान्ति वर्धक (Kanti Vardhaka)",
    iconName: "Flower2",
    colorAccent: "#C05638",
    image: "https://images.unsplash.com/photo-1608248597359-5633346f3a74?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "joint-care",
    slug: "joint-care",
    title: "Joint & Muscle Relief",
    subtitle: "Sandhi Vata & Flexibility",
    sanskritName: "सन्धि वात शामक (Sandhi Shamaka)",
    iconName: "Flame",
    colorAccent: "#B88636",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "womens-wellness",
    slug: "womens-wellness",
    title: "Women's Wellness",
    subtitle: "Nari Kalyan & Balance",
    sanskritName: "नारी कल्याण (Nari Kalyana)",
    iconName: "HeartHandshake",
    colorAccent: "#7C9082",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  },
];
