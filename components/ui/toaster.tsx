"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type ToasterProps = {
  position?: "bottom" | "top";
};

export function Toaster({ position }: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              "data-[state=open]:slide-in-from-bottom-full",
              "lg:data-[state=open]:slide-in-from-top-full"
            )}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-primary-foreground hover:text-primary-foreground" />
          </Toast>
        );
      })}
      <ToastViewport className={"bottom-0 lg:top-0"} />
    </ToastProvider>
  );
}
