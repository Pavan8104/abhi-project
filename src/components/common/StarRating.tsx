import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showDemoNotice?: boolean;
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  showDemoNotice = false,
}: StarRatingProps) {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}>
      <div className="flex items-center text-ayur-gold">
        {[1, 2, 3, 4, 5].map((index) => {
          const isFilled = index <= fullStars;
          const isHalf = !isFilled && index === fullStars + 1 && hasHalfStar;

          return (
            <Star
              key={index}
              className={`${iconSize} ${
                isFilled
                  ? "fill-ayur-gold text-ayur-gold"
                  : isHalf
                  ? "fill-ayur-gold/50 text-ayur-gold"
                  : "fill-stone-200 text-stone-300"
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs font-medium text-ayur-dark font-sans">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-ayur-muted font-sans">
          ({reviewCount}
          {showDemoNotice ? " demo reviews" : ""})
        </span>
      )}
    </div>
  );
}
