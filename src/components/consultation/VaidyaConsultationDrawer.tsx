"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  Languages,
  User,
  CheckCircle2,
  AlertCircle,
  Award,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { buildConsultationInquiryWhatsAppUrl } from "@/lib/whatsapp";
import { useConsultationStore } from "@/store/useConsultationStore";
import { VAIDYA_PROFILES, CONSULTATION_TIME_SLOTS } from "@/data/vaidyas";
import { HEALTH_CONCERNS } from "@/data/categories";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export function VaidyaConsultationDrawer() {
  const { isOpen, closeConsultation, prefillConcern, prefillProduct } = useConsultationStore();

  const [step, setStep] = useState<"book" | "confirmed">("book");

  // Form states
  const [selectedConcern, setSelectedConcern] = useState<string>("digestion");
  const [selectedLanguage, setSelectedLanguage] = useState<"Hindi" | "English" | "Hinglish">("Hindi");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:00 AM - 10:15 AM");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  // Set default tomorrow date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Update prefill if provided
  useEffect(() => {
    if (prefillConcern) {
      setSelectedConcern(prefillConcern);
    }
    if (prefillProduct) {
      setNotes(`Inquiry regarding formulation: ${prefillProduct.name}`);
    }
  }, [prefillConcern, prefillProduct]);

  const assignedDoctor = VAIDYA_PROFILES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `VKY-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);
    setStep("confirmed");
  };

  const handleClose = () => {
    setStep("book");
    closeConsultation();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-lg bg-white border-l border-ayur-border shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-ayur-parchment flex items-center justify-center text-ayur-primary flex-shrink-0">
                <Sparkles className="w-4 h-4 text-ayur-gold" />
              </div>
              <div>
                <Dialog.Title className="font-serif text-base sm:text-lg font-bold text-ayur-dark leading-tight">
                  Book Vaidya Consultation
                </Dialog.Title>
                <span className="text-[10px] text-ayur-muted font-sans uppercase tracking-wider block">
                  Free 1-on-1 Ayurvedic Guidance (Demo)
                </span>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors"
                aria-label="Close consultation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Medical & Demo Disclaimer Bar */}
          <div className="px-4 sm:px-6 py-2.5 bg-amber-50/90 border-b border-amber-200/80 text-[11px] text-amber-950 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              Simulated demonstration. Does not collect protected health info or replace emergency medical diagnosis.
            </span>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
            {step === "book" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Doctor Highlight Card */}
                <div className="p-3.5 bg-ayur-parchment/60 rounded border border-ayur-sand/80 flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-ayur-primary/30 flex-shrink-0">
                    <ImageWithFallback
                      src={assignedDoctor.avatarUrl}
                      alt={assignedDoctor.name}
                      fill
                      className="object-cover"
                      fallbackTitle="Vaidya"
                    />
                  </div>
                  <div className="text-xs">
                    <h5 className="font-bold text-ayur-dark font-serif text-sm">
                      {assignedDoctor.name}
                    </h5>
                    <p className="text-[11px] text-ayur-primary font-medium">
                      {assignedDoctor.degrees} • {assignedDoctor.experienceYears} yrs experience
                    </p>
                    <p className="text-[10px] text-ayur-muted line-clamp-1 mt-0.5">
                      Speciality: {assignedDoctor.specialization}
                    </p>
                  </div>
                </div>

                {/* Prefilled Product Context Banner */}
                {prefillProduct && (
                  <div className="p-2.5 bg-ayur-sageSubtle rounded border border-ayur-sage/30 text-xs flex items-center gap-2 text-ayur-dark">
                    <Award className="w-4 h-4 text-ayur-primary flex-shrink-0" />
                    <span>
                      Inquiring about: <strong>{prefillProduct.name}</strong>
                    </span>
                  </div>
                )}

                {/* 1. Health Concern */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans mb-2">
                    1. Primary Health Concern
                  </label>
                  <select
                    value={selectedConcern}
                    onChange={(e) => setSelectedConcern(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary bg-white cursor-pointer"
                  >
                    {HEALTH_CONCERNS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.subtitle})
                      </option>
                    ))}
                    <option value="general-wellness">General Preventive Wellness & Ojas</option>
                  </select>
                </div>

                {/* 2. Language Preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans mb-2 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5" />
                    <span>2. Preferred Consultation Language</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Hindi", "English", "Hinglish"] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSelectedLanguage(lang)}
                        className={`py-2 text-xs rounded border text-center transition-all ${
                          selectedLanguage === lang
                            ? "bg-ayur-primary text-white border-ayur-primary font-semibold shadow-sm"
                            : "bg-white text-stone-700 border-stone-200 hover:border-ayur-sage"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Date & Slot */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>3. Select Date &amp; 15-Min Slot</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary bg-white mb-3"
                  />

                  <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 border border-stone-100 rounded">
                    {CONSULTATION_TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`py-1.5 px-2 text-[11px] rounded border text-left flex items-center justify-between transition-all ${
                          selectedSlot === slot.time
                            ? "bg-ayur-secondary text-white border-ayur-secondary font-medium"
                            : "bg-white text-stone-700 border-stone-200 hover:border-ayur-primary"
                        }`}
                      >
                        <span>{slot.time}</span>
                        <span className="text-[9px] opacity-80">{slot.period}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Contact Details */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ayur-primary font-sans mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>4. Your Contact Details</span>
                  </label>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp / Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Brief description of symptoms, diet or questions (optional)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-ayur-primary text-xs"
                    />
                  </div>
                </div>

                {/* Submit button & WhatsApp option */}
                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-ayur-primary text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-ayur-secondary transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-ayur-gold" />
                    <span>Confirm Free Demo Consultation</span>
                  </button>

                  <a
                    href={buildConsultationInquiryWhatsAppUrl({
                      patientName: fullName,
                      patientPhone: phone,
                      concern: HEALTH_CONCERNS.find((c) => c.id === selectedConcern)?.title || selectedConcern,
                      preferredDate: selectedDate,
                      preferredSlot: selectedSlot,
                      preferredLanguage: selectedLanguage,
                      notes: notes,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book / Inquire on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </form>
            ) : (
              /* Booking Confirmation View */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-ayur-dark mb-1">
                    Consultation Scheduled!
                  </h3>
                  <p className="text-xs text-ayur-muted">
                    Reference Code:{" "}
                    <strong className="text-ayur-dark font-mono text-sm">{bookingRef}</strong>
                  </p>
                </div>

                <div className="p-4 bg-ayur-parchment/60 rounded border border-ayur-sand/80 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 font-semibold text-ayur-dark">
                    <Clock className="w-4 h-4 text-ayur-primary" />
                    <span>Appointment Details</span>
                  </div>
                  <div className="text-stone-700 space-y-1">
                    <p>
                      <strong>Doctor:</strong> {assignedDoctor.name} ({assignedDoctor.degrees})
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedDate}
                    </p>
                    <p>
                      <strong>Slot:</strong> {selectedSlot} ({selectedLanguage})
                    </p>
                    <p>
                      <strong>Client:</strong> {fullName || "Aditya Verma"} • {phone || "+91 98765 43210"}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-ayur-sand text-[11px] text-stone-500 italic">
                    A simulated WhatsApp video link has been prepared for this 15-minute slot.
                  </div>
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <a
                    href={buildConsultationInquiryWhatsAppUrl({
                      patientName: fullName || "Aditya Verma",
                      patientPhone: phone || "+91 98765 43210",
                      concern: HEALTH_CONCERNS.find((c) => c.id === selectedConcern)?.title || selectedConcern,
                      preferredDate: selectedDate,
                      preferredSlot: selectedSlot,
                      preferredLanguage: selectedLanguage,
                      notes: `Booking Reference: ${bookingRef}`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Slot on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-2.5 bg-ayur-primary text-white text-xs font-semibold rounded hover:bg-ayur-secondary transition-colors"
                  >
                    Close &amp; Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
