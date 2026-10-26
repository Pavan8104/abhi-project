/**
 * Verified Ayurvedic Knowledge Base for SARVA NATURAL Female Vaidya FAQ Chatbot
 * Grounded strictly in authentic project data for Moringa, Triphala, and Ashwagandha capsules,
 * along with verified shipping, quality, dosage, and return policies.
 */

export interface FaqItem {
  id: string;
  category: "moringa" | "triphala" | "ashwagandha" | "quality" | "dosage" | "shipping" | "orders" | "consultation" | "general";
  keywords: string[];
  patterns: RegExp[];
  question: string;
  answer: string;
  relatedProduct?: string;
  suggestedFollowUps?: string[];
}

export const VAIDYA_DISCLAIMER =
  "Namaste. Ayurvedic guidance provided by this assistant is for educational and wellness information based on classical principles. It does not constitute formal medical diagnosis, clinical prescription, or guarantee health outcomes. For personalized advice, please connect with our doctor team.";

export const SUGGESTED_QUICK_QUESTIONS = [
  "What are the benefits of Moringa Capsules?",
  "How and when should I take Triphala?",
  "Is Ashwagandha good for stress and sleep?",
  "Are your capsules 100% vegetarian?",
  "What are the shipping charges & delivery time?",
  "How can I book a free doctor consultation?",
];

