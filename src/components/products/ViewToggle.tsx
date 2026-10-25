"use client";

import React from "react";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center rounded border border-ayur-border/90 bg-white p-0.5 shadow-sm">
      <button
        onClick={() => onViewChange("grid")}
        className={`p-1.5 rounded transition-colors ${
          viewMode === "grid"
            ? "bg-ayur-primary text-white"
            : "text-ayur-muted hover:text-ayur-dark"
        }`}
        aria-label="Grid view layout"
        aria-pressed={viewMode === "grid"}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`p-1.5 rounded transition-colors ${
          viewMode === "list"
            ? "bg-ayur-primary text-white"
            : "text-ayur-muted hover:text-ayur-dark"
        }`}
        aria-label="List view layout"
        aria-pressed={viewMode === "list"}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}
