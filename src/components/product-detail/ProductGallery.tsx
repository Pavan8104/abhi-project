"use client";

import React, { useState } from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Badge } from "@/components/common/Badge";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isBestseller?: boolean;
}

export function ProductGallery({
  images,
  productName,
  isBestseller,
}: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] flex-shrink-0 pb-1 sm:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                selectedIdx === idx
                  ? "border-ayur-primary shadow-sm scale-102"
                  : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image thumbnail ${idx + 1}`}
            >
              <ImageWithFallback
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-1"
                fallbackTitle={productName}
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Stage */}
      <div className="relative aspect-square flex-1 rounded-lg overflow-hidden bg-white border border-ayur-border/80 shadow-soft">
        <ImageWithFallback
          src={images[selectedIdx] || images[0]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
          className="object-contain p-4 sm:p-6 transition-all duration-300"
          fallbackTitle={productName}
        />

        {isBestseller && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="bestseller">Classical Bestseller</Badge>
          </div>
        )}
      </div>
    </div>
  );
}
