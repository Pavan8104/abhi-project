"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles, Copy, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("SARVA10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-ayur-parchment/60 border-b border-ayur-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-full bg-ayur-primary/10 border border-ayur-primary/20 flex items-center justify-center text-ayur-primary mx-auto mb-4">
          <Mail className="w-5 h-5" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-ayur-primary font-sans block mb-1">
          Vedic Wisdom In Your Inbox
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-dark mb-3">
          Subscribe for Seasonal Ritucharya Guides &amp; ₹100 Off
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mb-8 font-sans leading-relaxed">
          Receive seasonal Ayurvedic lifestyle tips, diet calendars, classical recipes, and an instant discount code on your inaugural order.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-white rounded-lg border border-emerald-300 shadow-card max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-ayur-dark mb-1">
              Namaste! You&apos;re Subscribed
            </h4>
            <p className="text-xs text-stone-600 mb-4">
              Here is your simulated welcome coupon. Use it at checkout for 10% off:
            </p>
            <div className="flex items-center justify-between p-2.5 bg-ayur-sageSubtle rounded border border-ayur-sage/40">
              <span className="font-mono font-bold text-sm text-ayur-primary tracking-wider">
                SARVA10
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs font-semibold text-ayur-primary hover:text-ayur-dark flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded text-xs border border-stone-300 focus:outline-none focus:ring-1 focus:ring-ayur-primary bg-white shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-ayur-primary text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-ayur-secondary transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
              <span>Unlock ₹100 Off</span>
            </button>
          </form>
        )}

        <span className="text-[11px] text-stone-400 block mt-3">
          Zero spam. Unsubscribe at any time with a single click.
        </span>
      </div>
    </section>
  );
}
