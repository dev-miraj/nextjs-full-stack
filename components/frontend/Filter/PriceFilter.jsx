"use client";
import { Circle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function PriceFilter({ slug, isSearch }) {
  const searchParams = useSearchParams();
  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "asc";
  const page = parseInt(searchParams.get("page")) || 1;
  const params = new URLSearchParams(searchParams);
  console.log(isSearch, search);
  const priceRanges = [
    {
      display: "under 300",
      max: 300,
    },
    {
      display: "Between 300 and 500",
      max: 500,
      min: 300,
    },
    {
      display: "Between 500 and 700",
      max: 700,
      min: 500,
    },
    {
      display: "Above 700",
      min: 700,
    },
  ];
  const router = useRouter();
  const { handleSubmit, reset, register } = useForm();
  function onSubmit(data) {
    const { min, max } = data;
    // if (isSearch) {
    //   params.append("query", term);
    // } else {
    //   params.delete("query");
    // }
    // replace(`${pathname}?${params.toString()}`);
    router.push(
      `/category/${slug}?page=${page}&sort=${sort}&min=${min}&max=${max}`
    );
    reset();
  }
  return (
    <div>
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Price </h2>
          <Link
            className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
            href={isSearch ? `/search?search=${search}` : `/category/${slug}`}
          >
            Reset Filters
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          {priceRanges.map((range, i) => {
            return (
              <Link
                key={i}
                href={
                  isSearch
                    ? `?${new URLSearchParams({
                        search,
                        page,
                        sort,
                        min: range.min || 0,
                        max: range.max || "",
                      })}`
                    : `?${new URLSearchParams({
                        page,
                        sort,
                        min: range.min || 0,
                        max: range.max || "",
                      })}`
                }
                className={`${
                  (range.min && range.min == minParam) ||
                  (range.max && range.max == maxParam) ||
                  (range.min &&
                    range.max &&
                    range.min == minParam &&
                    range.max == maxParam)
                    ? "flex gap-2 items-center text-lime-500"
                    : "flex gap-2 items-center"
                }`}
              >
                <Circle className="w-4 h-4 flex-shrink-0" />
                {range.display}
              </Link>
            );
          })}
        </div>

        {isSearch ? (
          ""
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-4 my-4"
          >
            <div className="col-span-1">
              <input
                {...register("min")}
                type="number"
                id="cvv-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                placeholder="min"
              />
            </div>
            <div className="col-span-1">
              <input
                {...register("max")}
                type="number"
                id="cvv-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                placeholder="Max"
              />
            </div>
            <div className="col-span-1">
              <button
                type="submit"
                className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
              >
                Go
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
