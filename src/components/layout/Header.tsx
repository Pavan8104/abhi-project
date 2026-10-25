"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useConsultationStore } from "@/store/useConsultationStore";
import { useUIStore } from "@/store/useUIStore";
import { HEALTH_CONCERNS } from "@/data/categories";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [concernsDropdownOpen, setConcernsDropdownOpen] = useState(false);

  const { items, openCart, getSubtotal } = useCartStore();
  const { wishlistIds, openWishlist } = useWishlistStore();
  const { openConsultation } = useConsultationStore();
  const { openSearch } = useUIStore();

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = getSubtotal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled
          ? "bg-ayur-cream/95 backdrop-blur-md border-ayur-border shadow-soft"
          : "bg-ayur-cream border-ayur-border/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-22 lg:h-24 gap-4 lg:gap-8">
          {/* Left Block: Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-6 lg:gap-8 xl:gap-10 min-w-0">
            {/* Brand Logo - Shifted to the far left */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 group flex-shrink-0"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-ayur-parchment overflow-hidden flex items-center justify-center border-2 border-ayur-gold/40 shadow-sm flex-shrink-0 relative">
                <Image
                  src="/images/sarva-natural-emblem.png"
                  alt="SARVA NATURAL Emblem"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center text-left">
                <span className="font-serif text-lg sm:text-2xl lg:text-[27px] font-bold tracking-tight text-ayur-dark leading-none whitespace-nowrap">
                  SARVA NATURAL
                </span>
                <span className="font-sans text-[7px] sm:text-[9.5px] lg:text-[10.5px] tracking-[0.2em] sm:tracking-[0.24em] uppercase text-ayur-primary font-bold mt-0.5 sm:mt-1 whitespace-nowrap">
                  EARTH &bull; HEALTH &bull; WELLNESS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Same consistent gap */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                href="/collections/all-products"
                className={`text-sm font-medium transition-colors hover:text-ayur-primary ${
                  pathname.startsWith("/collections/all-products") || pathname === "/shop"
                    ? "text-ayur-primary border-b-2 border-ayur-primary pb-0.5"
                    : "text-ayur-dark/85"
                }`}
              >
                All Formulations
              </Link>

              {/* Health Concerns Mega / Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setConcernsDropdownOpen(true)}
                onMouseLeave={() => setConcernsDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-ayur-dark/85 hover:text-ayur-primary transition-colors py-2"
                  onClick={() => setConcernsDropdownOpen(!concernsDropdownOpen)}
                  aria-expanded={concernsDropdownOpen}
                >
                  <span>Shop by Concern</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {concernsDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-ayur-border shadow-elevated rounded-md p-3 grid gap-1.5 z-50 animate-in fade-in duration-150">
                    <div className="px-2 py-1 text-[11px] font-semibold text-ayur-muted uppercase tracking-wider border-b border-stone-100">
                      Ayurvedic Health Goals
                    </div>
                    {HEALTH_CONCERNS.map((c) => (
                      <Link
                        key={c.id}
                        href={`/collections/all-products?concern=${c.id}`}
                        onClick={() => setConcernsDropdownOpen(false)}
                        className="px-2.5 py-2 text-xs font-medium text-ayur-dark hover:bg-ayur-sageSubtle hover:text-ayur-primary rounded flex items-center justify-between transition-colors"
                      >
                        <span>{c.title}</span>
                        <span className="text-[10px] text-ayur-muted font-serif italic">
                          {c.subtitle}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-1 mt-1 border-t border-stone-100">
                      <Link
                        href="/collections/all-products"
                        onClick={() => setConcernsDropdownOpen(false)}
                        className="text-xs font-semibold text-ayur-primary hover:underline px-2 py-1 block"
                      >
                        View All 16 Formulations &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/collections/all-products?category=juices"
                className="text-sm font-medium text-ayur-dark/85 hover:text-ayur-primary transition-colors"
              >
                Pure Swarasa Juices
              </Link>

              <Link
                href="/collections/all-products?category=combos"
                className="text-sm font-medium text-ayur-dark/85 hover:text-ayur-primary transition-colors"
              >
                Value Combos
              </Link>

              <button
                onClick={() => openConsultation()}
                className="text-sm font-medium text-ayur-accent hover:text-ayur-clay flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vaidya Consultation</span>
              </button>
            </nav>
          </div>

          {/* Right Block: Header Action Utilities (Equal gap across all icons) */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
            {/* Desktop Search Trigger */}
            <button
              onClick={openSearch}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded bg-ayur-parchment/60 hover:bg-ayur-parchment text-ayur-muted hover:text-ayur-dark text-xs border border-ayur-border/80 transition-colors"
              aria-label="Search formulations"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search amla, triphala...</span>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-stone-200">
                /
              </kbd>
            </button>
            <button
              onClick={openSearch}
              className="flex xl:hidden p-2 text-ayur-dark hover:text-ayur-primary transition-colors rounded hover:bg-ayur-parchment/50"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="relative p-2 text-ayur-dark hover:text-ayur-primary transition-colors rounded hover:bg-ayur-parchment/50"
              aria-label={`Wishlist with ${wishlistIds.length} items`}
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-ayur-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 bg-ayur-primary text-white hover:bg-ayur-secondary transition-all rounded shadow-sm group"
              aria-label={`Cart with ${totalCartCount} items, total ₹${cartSubtotal}`}
            >
              <ShoppingBag className="w-5 h-5 text-ayur-gold group-hover:scale-105 transition-transform" />
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] uppercase tracking-wider text-ayur-sand/80 font-medium">
                  Bag
                </span>
                <span className="text-xs font-bold text-white">
                  ₹{cartSubtotal}
                </span>
              </div>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:relative sm:top-auto sm:right-auto w-4 h-4 sm:w-5 sm:h-5 bg-ayur-gold text-ayur-dark text-[10px] sm:text-[11px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger - Shifted to the right with matching equal gap */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ayur-dark hover:text-ayur-primary focus:outline-none rounded hover:bg-ayur-parchment/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-ayur-border px-4 py-6 shadow-card animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <Link
              href="/collections/all-products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-ayur-dark hover:text-ayur-primary py-2 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Explore All Formulations</span>
              <span className="text-xs text-ayur-primary font-semibold">16 Products &rarr;</span>
            </Link>

            <div className="py-2 border-b border-stone-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-ayur-muted block mb-2">
                Health Concerns
              </span>
              <div className="grid grid-cols-2 gap-2">
                {HEALTH_CONCERNS.map((c) => (
                  <Link
                    key={c.id}
                    href={`/collections/all-products?concern=${c.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-ayur-parchment/60 rounded text-xs font-medium text-ayur-dark hover:bg-ayur-sageLight"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/collections/all-products?category=juices"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-ayur-dark hover:text-ayur-primary py-2 border-b border-stone-100"
            >
              Pure Swarasa Juices
            </Link>

            <Link
              href="/collections/all-products?category=combos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-ayur-dark hover:text-ayur-primary py-2 border-b border-stone-100"
            >
              Value Combos
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-ayur-secondary text-white font-medium rounded text-sm mt-2"
            >
              <PhoneCall className="w-4 h-4 text-ayur-gold" />
              <span>Book Vaidya Consultation (Simulated)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
