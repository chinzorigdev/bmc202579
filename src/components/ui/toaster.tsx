"use client";

import { useEffect } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useUIStore } from "@/lib/store";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

export function Toaster() {
  const { notifications, removeNotification } = useUIStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration) {
        const timeoutId = setTimeout(() => {
          removeNotification(notification.id);
        }, notification.duration);

        return () => clearTimeout(timeoutId);
      }
    });
  }, [notifications, removeNotification]);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive" as const;
      case "success":
        return "success" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <ToastProvider>
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          variant={getVariant(notification.type)}
          duration={notification.duration || 5000}
        >
          <div className="flex items-start space-x-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <ToastTitle>{notification.title}</ToastTitle>
              {notification.message && (
                <ToastDescription>{notification.message}</ToastDescription>
              )}
            </div>
          </div>
          <ToastClose onClick={() => removeNotification(notification.id)} />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

// Hook for easy toast usage
export function useToast() {
  const { addNotification } = useUIStore();

  const toast = {
    success: (title: string, message?: string, duration = 5000) =>
      addNotification({
        type: "success",
        title,
        message: message || "",
        duration,
      }),

    error: (title: string, message?: string, duration = 7000) =>
      addNotification({
        type: "error",
        title,
        message: message || "",
        duration,
      }),

    warning: (title: string, message?: string, duration = 6000) =>
      addNotification({
        type: "warning",
        title,
        message: message || "",
        duration,
      }),

    info: (title: string, message?: string, duration = 5000) =>
      addNotification({
        type: "info",
        title,
        message: message || "",
        duration,
      }),
  };

  return { toast };
}
