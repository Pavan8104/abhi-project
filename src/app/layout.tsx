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
  title: "Krishna's Herbal & Ayurveda | Authentic Classical Formulations",
  description:
    "Experience pure, authentic Ayurvedic juices, classical kwaths, cold-pressed tailas, and herbal formulations crafted from wild-harvested botanicals.",
  keywords: [
    "Ayurveda",
    "Amla Juice",
    "Triphala",
    "Aloe Vera Juice",
    "Diabic Care",
    "Shilajit",
    "Kumkumadi Tailam",
    "Ayurvedic Doctor Consultation",
  ],
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
