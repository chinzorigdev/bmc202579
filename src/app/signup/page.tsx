"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee } from "lucide-react";
import Link from "next/link";
import {
  CoffeeIllustrations,
  BackgroundPattern,
} from "@/components/illustrations/CoffeeIllustrations";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toaster";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showUsernameStep, setShowUsernameStep] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      // Clean username: lowercase, alphanumeric and underscore only
      const cleanValue = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      toast.error("Google бүртгэлд алдаа гарлаа", "Дахин оролдоно уу.");
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showUsernameStep) {
      // First step: collect basic info
      if (!formData.name || !formData.email) {
        toast.error("Бүх талбарыг бөглөнө үү");
        return;
      }
      setShowUsernameStep(true);
      return;
    }

    // Second step: complete registration with username
    if (!formData.username || formData.username.length < 3) {
      toast.error("Хэрэглэгчийн нэр 3-аас дээш тэмдэгттэй байх ёстой");
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically create the user account
      // For now, we'll use email provider for magic link
      await signIn("email", {
        email: formData.email,
        callbackUrl: "/auth/setup-profile",
        redirect: true,
      });
    } catch (error) {
      toast.error("Бүртгэлд алдаа гарлаа", "Дахин оролдоно уу.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen illustration-bg relative overflow-hidden">
      <BackgroundPattern />

      {/* Header */}
      <div className="w-full bg-white/90 backdrop-blur-sm shadow-sm border-b relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="coffee-glow rounded-full p-1">
                <Coffee className="h-10 w-10 text-orange-500" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Надад кофе авч өгөөрэй
              </span>
            </Link>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Бүртгэлтэй юу?</span>
              <Link
                href="/login"
                className="text-orange-600 font-medium hover:text-orange-700 underline hover:no-underline transition-colors"
              >
                Нэвтрэх
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center py-16 px-4 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Illustration Side */}
            <div className="hidden lg:flex justify-center">
              <div className="floating-animation">
                <CoffeeIllustrations.CreatorAtWork className="w-80 h-80" />
              </div>
            </div>

            {/* Form Side */}
            <div className="flex justify-center lg:justify-start">
              <div className="max-w-md w-full">
                {/* Main Form */}
                <div className="illustration-card rounded-3xl shadow-2xl p-10">
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="pulse-coffee">
                        <CoffeeIllustrations.SuccessIllustration className="w-16 h-16" />
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {showUsernameStep
                        ? "Хуудасны нэр сонгох"
                        : "Бүртгэл үүсгэх"}
                    </h1>
                    <p className="text-gray-600 mb-6">
                      {showUsernameStep
                        ? "Өөрийн хуудасны нэрийг сонгоно уу."
                        : "Дэмжлэг хүлээн авахын тулд бүртгүүлээрэй."}
                    </p>
                  </div>

                  {/* Google Signup Button */}
                  {!showUsernameStep && (
                    <div className="mb-6">
                      <Button
                        onClick={handleGoogleSignup}
                        disabled={isLoading}
                        className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-2xl font-medium flex items-center justify-center space-x-2 transition-all duration-300"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google-аар бүртгүүлэх
                      </Button>

                      <div className="relative text-center text-sm my-6">
                        <span className="bg-white text-gray-500 px-4">
                          Эсвэл
                        </span>
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email Signup Form */}
                  <form onSubmit={handleEmailSignup} className="space-y-6">
                    {!showUsernameStep ? (
                      // Step 1: Basic Info
                      <>
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Нэр
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Таны бүтэн нэр"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="h-12 rounded-2xl border-2 focus:border-orange-500"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            И-мэйл хаяг
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-12 rounded-2xl border-2 focus:border-orange-500"
                            required
                          />
                        </div>
                      </>
                    ) : (
                      // Step 2: Username Selection
                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Хуудасны нэр
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10">
                            buymeacoffee.com/
                          </div>
                          <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="таны-нэр"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="h-14 pl-44 pr-4 text-base font-medium border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-0 transition-all duration-300"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Энэ нэр таны хуудасны хаягт ашиглагдана
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white h-14 px-6 rounded-2xl font-medium text-lg pulse-coffee transform hover:scale-105 transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : showUsernameStep ? (
                        "Бүртгэлээ дуусгах"
                      ) : (
                        "Үргэлжлүүлэх"
                      )}
                    </Button>

                    {/* Back Button for Step 2 */}
                    {showUsernameStep && (
                      <Button
                        type="button"
                        onClick={() => setShowUsernameStep(false)}
                        variant="outline"
                        className="w-full h-12 rounded-2xl border-2"
                      >
                        Буцах
                      </Button>
                    )}
                  </form>

                  {/* Login Link */}
                  {!showUsernameStep && (
                    <div className="text-center text-sm mt-6 pt-6 border-t border-gray-100">
                      Бүртгэлтэй юу?{" "}
                      <Link
                        href="/login"
                        className="text-orange-600 underline underline-offset-4 hover:no-underline font-medium"
                      >
                        Нэвтрэх
                      </Link>
                    </div>
                  )}

                  {/* Terms */}
                  <p className="text-xs text-gray-500 text-center leading-relaxed mt-6">
                    Үргэлжлүүлснээр та{" "}
                    <Link
                      href="/terms"
                      className="text-gray-900 underline hover:no-underline"
                    >
                      үйлчилгээний нөхцөл
                    </Link>{" "}
                    болон{" "}
                    <Link
                      href="/privacy"
                      className="text-gray-900 underline hover:no-underline"
                    >
                      нууцлалын бодлого
                    </Link>
                    -той зөвшөөрч байна.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 floating-animation">
        <CoffeeIllustrations.FloatingCoffeeBean className="w-6 h-6 text-orange-300" />
      </div>
      <div
        className="absolute top-1/3 right-20 floating-animation"
        style={{ animationDelay: "1s" }}
      >
        <CoffeeIllustrations.FloatingCoffeeBean className="w-8 h-8 text-orange-400" />
      </div>
      <div
        className="absolute bottom-1/4 left-20 floating-animation"
        style={{ animationDelay: "2s" }}
      >
        <CoffeeIllustrations.FloatingCoffeeBean className="w-5 h-5 text-orange-300" />
      </div>
    </div>
  );
}
