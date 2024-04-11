import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function OverviewCards({ sales, products }) {
  const productsCount = products.length.toString().padStart(2, "0");
  const salesCount = sales.length.toString().padStart(2, "0");
  const totalSales = sales.reduce((acc, item) => acc + item.total, 0);
  const analytics = [
    {
      title: "Products",
      count: productsCount,
      unit: "",
      link: "/dashboard/products",
      icon: "",
    },
    {
      title: "Sales",
      count: salesCount,
      unit: "",
      link: "/dashboard/sales",
      icon: "",
    },
    {
      title: "Total Revenue",
      count: totalSales,
      unit: "",
      link: "/dashboard/sales",
      icon: "",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {analytics.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800"
          >
            <div className="p-4 md:p-5 flex justify-between gap-x-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {item.title}
                </p>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="mt-1 text-xl font-medium text-gray-800 dark:text-gray-200">
                    {item.count}
                    {item.unit}
                  </h3>
                </div>
              </div>
              <div className="flex-shrink-0 flex justify-center items-center w-[46px] h-[46px] bg-blue-600 text-white rounded-full dark:bg-blue-900 dark:text-blue-200">
                <svg
                  className="flex-shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 22h14" />
                  <path d="M5 2h14" />
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                </svg>
              </div>
            </div>

            <Link
              className="py-3 px-4 md:px-5 inline-flex justify-between items-center text-sm text-gray-600 border-t border-gray-200 hover:bg-gray-50 rounded-b-xl dark:border-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href={item.link}
            >
              View reports
              <ChevronRight className="flex-shrink-0 w-4 h-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
