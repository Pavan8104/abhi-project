"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Leaf, ShieldCheck, Award, Heart, Mail, Phone, MapPin } from "lucide-react";
import { HEALTH_CONCERNS, FORM_FACTORS } from "@/data/categories";

export function Footer() {
  return (
    <footer className="bg-ayur-dark text-ayur-cream border-t border-ayur-primary/30 mt-auto">
      {/* Upper Quality Badges strip */}
      <div className="border-b border-white/10 py-6 sm:py-8 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
            <div className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ayur-primary/60 border border-ayur-gold/30 flex items-center justify-center text-ayur-gold flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Wild-Harvested Herbs</h4>
                <p className="text-xs text-ayur-sand/70 mt-0.5">Sourced from Pratapgarh & Himalayan foothills</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ayur-primary/60 border border-ayur-gold/30 flex items-center justify-center text-ayur-gold flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">GMP Certified Unit</h4>
                <p className="text-xs text-ayur-sand/70 mt-0.5">Manufactured under strict AYUSH license</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ayur-primary/60 border border-ayur-gold/30 flex items-center justify-center text-ayur-gold flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Zero Synthetic Additives</h4>
                <p className="text-xs text-ayur-sand/70 mt-0.5">No artificial colors, added sugar or parabens</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ayur-primary/60 border border-ayur-gold/30 flex items-center justify-center text-ayur-gold flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Traditional Kwath Method</h4>
                <p className="text-xs text-ayur-sand/70 mt-0.5">16-hour slow copper simmering process</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ayur-primary/60 border-2 border-ayur-gold/40 overflow-hidden flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/sarva-natural-emblem.png"
                  alt="SARVA NATURAL"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white block">
                  SARVA NATURAL
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-ayur-gold font-bold">
                  EARTH &bull; HEALTH &bull; WELLNESS
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-ayur-sand/80 max-w-sm mb-6">
              Rooted in ancient classical texts of Charaka and Sushruta Samhitas. We produce unadulterated cold-pressed juices, classical kashayams, and medicated tailas with pure intent, wild-harvested botanicals, and zero synthetic dilution.
            </p>
            <div className="flex flex-col gap-2 text-xs text-ayur-sand/70 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-ayur-gold flex-shrink-0" />
                <span>Pratapgarh & Rajasthan Ayurvedic Manufacturing Facilities, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-ayur-gold flex-shrink-0" />
                <span>+91 (0) 1800-SARVA-NATURAL (Demo Helpline: 9 AM - 7 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-ayur-gold flex-shrink-0" />
                <span>care@sarvanatural.com</span>
              </div>
            </div>
          </div>

          {/* Health Goals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ayur-gold mb-4 font-sans">
              Health Concerns
            </h4>
            <ul className="space-y-2.5 text-xs text-ayur-sand/80">
              {HEALTH_CONCERNS.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/all-products?concern=${c.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/collections/all-products"
                  className="text-ayur-gold hover:underline inline-block mt-1"
                >
                  View All Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Form Factors */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ayur-gold mb-4 font-sans">
              Classical Forms
            </h4>
            <ul className="space-y-2.5 text-xs text-ayur-sand/80">
              {FORM_FACTORS.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/collections/all-products?category=${f.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vaidya & Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ayur-gold mb-4 font-sans">
              Consultation & Care
            </h4>
            <ul className="space-y-2.5 text-xs text-ayur-sand/80">
              <li>
                <Link href="/consultation" className="hover:text-white transition-colors">
                  Book Vaidya Consultation
                </Link>
              </li>
              <li>
                <Link href="/collections/all-products?category=combos" className="hover:text-white transition-colors">
                  Super Saver Bundles
                </Link>
              </li>
              <li>
                <span className="text-ayur-sand/50 cursor-not-allowed">
                  Dosha Prakriti Test (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-ayur-sand/50 cursor-not-allowed">
                  Track Demo Order
                </span>
              </li>
              <li>
                <span className="text-ayur-sand/50 cursor-not-allowed">
                  Quality & Lab Certificates
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Disclaimer & Legal */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="p-4 rounded bg-white/5 border border-white/10 text-[11px] text-ayur-sand/70 leading-relaxed space-y-2">
            <p>
              <strong className="text-ayur-gold font-semibold uppercase tracking-wider">
                Demonstration Prototype Notice:
              </strong>{" "}
              This website is an interactive high-fidelity frontend demonstration created to showcase a modern Ayurvedic e-commerce experience. No commercial transactions are completed, and no actual payment credentials are collected.
            </p>
            <p>
              <strong className="text-white font-medium">Ayurvedic Regulatory Disclaimer:</strong> Formulations presented are traditional Ayurvedic proprietary dietary supplements and botanical tonics formulated in accordance with classical Indian texts. They are not intended to diagnose, mitigate, prevent, treat or cure any medical condition. Always consult a certified Ayurvedic practitioner or healthcare provider before commencing any herbal regimen.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ayur-sand/60 gap-4">
            <p>&copy; {new Date().getFullYear()} SARVA NATURAL Demo Store. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Shipping & Return Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
