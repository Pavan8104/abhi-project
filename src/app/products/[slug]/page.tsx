import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { ProductGallery } from "@/components/product-detail/ProductGallery";
import { ProductInfo } from "@/components/product-detail/ProductInfo";
import { ProductDetailsAccordion } from "@/components/product-detail/ProductDetailsAccordion";
import { RelatedProducts } from "@/components/product-detail/RelatedProducts";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found | SARVA NATURAL",
    };
  }

  return {
    title: `${product.name} (${product.sanskritName}) | SARVA NATURAL`,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-ayur-cream min-h-screen py-6 sm:py-12 border-b border-ayur-border/60">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.shortDescription,
            brand: {
              "@type": "Brand",
              name: "SARVA NATURAL",
            },
            offers: {
              "@type": "Offer",
              url: `https://sarvanatural.com/products/${product.slug}`,
              priceCurrency: "INR",
              price: product.variants[0].price,
              priceValidUntil: "2027-12-31",
              itemCondition: "https://schema.org/NewCondition",
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 sm:gap-2 text-xs text-ayur-muted font-sans mb-4 sm:mb-8 truncate"
        >
          <Link href="/" className="hover:text-ayur-primary transition-colors flex-shrink-0">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/collections/all-products?category=${product.category}`}
            className="hover:text-ayur-primary transition-colors flex-shrink-0"
          >
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-ayur-primary font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Back Link on Mobile */}
        <div className="mb-4 sm:hidden">
          <Link
            href="/collections/all-products"
            className="inline-flex items-center gap-1.5 text-xs text-ayur-primary font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Products</span>
          </Link>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <ProductGallery
              images={product.images}
              productName={product.name}
              isBestseller={product.isBestseller}
            />
          </div>

          {/* Product Purchasing Info Column */}
          <div className="lg:col-span-6">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Classical Formulation Accordion (Ingredients, Dosage, Lab Certs) */}
        <ProductDetailsAccordion product={product} />

        {/* Related / Frequently Paired Formulations */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
}
