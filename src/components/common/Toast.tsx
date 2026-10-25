"use client";

import React from "react";
import { useUIStore } from "@/store/useUIStore";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toast, hideToast } = useUIStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-ayur-primary flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-700 flex-shrink-0" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div
        className={cn(
          "flex items-center gap-3 p-3.5 bg-white border border-ayur-border shadow-elevated rounded-md text-sm text-ayur-dark",
          toast.type === "success" && "border-l-4 border-l-emerald-600",
          toast.type === "info" && "border-l-4 border-l-ayur-primary",
          toast.type === "error" && "border-l-4 border-l-red-600"
        )}
      >
        {icons[toast.type]}
        <div className="flex-1 font-sans text-xs leading-relaxed font-medium">
          {toast.message}
        </div>
        <button
          onClick={hideToast}
          className="text-ayur-muted hover:text-ayur-dark p-1 rounded transition-colors"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
