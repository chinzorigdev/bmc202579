import React from "react";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coffee className="h-6 w-6 text-orange-500" />
            <span className="text-lg font-semibold text-gray-900">
              Buy Me a Coffee
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Нэвтрэх
            </a>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm">
              Эхлэх
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Бүтээлч ажилдаа <span className="text-orange-500">дэмжлэг</span>{" "}
            авцгаая
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Дэмжигчдээсээ кофе авцгаая. Хялбар, хурдан, найрсаг арга.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3"
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
      </section>

      {/* Simple Stats */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                500,000+
              </div>
              <div className="text-sm text-gray-600">Бүтээгчид</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">10М+</div>
              <div className="text-sm text-gray-600">Кофе худалдан авсан</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">180+</div>
              <div className="text-sm text-gray-600">Улс орон</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Simple */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Хэрхэн ажилладаг вэ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">
                Хуудас үүсгэх
              </h3>
              <p className="text-sm text-gray-600">
                Бүртгүүлж, өөрийн хуудсаа тохируулна уу
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">
                Холбоос хуваалцах
              </h3>
              <p className="text-sm text-gray-600">
                Дэмжигчдэдээ өөрийн холбоосоо илгээнэ үү
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-500 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Кофе авах</h3>
              <p className="text-sm text-gray-600">
                Дэмжлэг авч, ажлаа үргэлжлүүлнэ үү
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="bg-orange-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Бүтээлч ажилдаа дэмжлэг авна уу
          </h2>
          <p className="text-gray-600 mb-8">
            Дэмжигчдээсээ кофе авч, ажлаа үргэлжлүүлэх боломжтой
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3"
          >
            Үнэгүй эхлэх
          </Button>
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
