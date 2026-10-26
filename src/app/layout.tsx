import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProviders } from "@/components/layout/StoreProviders";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SARVA NATURAL | Earth • Health • Wellness — Classical Formulations",
  description:
    "SARVA NATURAL — Earth • Health • Wellness. Pure, authentic Ayurvedic capsules: Moringa, Triphala, and Ashwagandha crafted from sustainably harvested wild botanicals.",
  keywords: [
    "SARVA NATURAL",
    "Sarva Natural Ayurveda",
    "Earth Health Wellness",
    "Ayurveda",
    "Moringa Capsules",
    "Triphala Capsules",
    "Ashwagandha Capsules",
    "Organic Ayurvedic Herbs",
    "Pure Botanical Nutrition",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-ayur-cream text-ayur-dark antialiased min-h-screen flex flex-col selection:bg-ayur-sageLight selection:text-ayur-dark">
        <StoreProviders>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProviders>
      </body>
    </html>
  );
}
