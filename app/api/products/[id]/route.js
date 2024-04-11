import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }
    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const {
      barcode,
      categoryId,
      description,
      farmerId,
      imageUrl,
      isActive,
      isWholesale,
      productCode,
      productPrice,
      salePrice,
      sku,
      slug,
      tags,
      title,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
    } = await request.json();
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: `Not Found`,
        },
        { status: 404 }
      );
    }
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        barcode,
        categoryId,
        description,
        userId: farmerId,
        imageUrl,
        isActive,
        isWholesale,
        productCode,
        productPrice: parseFloat(productPrice),
        salePrice: parseFloat(salePrice),
        sku,
        slug,
        tags,
        title,
        unit,
        wholesalePrice: parseFloat(wholesalePrice),
        wholesaleQty: parseInt(wholesaleQty),
        productStock: parseInt(productStock),
        qty: parseInt(qty),
        // category: {
        //   connect: { id: categoryId },
        // },
        // user: {
        //   connect: { id: farmerId },
        // },
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Product",
        error,
      },
      { status: 500 }
    );
  }
}
