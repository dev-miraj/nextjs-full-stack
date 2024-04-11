import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
export async function POST(request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    //extract the credentials
    const { name, email, password, role, plan } = await request.json();
    //Check if the user Already exists in the db
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User with this email ( ${email})  already exists in the Database`,
        },
        { status: 409 }
      );
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a random UUID (version 4)
    const rawToken = uuidv4();
    console.log(rawToken);
    // Encode the token using Base64 URL-safe format
    const token = base64url.encode(rawToken);
    // Create a User in the DB
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        plan,
        verificationToken: token,
      },
    });
    console.log(newUser);
    // SEND THE EMAIL IF USER ROLE == FARMER
    if (role === "FARMER") {
      //Send an Email with the Token on the link as a search param
      const userId = newUser.id;
      const linkText = "Verify Account";
      const redirectUrl = `onboarding/${userId}?token=${token}`;
      const description =
        "Thank you, for Creating an Account with Us. We request you to click  on the link Below in order to Complete your onboarding Process. Thankyou";
      const subject = "Account Verification - Limi Ecommerce";
      const sendMail = await resend.emails.send({
        from: "Desishub <info@jazzafricaadventures.com>",
        to: email,
        subject: subject,
        react: EmailTemplate({
          name,
          redirectUrl,
          linkText,
          description,
          subject,
        }),
      });
      console.log(sendMail);
      //Upon Click redirect them to the login
    }
    return NextResponse.json(
      {
        data: newUser,
        message: "User Created Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Users",
        error,
      },
      { status: 500 }
    );
  }
}
