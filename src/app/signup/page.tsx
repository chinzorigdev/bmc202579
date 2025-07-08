"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee } from "lucide-react";
import Link from "next/link";

export default function UsernameSelection() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(value);
  };

  const handleContinue = async () => {
    if (!username || username.length < 3) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Username reserved:", username);
      // Redirect to full registration
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-semibold text-gray-900">
              Надад кофе авч өгөөрэй
            </span>
          </Link>
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-gray-600">Бүртгэлтэй юу?</span>
            <Link
              href="/login"
              className="text-orange-600 underline hover:no-underline"
            >
              Нэвтрэх
            </Link>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Бүртгэл үүсгэх
          </h1>
          <p className="text-gray-600 mb-6">
            Өөрийн хуудасны нэрийг сонгоно уу.
          </p>

          {/* Username Input */}
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium z-10">
              buymeacoffee.com/
            </div>
            <Input
              type="text"
              placeholder="таны нэр"
              value={username}
              onChange={handleUsernameChange}
              className="h-12 pl-44 pr-4 text-base font-medium border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 flex-1 mr-4">
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
            <Button
              onClick={handleContinue}
              disabled={!username || username.length < 3 || isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 rounded-full font-medium min-w-[120px]"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Бүртгүүлэх"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
