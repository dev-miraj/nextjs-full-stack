import Breadcrumb from "@/components/frontend/Breadcrumb";
import CategoryList from "@/components/frontend/CategoryList";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({ params: { slug } }) {
  const market = await getData(`markets/details/${slug}`);
  const marketCategoryIds = market.categoryIds;
  // console.log(marketCategoryIds);

  const categoriesData = await getData("categories");
  const categories = categoriesData.filter((category) => {
    return category.products.length > 3;
  });
  const marketCategories = categories.filter((category) =>
    marketCategoryIds.includes(category.id)
  );
  console.log(marketCategories);
  return (
    <>
      <Breadcrumb />
      <div className=" bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700  dark:text-slate-200 p-4 text-slate-800 overflow-hidden flex items-center gap-6">
        <div className="">
          <Image
            src={market.logoUrl}
            width={50}
            height={50}
            alt={market.title}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="">
          <h2 className="py-4 text-base lg:text-4xl">{market.title}</h2>
          <p className="text-sm line-clamp-2 mb-4">{market.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 py-8 w-full">
        <div className="col-span-full sm:col-span-12 rounded-md">
          {marketCategories.map((category, i) => {
            return (
              <div className="space-y-8" key={i}>
                <CategoryList isMarketPage={false} category={category} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
