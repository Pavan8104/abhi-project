"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, ExternalLink } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS } from "@/data/products";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");
  const { addItem } = useCartStore();

  const mockOrders = [
    {
      id: "SARVA-847291",
      date: "October 24, 2026",
      total: 948,
      status: "In Transit",
      items: [
        { name: "Sarva Natural Moringa Capsules", variant: "1 Bottle (60 Capsules)", price: 499, qty: 1 },
        { name: "Sarva Natural Triphala Capsules", variant: "1 Bottle (60 Capsules)", price: 449, qty: 1 },
      ],
    },
    {
      id: "SARVA-731902",
      date: "September 12, 2026",
      total: 999,
      status: "Delivered",
      items: [
        { name: "Sarva Natural Ashwagandha Capsules", variant: "Pack of 2 (120 Capsules)", price: 999, qty: 1 },
      ],
    },
  ];

  return (
    <div className="bg-ayur-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-ayur-border shadow-soft mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-ayur-parchment border-2 border-ayur-gold/40 flex items-center justify-center text-ayur-primary font-serif text-xl font-bold">
              AV
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-ayur-accent tracking-wider block">
                Patron Member
              </span>
              <h1 className="font-serif text-2xl font-bold text-ayur-dark leading-tight">
                Aditya Verma
              </h1>
              <p className="text-xs text-stone-500 font-sans">
                aditya.verma@example.com &bull; +91 98765 43210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <Link
              href="/pages/order-tracking"
              className="w-full sm:w-auto px-4 py-2 bg-ayur-parchment/60 hover:bg-ayur-parchment text-ayur-dark rounded text-xs font-semibold border border-ayur-border text-center transition-colors"
            >
              Track Recent Order
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-ayur-border mb-6 gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-ayur-primary text-ayur-primary bg-white/50 rounded-t"
                : "border-transparent text-stone-500 hover:text-ayur-dark"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order History ({mockOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "addresses"
                ? "border-ayur-primary text-ayur-primary bg-white/50 rounded-t"
                : "border-transparent text-stone-500 hover:text-ayur-dark"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "profile"
                ? "border-ayur-primary text-ayur-primary bg-white/50 rounded-t"
                : "border-transparent text-stone-500 hover:text-ayur-dark"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Account Details</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 sm:p-6 rounded-xl border border-ayur-border shadow-soft space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-stone-100 gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-ayur-primary">
                      {order.id}
                    </span>
                    <span className="text-xs text-stone-400 ml-2">Placed on {order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <strong className="text-sm font-bold text-ayur-dark">₹{order.total}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-stone-700">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-stone-400 block text-[11px]">{item.variant}</span>
                      </div>
                      <span className="font-semibold text-ayur-dark">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    href={`/pages/order-tracking?id=${order.id}`}
                    className="text-ayur-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Track Package</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => {
                      const prod = PRODUCTS.find((p) => p.name.includes("Moringa")) || PRODUCTS[0];
                      addItem(prod, prod.variants[0], 1);
                    }}
                    className="px-3 py-1.5 bg-ayur-primary text-white rounded text-[11px] font-semibold hover:bg-ayur-secondary transition-colors"
                  >
                    Reorder Items
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-ayur-border shadow-soft relative">
              <span className="absolute top-4 right-4 px-2 py-0.5 bg-ayur-sageLight text-ayur-primary text-[10px] font-bold rounded">
                DEFAULT
              </span>
              <h4 className="font-serif font-bold text-base text-ayur-dark mb-1">Aditya Verma (Home)</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3">
                42, Shanti Niketan, Near Ayurvedic Botanical Garden<br />
                Malviya Nagar, Jaipur, Rajasthan — 302015<br />
                Phone: +91 98765 43210
              </p>
              <button className="text-xs text-ayur-primary font-semibold hover:underline">
                Edit Address
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-ayur-border shadow-soft max-w-lg space-y-4">
            <h3 className="font-serif text-xl font-bold text-ayur-dark mb-2">Personal Information</h3>
            <div className="text-xs space-y-3 font-sans">
              <div>
                <label className="text-stone-400 block mb-0.5">Full Name</label>
                <div className="p-2.5 bg-stone-50 rounded border border-stone-200 font-semibold text-ayur-dark">
                  Aditya Verma
                </div>
              </div>
              <div>
                <label className="text-stone-400 block mb-0.5">Email Address</label>
                <div className="p-2.5 bg-stone-50 rounded border border-stone-200 font-semibold text-ayur-dark">
                  aditya.verma@example.com
                </div>
              </div>
              <div>
                <label className="text-stone-400 block mb-0.5">Mobile Number</label>
                <div className="p-2.5 bg-stone-50 rounded border border-stone-200 font-semibold text-ayur-dark">
                  +91 98765 43210
                </div>
              </div>
              <div>
                <label className="text-stone-400 block mb-0.5">Ayurvedic Prakriti (Self-Assessment)</label>
                <div className="p-2.5 bg-ayur-sageSubtle rounded border border-ayur-sage/30 font-semibold text-ayur-primary">
                  Vata-Pitta Dominant
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
