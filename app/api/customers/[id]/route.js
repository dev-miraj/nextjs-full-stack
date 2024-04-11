import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function PUT(request, { params: { id } }) {
  try {
    const { title, couponCode, expiryDate, isActive } = await request.json();
    const existingUser = await db.coupon.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `Not Found`,
        },
        { status: 404 }
      );
    }
    const updatedUser = await db.userProfile.update({
      where: { id },
      data: {
        title,
        couponCode,
        expiryDate,
        isActive,
      },
    });
    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Coupon",
        error,
      },
      { status: 500 }
    );
  }
}
