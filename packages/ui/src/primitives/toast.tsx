"use client";

import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../utils";

/* ── Types ─────────────────────────────────────── */
export type ToastVariant = "default" | "destructive" | "success";

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, "id">) => void;
  dismiss: (id: string) => void;
}

/* ── Context ────────────────────────────────────── */
const ToastContext = React.createContext<ToastContextValue | null>(null);

function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

/* ── Provider ───────────────────────────────────── */
function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (props: Omit<ToastProps, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const duration = props.duration ?? 5000;
      setToasts((prev) => [...prev, { ...props, id }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

/* ── Toaster ────────────────────────────────────── */
const toastVariants = cva(
  "pointer-events-auto relative flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-card border-border text-foreground",
        destructive: "bg-destructive/10 border-destructive/30 text-destructive",
        success: "bg-primary/10 border-primary/30 text-primary",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div
      data-slot="toaster"
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((t) => (
        <div key={t.id} data-slot="toast" className={cn(toastVariants({ variant: t.variant }))}>
          <div className="flex-1 space-y-1">
            {t.title && (
              <p data-slot="toast-title" className="text-sm font-semibold leading-none">
                {t.title}
              </p>
            )}
            {t.description && (
              <p data-slot="toast-description" className="text-sm text-muted-foreground">
                {t.description}
              </p>
            )}
          </div>
          <button
            type="button"
            data-slot="toast-close"
            onClick={() => dismiss(t.id)}
            className="shrink-0 rounded-md p-0.5 text-current opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/50"
            aria-label="Dismiss"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export { Toaster, ToastProvider, useToast };
