import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SARVA NATURAL",
  description: "Privacy policy and personal data protection principles of SARVA NATURAL.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ayur-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-ayur-primary font-sans block mb-1">
            Legal &amp; Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-dark">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500 mt-2 font-mono">Last Updated: October 2026</p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-xl border border-ayur-border shadow-soft space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          <h2 className="font-serif text-xl font-bold text-ayur-dark">1. Commitment to Personal Privacy</h2>
          <p>
            At SARVA NATURAL, we treat your personal and health information with the utmost confidentiality. This policy outlines how we collect, utilize, and protect your information when you browse our storefront, consult our Vaidyas, or purchase our classical formulations.
          </p>

          <h2 className="font-serif text-xl font-bold text-ayur-dark">2. Information We Collect</h2>
          <p>
            When you interact with our website, we may collect the following information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Contact details:</strong> Name, phone number, shipping address, and email address.</li>
            <li><strong>Order information:</strong> Products selected, variant quantities, and delivery instructions.</li>
            <li><strong>Consultation context:</strong> General health concerns (e.g., digestion, stress, sleep) shared voluntarily for guidance.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-ayur-dark">3. Usage of Information</h2>
          <p>
            Your information is used strictly to process orders, arrange courier delivery with our express partners, communicate transit updates, and provide customer support. We never sell, rent, or trade customer data to third-party marketing brokers.
          </p>

          <h2 className="font-serif text-xl font-bold text-ayur-dark">4. Payment Security</h2>
          <p>
            All electronic payment transactions are encrypted and processed through certified RBI-compliant payment gateways. SARVA NATURAL never stores credit card CVVs or bank credentials on our local servers.
          </p>

          <h2 className="font-serif text-xl font-bold text-ayur-dark">5. Contact Our Privacy Officer</h2>
          <p>
            If you have questions regarding your data or wish to exercise your right to erasure, please contact us at <a href="mailto:care@sarvanatural.com" className="text-ayur-primary underline font-semibold">care@sarvanatural.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
