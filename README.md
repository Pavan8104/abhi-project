# Krishna's Herbal & Ayurveda — Premium Storefront Demo

A high-conversion, bespoke Ayurvedic e-commerce storefront frontend demo inspired by [Krishna's Herbal & Ayurveda](https://krishnaayurved.com/collections/all-products). Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Radix UI primitives, and Zustand.

Designed specifically for client presentations, this prototype demonstrates a luxury Vedic apothecary shopping experience without requiring any backend or database setup.

---

## 🌿 Key Features & Implemented Interactions

### 1. Brand Identity & Design System
- **Classical Ayurvedic Color Palette**: Warm ivory (`#FAF7F2`), deep botanical green (`#183B28`), muted sage (`#79927A`), and restrained terracotta clay (`#B85A3C`).
- **Editorial Typography**: Cormorant Garamond serif headings paired with Plus Jakarta Sans body typography.
- **Botanical Imagery & Fallback Protection**: Resilient `ImageWithFallback` component that gracefully renders an elegant leaf emblem if any remote image is unavailable.
- **Zero AI-Slop**: Avoids generic templates, bubble pill cards, or emojis; features authentic Sanskrit terminology (*Swarasa*, *Kashayam*, *Kwath*, *Tridosha*, *Anupana*).

### 2. Complete Storefront Architecture
- **Announcement Bar**: Free express shipping progress towards ₹399 and coupon highlight (`AYURVEDA10`).
- **Header**: Responsive branding, instant live search trigger, category mega-dropdown, wishlist badge counter, cart preview badge, and quick consultation CTA.
- **Editorial Hero Section**: Evocative classical Sanskrit quote from the *Charaka Samhita*, primary shop CTA, and AYUSH / GMP trust badges.
- **Shop-by-Concern Tiles**: Visual navigation for 7 primary health concerns (Digestion, Blood Sugar, Liver Detox, Immunity, Hair & Skin, Joint Care, Women's Wellness).
- **Interactive Bestseller Showcase**: Tabbed bestsellers with instant Quick Add and savings calculations.
- **Manufacturing & Quality Trust Section**: Detailed breakdown of the 16-Hour Slow Kashayam method, cold-pressed extraction, ICP-MS heavy metal screening, and Surya Tapi solar purification.
- **Vaidya Consultation Promotion**: Dedicated banner connecting users to Ayurvedic doctors.
- **Honest Testimonials**: Verified customer feedback cards clearly marked as demo presentation content.
- **Interactive Newsletter**: Instant coupon generation and clipboard copy feedback.
- **Compliance Footer**: Complete site directory, substantiated classical disclaimers, and demo safety notices.

### 3. Product Catalog & Off-Canvas Radix Filter Drawer
- **16 Authentic Formulations**: Raw Wild Amla Juice, Pure Aloe Vera, Classical Triphala, Diabic Care, Bhringraj Hair Oil, Kumkumadi Tailam, Shuddha Shilajit Resin, Ashwagandha Ghan Vati, etc.
- **Radix Dialog Filter Drawer**:
  - Form Factors: Juices, Tablets, Churna/Powders, Resins, Herbal Oils, Combos.
  - Health Concerns: Multi-concern filters.
  - Dual-Thumb Price Slider: Smooth range filtering from ₹199 to ₹2,200 via Radix Slider.
  - Attributes: Filter by "GMP Certified", "Raw & Unpasteurized", "Cold Pressed", etc.
  - In-Stock Availability Toggle.
  - Canonical lowercase slugs to prevent duplicate categories.
- **URL Synchronization**: Real-time URL query parameter sync (`?category=...&concern=...&sort=...&minPrice=...`) using non-blocking `useTransition`.
- **View Toggle**: Grid view and List view switcher.
- **Sorting Options**: Featured & Bestsellers, Price: Low to High, Price: High to Low, Customer Rating, and Newest Arrivals.
- **Zero Cumulative Layout Shift (CLS)**: Skeletons preserve exact card proportions.

### 4. Interactive Slide-Over Cart & Simulated Checkout
- **Zustand + LocalStorage Persistence**: Cart state persists across refreshes.
- **Dynamic Free Delivery Progress Bar**: Live indicator tracking remaining amount to reach ₹399.
- **Promotional Coupons**: Supports `AYURVEDA10` (10% off) and `VEDA15` (15% off).
- **Complementary Herb Cross-Sells**: Intelligent 1-click add-ons for unselected items.
- **Demo Checkout Modal**:
  - Clear simulation safety disclaimer banner.
  - Prefilled Indian address fields (Jaipur, Rajasthan demo context).
  - Simulated payment options: UPI (GPay/PhonePe), Cash on Delivery (COD), Cards/NetBanking.
  - Instant simulated order confirmation with reference code and fulfillment timeline.

### 5. Vaidya Doctor Consultation Modal
- **Personalized Intake Flow**: Select health concern, language (Hindi, English, Hinglish), date, and 15-minute slot.
- **Contextual Prefill**: When launched from a product page, automatically includes the product inquiry context.
- **Doctor Credentials**: Showcases BAMS/MD practitioners with AYUSH registration numbers.
- **Booking Confirmation**: Generates a simulated consultation code and appointment card.

### 6. Dynamic Product Detail Pages (`/products/[slug]`)
- **Interactive Multi-Image Gallery**: Image thumbnails with active preview.
- **Variant Selector**: 500ml, 1000ml, twin packs, and dropper sizes with automatic per-unit price calculations (e.g., ₹0.35/ml).
- **Comprehensive Accordions**:
  - Detailed benefits & Tridosha analysis (Vata, Pitta, Kapha balancing).
  - Classical composition table with botanical names, proportions, and therapeutic roles.
  - Usage instructions & recommended Anupana vehicles (lukewarm water, honey, milk).
  - Manufacturing, AYUSH license, and heavy-metal lab testing verification.
- **Interactive "Ask our Vaidya" Interaction**: Prefills doctor consultation with product context.
- **Frequently Paired Formulations**: Recommends complementary products.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14+ (App Router)** | Framework, SSR/SSG, Metadata, font optimization |
| **TypeScript** | Strict type definitions for products, cart, and consultation |
| **Tailwind CSS** | Custom Ayurvedic design tokens, typography, and layout |
| **Radix UI** | Accessible primitives for Dialog, Slider, DropdownMenu, Tabs |
| **Zustand** | Cart, Wishlist, Consultation, and UI state with `persist` |
| **Lucide Icons** | Clean botanical and e-commerce iconography |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the active port shown in terminal).

### 3. Production Build & Verification
```bash
npm run build
npm run start
```
Run `npm run lint` to verify that there are zero ESLint warnings or errors.

---

## 📋 Note on Demo Scope & Medical Disclaimers
This project is an interactive frontend demonstration for client presentations. It does not integrate live payment gateways (Razorpay/Stripe) or databases, ensuring safe and zero-risk stakeholder demonstrations. All health claims and testimonials are curated for demonstration purposes in accordance with AYUSH dietary supplement guidelines.
