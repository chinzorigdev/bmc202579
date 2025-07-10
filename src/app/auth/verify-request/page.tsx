"use client";

import Link from "next/link";
import { Coffee, Mail } from "lucide-react";
import {
  CoffeeIllustrations,
  BackgroundPattern,
} from "@/components/illustrations/CoffeeIllustrations";

export default function VerifyRequestPage() {
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center py-16 px-4 relative z-10">
        <div className="max-w-md w-full">
          <div className="illustration-card rounded-3xl shadow-2xl p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 rounded-full p-4">
                <Mail className="h-12 w-12 text-orange-500" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              И-мэйлээ шалгана уу
            </h1>

            <p className="text-gray-600 mb-8">
              Танд нэвтрэх холбоос илгээлээ. И-мэйлээ шалгаад холбоос дээр дарна
              уу.
            </p>

            <div className="space-y-4">
              <Link
                href="/login"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 rounded-2xl font-medium inline-flex items-center justify-center transition-all duration-300"
              >
                Нэвтрэх хуудас руу буцах
              </Link>

              <Link
                href="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 h-12 px-6 rounded-2xl font-medium inline-flex items-center justify-center transition-all duration-300"
              >
                Нүүр хуудас руу буцах
              </Link>
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
    </div>
  );
}
