"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { convertIsoDateToNormal } from "@/lib/convertIsoDatetoNormal";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";
import { generateSlug } from "@/lib/generateSlug";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CouponForm({ updateData = {} }) {
  const { data: session, status } = useSession();
  const vendorId = session?.user?.id;
  const expiryDateNormal = convertIsoDateToNormal(updateData.expiryDate);
  const id = updateData?.id ?? "";
  updateData.expiryDate = expiryDateNormal;
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState();

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });
  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/coupons");
  }
  async function onSubmit(data) {
    data.vendorId = vendorId;
    const couponCode = generateCouponCode(data.title, data.expiryDate);
    const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
    data.expiryDate = isoFormattedDate;
    data.couponCode = couponCode;
    console.log(data);
    if (id) {
      //Make Put Request
      makePutRequest(setLoading, `api/coupons/${id}`, data, "Coupon", redirect);
    } else {
      makePostRequest(
        setLoading,
        "api/coupons",
        data,
        "Coupon",
        reset,
        redirect
      );
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ToggleInput
          label="Publish your Coupon"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Coupon please wait...`}
      />
    </form>
  );
}
