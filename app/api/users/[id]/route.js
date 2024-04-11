import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        id: true,
        role: true,
        createdAt: true,
        profile: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch User",
        error,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    const deletedUser = await db.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete User",
        error,
      },
      { status: 500 }
    );
  }
}
