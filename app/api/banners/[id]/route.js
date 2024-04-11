import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const banner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Banner",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingBanner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "Banner Not Found",
        },
        { status: 404 }
      );
    }
    const deletedBanner = await db.banner.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Banner",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { title, link, imageUrl, isActive } = await request.json();
    const existingBanner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: `Not Found`,
        },
        { status: 404 }
      );
    }
    const updatedBanner = await db.banner.update({
      where: { id },
      data: {
        title,
        link,
        imageUrl,
        isActive,
      },
    });
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Banner",
        error,
      },
      { status: 500 }
    );
  }
}
