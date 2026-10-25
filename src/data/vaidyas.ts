import { VaidyaProfile, VaidyaSlot } from "@/types/consultation";

export const VAIDYA_PROFILES: VaidyaProfile[] = [
  {
    name: "Dr. Acharya Rameshwar Joshi",
    degrees: "BAMS, MD (Ayurveda - Kayachikitsa, NIA Jaipur)",
    experienceYears: 18,
    specialization: "Metabolic Disorders, Gut & Chronic Pitta Imbalances",
    registrationNo: "AYUSH-RJ-48291",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Priyamvada Shastri",
    degrees: "BAMS, MS (Ayurveda - Prasuti & Stri Roga, BHU Varanasi)",
    experienceYears: 14,
    specialization: "Women's Hormonal Health, Skin Glow & Rasayana Rejuvenation",
    registrationNo: "AYUSH-UP-39104",
    avatarUrl: "https://images.unsplash.com/photo-1594824813524-1f9d501dbf6a?auto=format&fit=crop&w=400&q=80",
  },
];

export const CONSULTATION_TIME_SLOTS: VaidyaSlot[] = [
  { id: "slot-1", time: "10:00 AM - 10:15 AM", period: "Morning", isAvailable: true },
  { id: "slot-2", time: "10:30 AM - 10:45 AM", period: "Morning", isAvailable: true },
  { id: "slot-3", time: "11:15 AM - 11:30 AM", period: "Morning", isAvailable: true },
  { id: "slot-4", time: "02:00 PM - 02:15 PM", period: "Afternoon", isAvailable: true },
  { id: "slot-5", time: "03:00 PM - 03:15 PM", period: "Afternoon", isAvailable: true },
  { id: "slot-6", time: "04:30 PM - 04:45 PM", period: "Evening", isAvailable: true },
  { id: "slot-7", time: "05:15 PM - 05:30 PM", period: "Evening", isAvailable: true },
  { id: "slot-8", time: "06:00 PM - 06:15 PM", period: "Evening", isAvailable: true },
];