export const VAIDYA_FAQ_DATA: FaqItem[] = [
  // --- MORINGA ---
  {
    id: "moringa-benefits",
    category: "moringa",
    keywords: ["moringa", "shigru", "benefit", "vitality", "immunity", "multivitamin", "nutrients", "energy"],
    patterns: [/moringa.*benefit/i, /what.*is.*moringa/i, /shigru/i, /why.*moringa/i, /moringa.*good for/i],
    question: "What are the key benefits of Sarva Natural Moringa Capsules?",
    answer:
      "Sarva Natural Moringa Capsules (Shigru) are Nature's botanical multivitamin. Formulated from 100% organic shade-dried Moringa oleifera leaf extract, each capsule contains 90+ bioactive nutrients, 46 antioxidants, and highly absorbable plant-based iron and calcium. It supports natural daily immunity (Ojas), combats physical lethargy without caffeine jitters, and balances Vata and Kapha doshas.",
    relatedProduct: "Sarva Natural Moringa Capsules",
    suggestedFollowUps: [
      "How should I take Moringa capsules?",
      "What are the ingredients in Moringa?",
      "Are Moringa capsules safe for daily use?",
    ],
  },
  {
    id: "moringa-dosage",
    category: "moringa",
    keywords: ["moringa", "dosage", "how to take moringa", "when to take moringa", "how to consume moringa"],
    patterns: [/how.*take.*moringa/i, /when.*take.*moringa/i, /moringa.*dosage/i, /moringa.*how to use/i],
    question: "How and when should I consume Moringa Capsules?",
    answer:
      "Take 1 to 2 capsules twice daily after meals with lukewarm water or fresh coconut water. We recommend taking the first dose after breakfast to support daytime vitality, and the second dose after lunch or early evening.",
    relatedProduct: "Sarva Natural Moringa Capsules",
    suggestedFollowUps: ["Are Moringa capsules vegetarian?", "What is the price of Moringa?"],
  },
  {
    id: "moringa-ingredients",
    category: "moringa",
    keywords: ["moringa", "ingredients", "leaf extract", "composition"],
    patterns: [/moringa.*ingredient/i, /what.*inside.*moringa/i, /moringa.*contain/i],
    question: "What are the ingredients in Moringa Capsules?",
    answer:
      "Our Moringa Capsules contain 100% Pure Standardized Organic Moringa Leaf Extract (Shigru Patra / Moringa oleifera) encapsulated in vegetarian HPMC shells. Zero synthetic fillers, zero animal gelatin, and zero chemical binders.",
    relatedProduct: "Sarva Natural Moringa Capsules",
  },

  // --- TRIPHALA ---
  {
    id: "triphala-benefits",
    category: "triphala",
    keywords: ["triphala", "digestion", "constipation", "colon", "detox", "gut", "bowel", "regularity"],
    patterns: [/triphala.*benefit/i, /what.*is.*triphala/i, /constipation/i, /digestion/i, /gut.*cleanse/i, /triphala.*good for/i],
    question: "What are the benefits of Sarva Natural Triphala Capsules?",
    answer:
      "Triphala is classical Ayurveda's celebrated tridoshic Rasayana. Our formulation combines equal ratios of Amalaki (Phyllanthus emblica), Haritaki (Terminalia chebula), and Bibhitaki (Terminalia bellirica). It supports smooth overnight colon cleansing, eliminates Ama (digestive toxins), regulates bowel motility, and fosters gut health without causing cramps or dependency.",
    relatedProduct: "Sarva Natural Triphala Capsules",
    suggestedFollowUps: [
      "When should I take Triphala capsules?",
      "Is Triphala habit-forming?",
      "What is the difference between Triphala churna and capsules?",
    ],
  },
  {
    id: "triphala-dosage",
    category: "triphala",
    keywords: ["triphala", "dosage", "when to take triphala", "bedtime", "night"],
    patterns: [/how.*take.*triphala/i, /when.*take.*triphala/i, /triphala.*dosage/i, /triphala.*at night/i],
    question: "How and when should I take Triphala Capsules?",
    answer:
      "Take 1 to 2 capsules once daily at bedtime with a glass of lukewarm water or warm milk. Bedtime administration allows the formulation to work gently overnight with your body's natural circadian digestive cleansing rhythm.",
    relatedProduct: "Sarva Natural Triphala Capsules",
  },
  {
    id: "triphala-habit",
    category: "triphala",
    keywords: ["triphala", "habit", "dependency", "laxative", "safe"],
    patterns: [/triphala.*habit/i, /triphala.*depend/i, /is.*triphala.*safe/i],
    question: "Is Triphala habit-forming like chemical laxatives?",
    answer:
      "No. Unlike synthetic chemical laxatives or senna-based purgatives that irritate the intestinal mucosa, classical Triphala is a nourishing bowel tonifier (Deepana and Pachana). It strengthens muscular peristalsis and mucosal integrity naturally, making it safe and non-habit forming.",
    relatedProduct: "Sarva Natural Triphala Capsules",
  },

  // --- ASHWAGANDHA ---
  {
    id: "ashwagandha-benefits",
    category: "ashwagandha",
    keywords: ["ashwagandha", "ashwa", "stress", "sleep", "anxiety", "cortisol", "insomnia", "stamina"],
    patterns: [/ashwa.*benefit/i, /stress/i, /sleep/i, /anxiety/i, /cortisol/i, /insomnia/i, /stamina/i, /withania/i],
    question: "What are the benefits of Sarva Natural Ashwagandha Capsules?",
    answer:
      "Sarva Natural Ashwagandha Capsules utilize standardized full-spectrum root extract (Withania somnifera) rich in natural Withanolides. Classified as a Medhya Rasayana (mind tonic) and Balya (strength builder), it reduces elevated cortisol, calms nervous tension, encourages deep restorative sleep cycles, and supports physical endurance without daytime drowsiness.",
    relatedProduct: "Sarva Natural Ashwagandha Capsules",
    suggestedFollowUps: [
      "How to take Ashwagandha for sleep?",
      "Does Ashwagandha cause daytime drowsiness?",
      "Can women take Ashwagandha?",
    ],
  },
  {
    id: "ashwagandha-dosage",
    category: "ashwagandha",
    keywords: ["ashwagandha", "dosage", "when to take ashwagandha", "how to consume ashwagandha"],
    patterns: [/how.*take.*ashwa/i, /when.*take.*ashwa/i, /ashwa.*dosage/i, /ashwa.*timing/i],
    question: "How and when should I take Ashwagandha Capsules?",
    answer:
      "Take 1 capsule twice daily after meals with lukewarm water or warm organic milk. If your primary goal is deep restorative sleep, take 1 to 2 capsules approximately 45 minutes before bedtime with warm milk and a pinch of nutmeg or cardamom.",
    relatedProduct: "Sarva Natural Ashwagandha Capsules",
  },
  {
    id: "ashwagandha-drowsiness",
    category: "ashwagandha",
    keywords: ["drowsy", "drowsiness", "daytime", "sleepy", "lethargic"],
    patterns: [/cause.*drows/i, /feel.*sleepy/i, /drowsiness/i],
    question: "Will Ashwagandha make me sleepy or drowsy during the day?",
    answer:
      "No. Authentic Ashwagandha is an adaptogen, not a sedative. It modulates the endocrine stress response (HPA axis) to ground nervous hyperactivity during the day while facilitating natural melatonin production at night for sound sleep.",
    relatedProduct: "Sarva Natural Ashwagandha Capsules",
  },

  // --- QUALITY & SAFETY ---
  {
    id: "veg-capsules",
    category: "quality",
    keywords: ["veg", "vegetarian", "gelatin", "capsule shell", "vegan", "hpmc"],
    patterns: [/is.*veg/i, /vegetarian/i, /gelatin/i, /capsule.*made of/i, /vegan/i],
    question: "Are SARVA NATURAL capsules 100% vegetarian?",
    answer:
      "Yes, 100%. All SARVA NATURAL capsules use vegetarian HPMC (Hydroxypropyl Methylcellulose) derived from natural plant cellulose. We strictly reject animal gelatin, pork/bovine byproducts, synthetic binders, artificial food coloring, and chemical preservatives.",
  },
  {
    id: "certifications-safety",
    category: "quality",
    keywords: ["gmp", "ayush", "license", "heavy metals", "lab tested", "certification", "pure", "quality"],
    patterns: [/gmp/i, /ayush/i, /heavy metal/i, /certified/i, /lab test/i, /safe/i, /quality/i],
    question: "How do you ensure product purity and government compliance?",
    answer:
      "Every batch is produced in a Schedule T GMP-certified manufacturing facility licensed under the Ministry of AYUSH, Government of India. Each production run undergoes ICP-MS laboratory testing to verify zero heavy metals (Lead, Mercury, Cadmium, Arsenic) and zero microbial contamination.",
  },

  // --- SHIPPING & ORDERS ---
  {
    id: "shipping-charges",
    category: "shipping",
    keywords: ["shipping", "delivery", "free delivery", "charges", "cost", "courier", "timeline", "how many days"],
    patterns: [/shipping.*charge/i, /free.*delivery/i, /delivery.*time/i, /how.*long.*delivery/i, /courier/i],
    question: "What are your shipping charges and delivery timelines?",
    answer:
      "• Shipping: FREE Express Delivery on all orders above ₹399. A nominal fee of ₹49 applies for orders below ₹399.\n• Dispatch: Dispatched within 24 business hours.\n• Delivery Timeline: 2 to 4 business days for major Indian metropolitan cities, and 3 to 5 business days for other regional pincodes.",
  },
  {
    id: "order-tracking",
    category: "orders",
    keywords: ["track", "tracking", "status", "where is my order", "consignment"],
    patterns: [/track.*order/i, /order.*status/i, /where.*order/i],
    question: "How do I track my order?",
    answer:
      "You can track your order anytime on our 'Track Consignment' page (/pages/order-tracking) using your Order Reference ID. You can also send your order reference to our WhatsApp care team at +91 93108 87011 for instant status updates.",
  },
  {
    id: "returns-refunds",
    category: "orders",
    keywords: ["return", "refund", "replace", "damaged", "cancellation"],
    patterns: [/return.*policy/i, /refund/i, /replace/i, /damaged/i],
    question: "What is your return and replacement policy?",
    answer:
      "We offer a 7-day hassle-free replacement or refund guarantee for any bottles that arrive damaged, compromised in transit, or unsealed. Simply write to care@sarvanatural.com or message our WhatsApp team at +91 93108 87011 with a photo of the package.",
  },

  // --- CONSULTATION ---
  {
    id: "doctor-consultation",
    category: "consultation",
    keywords: ["consult", "doctor", "vaidya", "appointment", "free call", "dr", "bams"],
    patterns: [/doctor/i, /consultation/i, /speak.*doctor/i, /book.*call/i, /vaidya/i],
    question: "How does the Free Vaidya Consultation work?",
    answer:
      "We provide complimentary 15-minute 1-on-1 consultations with certified BAMS & MD Ayurvedic doctors. Our practitioners review your Prakriti (Dosha constitution), digestive fire (Agni), and lifestyle to recommend personalized herb regimens. You can book via our Consultation page or reach out directly on WhatsApp at +91 93108 87011.",
  },

  // --- COMBINING FORMULATIONS ---
  {
    id: "combine-products",
    category: "dosage",
    keywords: ["combine", "together", "both", "all three", "take together", "can i take"],
    patterns: [/take.*together/i, /combine.*products/i, /moringa.*and.*triphala/i, /ashwagandha.*and.*triphala/i],
    question: "Can I take Moringa, Triphala, and Ashwagandha together?",
    answer:
      "Yes, absolutely. In classical Ayurveda, these three herbs address distinct constitutional pathways:\n• Morning / Afternoon: Take Moringa Capsules for vital daytime energy and antioxidant nourishment.\n• Post-Dinner / Night: Take Ashwagandha for nervous relaxation and restorative sleep.\n• Bedtime: Take Triphala with warm water for overnight colon cleansing.\nBecause their timing and mechanisms complement each other, they work synergistically without conflict.",
  },
];

