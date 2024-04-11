"use client";

import { generateUserCode } from "@/lib/generateUserCode";
import { setCurrentStep } from "@/redux/slices/onboardingSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Summary({ farmerId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onboardingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  async function submitData() {
    const data = {
      ...onboardingFormData,
    };
    const fullName = `${data.firstName} ${data.lastName}`;
    const code = generateUserCode("LFF", fullName);
    data.code = code;
    data.userId = farmerId;
    console.log(data);
    makePostRequest(
      setLoading,
      "api/farmers",
      data,
      "Farmer Profile",
      reset,
      redirect
    );
  }
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Order Summary
      </h2>
      <div className="flex">
        <h2>Here are your Details</h2>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            Processing Please wait...
          </button>
        ) : (
          <button
            onClick={submitData}
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Submit Data</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
