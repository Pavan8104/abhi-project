import React, { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const formattedTitle =
    params.slug === "all-products"
      ? "All Classical Ayurvedic Formulations"
      : params.slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

  return {
    title: `${formattedTitle} | SARVA NATURAL`,
    description: `Browse authentic classical Ayurvedic ${formattedTitle.toLowerCase()} handcrafted from wild herbs by SARVA NATURAL.`,
  };
}

export default function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-ayur-muted">
          Loading Ayurvedic formulations...
        </div>
      }
    >
      <CatalogView initialSlug={params.slug} />
    </Suspense>
  );
}
