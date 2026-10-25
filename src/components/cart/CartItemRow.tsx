"use client";

import React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface CartItemRowProps {
  item: CartItem;
  onItemClick?: () => void;
}

export function CartItemRow({ item, onItemClick }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-stone-100 items-start">
      {/* Thumbnail */}
      <Link
        href={`/products/${item.product.slug}`}
        onClick={onItemClick}
        className="relative w-20 h-20 rounded bg-ayur-parchment/40 overflow-hidden flex-shrink-0 border border-stone-200"
      >
        <ImageWithFallback
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
          fallbackTitle={item.product.name}
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.product.slug}`}
          onClick={onItemClick}
          className="block hover:text-ayur-primary"
        >
          <h4 className="text-xs font-bold text-ayur-dark font-serif line-clamp-1">
            {item.product.name}
          </h4>
        </Link>
        <div className="text-[11px] text-ayur-muted font-sans mt-0.5">
          <span>{item.variant.title}</span>
          <span className="mx-1.5">•</span>
          <span className="text-ayur-dark font-medium">{formatINR(item.variant.price)} each</span>
        </div>

        {/* Stepper & Line Total */}
        <div className="flex items-center justify-between mt-3">
          <div className="inline-flex items-center border border-stone-200 rounded bg-white">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-0.5 text-xs text-stone-600 hover:text-ayur-dark hover:bg-stone-100"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-2.5 py-0.5 text-xs font-semibold text-ayur-dark font-mono">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-0.5 text-xs text-stone-600 hover:text-ayur-dark hover:bg-stone-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-ayur-dark font-sans">
              {formatINR(item.variant.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-stone-400 hover:text-red-600 transition-colors p-1"
              aria-label={`Remove ${item.product.name} from bag`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
