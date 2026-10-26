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
    id: "test-moringa",
    author: "Meenakshi Sundaram",
    city: "Bengaluru",
    rating: 5,
    verifiedBuyer: true,
    productName: "Sarva Natural Moringa Capsules",
    productSlug: "moringa",
    quote: "Noticeable increase in daily stamina and energy within two weeks.",
    fullReview:
      "I was looking for a clean, whole-food plant multivitamin without artificial fillers. These organic Moringa capsules give a steady, calm vitality through the afternoon without any caffeine crash. 100% vegetarian capsules are a big plus.",
    duration: "Verified Buyer • Using for 3 months",
    isDemoLabel: false,
  },
  {
    id: "test-triphala",
    author: "Dr. Ananya Mukherjee",
    city: "Kolkata",
    rating: 5,
    verifiedBuyer: true,
    productName: "Sarva Natural Triphala Capsules",
    productSlug: "triphala",
    quote: "Gentle natural regulation without any harsh cramping or dependency.",
    fullReview:
      "As a physician, I look for non-habit-forming solutions for healthy digestive motility. This classical equal-ratio Triphala supports morning regularity comfortably. Completely pure, zero synthetic additives.",
    duration: "Verified Buyer • Using for 4 months",
    isDemoLabel: false,
  },
  {
    id: "test-ashwagandha",
    author: "Rajiv K. Singhania",
    city: "Jaipur",
    rating: 5,
    verifiedBuyer: true,
    productName: "Sarva Natural Ashwagandha Capsules",
    productSlug: "ashwagandha",
    quote: "Deep, unbroken sleep and significantly reduced evening stress.",
    fullReview:
      "I take one capsule after dinner with warm milk. The quality of sleep is noticeably deeper, and I wake up clear-headed rather than sluggish. You can tell this is pure root extract with active withanolides.",
    duration: "Verified Buyer • Using for 5 months",
    isDemoLabel: false,
  },
];
