"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  className,
  ...rest
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-ayur-parchment to-ayur-sand/40 p-4 text-center select-none ${
          className || ""
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-ayur-primary/10 overflow-hidden flex items-center justify-center mb-2 border border-ayur-gold/30 shadow-sm relative">
          <Image
            src="/images/sarva-natural-emblem.png"
            alt="SARVA NATURAL"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs font-serif italic text-ayur-primary font-medium tracking-wide">
          SARVA NATURAL
        </span>
        {fallbackTitle && (
          <span className="text-[11px] text-ayur-muted line-clamp-1 mt-0.5">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Ayurvedic formulation"}
      className={className}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
