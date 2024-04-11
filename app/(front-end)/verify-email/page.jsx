import { getData } from "@/lib/getData";
import { Info } from "lucide-react";
import React from "react";

export default async function VerifyMail({ searchParams }) {
  const { userId } = searchParams;
  const user = await getData(`users/${userId}`);
  const { email } = user;
  console.log(userId);
  return (
    <div className="max-w-2xl mx-auto min-h-screen mt-8">
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <div className="flex items-center">
          <Info className="flex-shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Email Sent-Verify your account
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Thank you for creating an account with Us, we have sent you an email
          to <span className="font-bold">{email}</span>, check in your inbox and
          click on the link to complete your onborading process
          <button className="mx-4 text-white">Change email</button>
        </div>
      </div>
    </div>
  );
}
