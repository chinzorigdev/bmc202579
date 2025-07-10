"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema, type SignupInput } from "@/lib/schemas";
import { useUserStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SignupFormProps extends React.ComponentProps<"div"> {
  onSuccess?: () => void;
}

export function SignupForm({
  className,
  onSuccess,
  ...props
}: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [checkingUsername, setCheckingUsername] = useState(false);

  const { setUser, setLoading } = useUserStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
  });

  const watchedUsername = watch("username");
  const watchedPassword = watch("password");

  // Username availability check
  useEffect(() => {
    if (watchedUsername && watchedUsername.length >= 3) {
      setCheckingUsername(true);
      const timeoutId = setTimeout(async () => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          // Mock availability check
          const isAvailable = ![
            "admin",
            "test",
            "user",
            "buymeacoffee",
          ].includes(watchedUsername.toLowerCase());
          setUsernameAvailable(isAvailable);

          if (!isAvailable) {
            setError("username", {
              type: "manual",
              message: "Энэ хэрэглэгчийн нэр авсан байна",
            });
          } else {
            clearErrors("username");
          }
        } catch (error: unknown) {
          console.error("Username check error:", error);
          setUsernameAvailable(null);
        } finally {
          setCheckingUsername(false);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameAvailable(null);
      setCheckingUsername(false);
    }
  }, [watchedUsername, setError, clearErrors]);

  // Password strength indicators
  const passwordChecks = {
    length: watchedPassword?.length >= 8,
    lowercase: /[a-z]/.test(watchedPassword || ""),
    uppercase: /[A-Z]/.test(watchedPassword || ""),
    number: /\d/.test(watchedPassword || ""),
  };

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful signup
      const mockUser = {
        id: "user-" + Date.now(),
        username: data.username,
        email: data.email,
        displayName: data.displayName,
        isVerified: false,
        coffeeCount: 0,
        supportersCount: 0,
        totalEarnings: 0,
      };

      setUser(mockUser);
      onSuccess?.();

      console.log("Signup successful:", data);
    } catch (error: unknown) {
      console.error("Signup error:", error);
      setError("root", {
        type: "manual",
        message: "Бүртгэл үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.",
      });
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">Хэрэглэгчийн нэр</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm z-10">
                buymeacoffee.com/
              </div>
              <Input
                id="username"
                type="text"
                placeholder="таны_нэр"
                {...register("username")}
                className={cn(
                  "h-12 pl-32 pr-10 rounded-2xl border-2 transition-all duration-300",
                  errors.username
                    ? "border-red-500 focus:border-red-500"
                    : usernameAvailable === true
                    ? "border-green-500 focus:border-green-500"
                    : "border-gray-200 focus:border-orange-500"
                )}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {checkingUsername ? (
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                ) : usernameAvailable === true ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : usernameAvailable === false ? (
                  <X className="h-4 w-4 text-red-500" />
                ) : null}
              </div>
            </div>
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
            {usernameAvailable === true && !errors.username && (
              <p className="text-sm text-green-600">
                ✓ Хэрэглэгчийн нэр боломжтой
              </p>
            )}
          </div>

          {/* Display Name Field */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Дэлгэцийн нэр</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Таны бүтэн нэр"
              {...register("displayName")}
              className={cn(
                "h-12 rounded-2xl border-2 transition-all duration-300",
                errors.displayName
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-500"
              )}
            />
            {errors.displayName && (
              <p className="text-sm text-red-600">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">И-мэйл хаяг</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className={cn(
                "h-12 rounded-2xl border-2 transition-all duration-300",
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-500"
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Нууц үг</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={cn(
                  "h-12 rounded-2xl border-2 pr-12 transition-all duration-300",
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-orange-500"
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>

            {/* Password Strength Indicators */}
            {watchedPassword && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <div
                    className={cn(
                      "flex items-center space-x-1",
                      passwordChecks.length ? "text-green-600" : "text-gray-400"
                    )}
                  >
                    {passwordChecks.length ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    <span>8+ тэмдэгт</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-1",
                      passwordChecks.lowercase
                        ? "text-green-600"
                        : "text-gray-400"
                    )}
                  >
                    {passwordChecks.lowercase ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    <span>жижиг үсэг</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div
                    className={cn(
                      "flex items-center space-x-1",
                      passwordChecks.uppercase
                        ? "text-green-600"
                        : "text-gray-400"
                    )}
                  >
                    {passwordChecks.uppercase ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    <span>том үсэг</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-1",
                      passwordChecks.number ? "text-green-600" : "text-gray-400"
                    )}
                  >
                    {passwordChecks.number ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    <span>тоо</span>
                  </div>
                </div>
              </div>
            )}

            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Нууц үг баталгаажуулах</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={cn(
                  "h-12 rounded-2xl border-2 pr-12 transition-all duration-300",
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-orange-500"
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Root Error */}
          {errors.root && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600">{errors.root.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || isLoading || usernameAvailable === false}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-medium pulse-coffee transform hover:scale-105 transition-all duration-300 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Бүртгүүлж байна...</span>
              </div>
            ) : (
              "Бүртгүүлэх"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
