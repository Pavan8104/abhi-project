import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sarvanatural.com";

  const staticRoutes = [
    "",
    "/collections/all-products",
    "/collections/bestsellers",
    "/collections/herbal-wellness",
    "/collections/daily-wellness",
    "/pages/about-us",
    "/pages/our-story",
    "/pages/quality",
    "/pages/contact-us",
    "/pages/faqs",
    "/pages/order-tracking",
    "/pages/privacy-policy",
    "/pages/terms-of-service",
    "/pages/shipping-policy",
    "/pages/refund-policy",
    "/account",
    "/consultation",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/collections") ? 0.9 : 0.7,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  return [...staticRoutes, ...productRoutes];
}
