import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const sortBy = request.nextUrl.searchParams.get("sort");
  const min = request.nextUrl.searchParams.get("min");
  const max = request.nextUrl.searchParams.get("max");
  const searchTerm = request.nextUrl.searchParams.get("search") || "";
  const page = request.nextUrl.searchParams.get("page") || 1;
  const pageSize = 3;
  console.log(sortBy, categoryId);
  let where = {
    categoryId,
  };
  if (min && max) {
    where.salePrice = {
      gte: parseFloat(min),
      lte: parseFloat(max),
    };
  } else if (min) {
    where.salePrice = {
      gte: parseFloat(min),
    };
  } else if (max) {
    where.salePrice = {
      lte: parseFloat(max),
    };
  }
  let products;
  try {
    if (searchTerm) {
      products = await db.product.findMany({
        where: {
          OR: [
            {
              title: { contains: searchTerm, mode: "insensitive" },
            },
            {
              category: {
                title: { contains: searchTerm, mode: "insensitive" },
              },
            },
            {
              description: { contains: searchTerm, mode: "insensitive" },
            },
          ],
        },
      });
    } else if (categoryId && page) {
      products = await db.product.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
        orderBy: {
          createdAt: "desc",
        },
      });
    } else if (categoryId && sortBy) {
      products = await db.product.findMany({
        where,
        orderBy: {
          salePrice: sortBy === "asc" ? "asc" : "desc",
        },
      });
    } else if (categoryId) {
      products = await db.product.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Products",
        error,
      },
      { status: 500 }
    );
  }
}