/**
 * Searches the knowledge base using fuzzy keyword and regex matching.
 */
export function queryVaidyaKnowledgeBase(query: string): {
  matched: boolean;
  faq?: FaqItem;
  answer: string;
  canEscalate: boolean;
  relatedProduct?: string;
  suggestedFollowUps?: string[];
} {
  const cleanQuery = query.toLowerCase().trim();

  if (!cleanQuery) {
    return {
      matched: false,
      answer: "Namaste! Please ask a question about our classical formulations, dosage directions, certifications, or delivery.",
      canEscalate: false,
    };
  }

  // Check direct regex patterns first
  for (const item of VAIDYA_FAQ_DATA) {
    for (const pattern of item.patterns) {
      if (pattern.test(cleanQuery)) {
        return {
          matched: true,
          faq: item,
          answer: item.answer,
          canEscalate: true,
          relatedProduct: item.relatedProduct,
          suggestedFollowUps: item.suggestedFollowUps,
        };
      }
    }
  }

  // Check keyword matches with scoring
  let bestItem: FaqItem | null = null;
  let highestScore = 0;

  for (const item of VAIDYA_FAQ_DATA) {
    let score = 0;
    for (const kw of item.keywords) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  if (bestItem && highestScore >= 1) {
    return {
      matched: true,
      faq: bestItem,
      answer: bestItem.answer,
      canEscalate: true,
      relatedProduct: bestItem.relatedProduct,
      suggestedFollowUps: bestItem.suggestedFollowUps,
    };
  }

  // Graceful fallback when answer is not in verified project data
  return {
    matched: false,
    answer:
      "Namaste. I do not have verified clinical data on that specific query in my database. In accordance with Ayurvedic ethics, I cannot provide unverified health claims or diagnose conditions. Our certified Ayurvedic doctor team is available directly on WhatsApp to guide you personally.",
    canEscalate: true,
  };
}
