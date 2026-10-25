import { HealthConcern } from "./product";

export interface VaidyaSlot {
  id: string;
  time: string; // e.g. "10:00 AM", "10:15 AM", "04:30 PM"
  period: "Morning" | "Afternoon" | "Evening";
  isAvailable: boolean;
}

export interface ConsultationBooking {
  concern: HealthConcern | "general-wellness";
  concernLabel: string;
  language: "Hindi" | "English" | "Hinglish";
  date: string; // YYYY-MM-DD
  timeSlot: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes?: string;
  referencedProductName?: string;
  referencedProductSlug?: string;
}

export interface VaidyaProfile {
  name: string;
  degrees: string;
  experienceYears: number;
  specialization: string;
  registrationNo: string;
  avatarUrl: string;
}
