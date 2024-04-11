"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function Paginate({ totalPages, isSearch }) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "asc";
  const min = searchParams.get("min") || 0;
  const max = searchParams.get("max") || "";
  const search = searchParams.get("search");
  const currentPage = parseInt(searchParams.get("page")) || 1;
  console.log(currentPage, totalPages);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              isSearch
                ? `${
                    currentPage === 1
                      ? `?${new URLSearchParams({
                          search,
                          page: 1,
                          sort,
                          min,
                          max,
                        })}`
                      : `?${new URLSearchParams({
                          search,
                          page: parseInt(currentPage) - 1,
                          sort,
                          min,
                          max,
                        })}`
                  }`
                : `${
                    currentPage === 1
                      ? `?${new URLSearchParams({ page: 1, sort, min, max })}`
                      : `?${new URLSearchParams({
                          page: parseInt(currentPage) - 1,
                          sort,
                          min,
                          max,
                        })}`
                  }`
            }
          />
        </PaginationItem>
        {totalPages <= 3 ? (
          Array.from({ length: totalPages }, (_, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === currentPage}
                  href={
                    isSearch
                      ? `?${new URLSearchParams({
                          search,
                          page: index + 1,
                          sort,
                          min,
                          max,
                        })}`
                      : `?${new URLSearchParams({
                          page: index + 1,
                          sort,
                          min,
                          max,
                        })}`
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <>
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={
                      isSearch
                        ? `?${new URLSearchParams({
                            search,
                            page: index + 1,
                            sort,
                            min,
                            max,
                          })}`
                        : `?${new URLSearchParams({
                            page: index + 1,
                            sort,
                            min,
                            max,
                          })}`
                    }
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={
              isSearch
                ? `${
                    currentPage == totalPages
                      ? `?${new URLSearchParams({
                          search,
                          page: totalPages,
                          sort,
                          min,
                          max,
                        })}`
                      : `?${new URLSearchParams({
                          search,
                          page: parseInt(currentPage) + 1,
                          sort,
                          min,
                          max,
                        })}`
                  }`
                : `${
                    currentPage == totalPages
                      ? `?${new URLSearchParams({
                          page: totalPages,
                          sort,
                          min,
                          max,
                        })}`
                      : `?${new URLSearchParams({
                          page: parseInt(currentPage) + 1,
                          sort,
                          min,
                          max,
                        })}`
                  }`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
