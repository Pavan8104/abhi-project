"use client";

import React, { useEffect, useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { DemoCheckoutModal } from "@/components/cart/DemoCheckoutModal";
import { VaidyaConsultationDrawer } from "@/components/consultation/VaidyaConsultationDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { ToastContainer } from "@/components/common/Toast";

export function StoreProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      {mounted && (
        <>
          <CartDrawer />
          <DemoCheckoutModal />
          <VaidyaConsultationDrawer />
          <WishlistDrawer />
          <SearchModal />
          <QuickViewModal />
          <ToastContainer />
        </>
      )}
    </>
  );
}
