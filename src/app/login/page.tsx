"use client";

import Link from "next/link";
import { Coffee } from "lucide-react";
import {
  CoffeeIllustrations,
  BackgroundPattern,
} from "@/components/illustrations/CoffeeIllustrations";
import { LoginForm } from "@/components/forms/LoginForm";
import { useToast } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleLoginSuccess = () => {
    toast.success("Амжилттай нэвтэрлээ!", "Таны хуудас руу шилжүүлж байна...");
    // Redirect to dashboard or home page
    setTimeout(() => {
      router.push("/");
    }, 1000);
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
              <span className="text-gray-600">Бүртгэлгүй юу?</span>
              <Link
                href="/signup"
                className="text-orange-600 font-medium hover:text-orange-700 underline hover:no-underline transition-colors"
              >
                Бүртгүүлэх
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Illustration Side */}
            <div className="hidden lg:flex justify-center">
              <div className="floating-animation">
                <CoffeeIllustrations.CommunitySupport className="w-80 h-80" />
              </div>
            </div>

            {/* Form Side */}
            <div className="flex justify-center lg:justify-start">
              <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="pulse-coffee">
                      <CoffeeIllustrations.SuccessIllustration className="w-16 h-16" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Нэвтрэх
                  </h1>
                  <p className="text-gray-600">
                    Өөрийн дансанд нэвтэрч, дэмжлэг хүлээн авна уу.
                  </p>
                </div>

                {/* Login Form */}
                <div className="illustration-card rounded-3xl shadow-2xl p-8">
                  <LoginForm onSuccess={handleLoginSuccess} />

                  {/* Signup Link */}
                  <div className="text-center text-sm mt-6 pt-6 border-t border-gray-100">
                    Бүртгэлгүй юу?{" "}
                    <Link
                      href="/signup"
                      className="text-orange-600 underline underline-offset-4 hover:no-underline font-medium"
                    >
                      Бүртгүүлэх
                    </Link>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-muted-foreground text-center text-xs text-balance mt-6">
                  Үргэлжлүүлэх товч дарснаар та манай{" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    үйлчилгээний нөхцөл
                  </Link>{" "}
                  болон{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    нууцлалын бодлого
                  </Link>
                  -той зөвшөөрч байна.
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
