export interface Testimonial {
  id: string;
  author: string;
  city: string;
  rating: number;
  verifiedBuyer: boolean;
  productName: string;
  productSlug: string;
  quote: string;
  fullReview: string;
  duration: string;
  isDemoLabel: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Meenakshi Sundaram",
    city: "Bengaluru",
    rating: 5,
    verifiedBuyer: true,
    productName: "Raw Wild Amla Juice",
    productSlug: "raw-wild-amla-juice",
    quote: "Remarkable difference in my morning digestion and skin glow within 3 weeks.",
    fullReview:
      "Unlike supermarket amla juices that taste like diluted preservative syrup, this has the authentic astringent kick of real wild amlas. I take 30ml with warm water every morning without fail.",
    duration: "Using for 4 months",
    isDemoLabel: true,
  },
  {
    id: "test-2",
    author: "Rajiv K. Singhania",
    city: "Jaipur",
    rating: 5,
    verifiedBuyer: true,
    productName: "Diabic Care Ayurvedic Juice",
    productSlug: "diabic-care-juice-herbal-blend",
    quote: "Helped stabilize my post-lunch sluggishness and cravings for sweets.",
    fullReview:
      "Recommended by our family Ayurvedic practitioner. The bitter herbs like Gudmar and Karela do take 2 days to get used to, but the metabolic results speak for themselves. Solid, honest formulation.",
    duration: "Using for 6 months",
    isDemoLabel: true,
  },
  {
    id: "test-3",
    author: "Dr. Ananya Mukherjee",
    city: "Kolkata",
    rating: 5,
    verifiedBuyer: true,
    productName: "Classical Triphala Swarasa",
    productSlug: "classical-triphala-swarasa",
    quote: "Gentle natural regulation without any harsh cramping or dependency.",
    fullReview:
      "As a physician, I look for non-habit forming solutions for gastrointestinal motility. This classical swarasa decoction supports natural peristalsis gently. Completely pure, zero synthetic additives.",
    duration: "Using for 3 months",
    isDemoLabel: true,
  },
  {
    id: "test-4",
    author: "Pooja Deshmukh",
    city: "Pune",
    rating: 5,
    verifiedBuyer: true,
    productName: "Kumkumadi Tailam Miraculous Beauty Serum",
    productSlug: "kumkumadi-tailam-miraculous-beauty-serum",
    quote: "Pure Kashmiri saffron aroma and deep nourishment without clogging pores.",
    fullReview:
      "Just 3 drops at night on damp skin. My post-acne blemishes and dullness faded visibly. It feels like an authentic ancient recipe, not a cheap cosmetic synthetic oil.",
    duration: "Using for 2 months",
    isDemoLabel: true,
  },
];
