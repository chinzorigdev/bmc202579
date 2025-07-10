import React from "react";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import {
  CoffeeIllustrations,
  BackgroundPattern,
} from "@/components/illustrations/CoffeeIllustrations";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <BackgroundPattern />

      {/* Header */}
      <header className="border-b border-gray-200 relative z-10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="coffee-glow rounded-full p-1">
              <Coffee className="h-6 w-6 text-orange-500" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              Buy Me a Coffee
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Нэвтрэх
            </a>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm pulse-coffee">
              Эхлэх
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Бүтээлч ажилдаа <span className="text-orange-500">дэмжлэг</span>{" "}
              авцгаая
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Дэмжигчдээсээ кофе авцгаая. Хялбар, хурдан, найрсаг арга.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 pulse-coffee"
              >
                Хуудас нээх
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-3"
              >
                Танилцуулга үзэх
              </Button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="floating-animation">
              <CoffeeIllustrations.HeroCoffee className="w-80 h-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="illustration-bg py-16 relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="illustration-card rounded-3xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <CoffeeIllustrations.CreatorAtWork className="w-16 h-16" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                500,000+
              </div>
              <div className="text-sm text-gray-600">Бүтээгчид</div>
            </div>
            <div className="illustration-card rounded-3xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <CoffeeIllustrations.MoneyFlow className="w-16 h-16" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10М+</div>
              <div className="text-sm text-gray-600">Кофе худалдан авсан</div>
            </div>
            <div className="illustration-card rounded-3xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <CoffeeIllustrations.CommunitySupport className="w-16 h-16" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">180+</div>
              <div className="text-sm text-gray-600">Улс орон</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Simple */}
      <section className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Хэрхэн ажилладаг вэ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Гурван хялбар алхамаар дэмжигчдээсээ кофе авч эхлээрэй
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="floating-animation">
                  <CoffeeIllustrations.StepIcon
                    step={1}
                    className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Хуудас үүсгэх
              </h3>
              <p className="text-gray-600">
                Бүртгүүлж, өөрийн хуудсаа тохируулна уу
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div
                  className="floating-animation"
                  style={{ animationDelay: "0.5s" }}
                >
                  <CoffeeIllustrations.StepIcon
                    step={2}
                    className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Холбоос хуваалцах
              </h3>
              <p className="text-gray-600">
                Дэмжигчдэдээ өөрийн холбоосоо илгээнэ үү
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div
                  className="floating-animation"
                  style={{ animationDelay: "1s" }}
                >
                  <CoffeeIllustrations.StepIcon
                    step={3}
                    className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Кофе авах
              </h3>
              <p className="text-gray-600">
                Дэмжлэг авч, ажлаа үргэлжлүүлнэ үү
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="illustration-bg py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="illustration-card rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="pulse-coffee">
                <CoffeeIllustrations.SuccessIllustration className="w-24 h-24" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Бүтээлч ажилдаа дэмжлэг авна уу
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Дэмжигчдээсээ кофе авч, ажлаа үргэлжлүүлэх боломжтой
            </p>
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-12 py-4 text-lg pulse-coffee transform hover:scale-105 transition-all duration-300"
            >
              Үнэгүй эхлэх
            </Button>
          </div>
        </div>

        {/* Floating coffee beans */}
        <div className="absolute top-10 left-10 floating-animation">
          <CoffeeIllustrations.FloatingCoffeeBean className="w-6 h-6 text-orange-300" />
        </div>
        <div
          className="absolute top-20 right-20 floating-animation"
          style={{ animationDelay: "1s" }}
        >
          <CoffeeIllustrations.FloatingCoffeeBean className="w-8 h-8 text-orange-400" />
        </div>
        <div
          className="absolute bottom-20 left-20 floating-animation"
          style={{ animationDelay: "2s" }}
        >
          <CoffeeIllustrations.FloatingCoffeeBean className="w-5 h-5 text-orange-300" />
        </div>
        <div
          className="absolute bottom-10 right-10 floating-animation"
          style={{ animationDelay: "0.5s" }}
        >
          <CoffeeIllustrations.FloatingCoffeeBean className="w-7 h-7 text-orange-400" />
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Coffee className="h-5 w-5 text-orange-500" />
                <span className="font-semibold text-gray-900">
                  Buy Me a Coffee
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                Бүтээгдэхүүн
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Хэрхэн ажилладаг
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Үнэ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                Компани
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Бидний тухай
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Холбоо барих
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                Тусламж
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Тусламжийн төв
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Нөхцөл
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 Buy Me a Coffee. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
