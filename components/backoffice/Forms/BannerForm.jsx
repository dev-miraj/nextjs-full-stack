"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function BannerForm({ updateData = {} }) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
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
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/banners");
  }
  const isActive = watch("isActive");
  async function onSubmit(data) {
    data.imageUrl = imageUrl;
    console.log(data);
    if (id) {
      //Make Put Request
      makePutRequest(setLoading, `api/banners/${id}`, data, "Banner", redirect);
    } else {
      //make post request
      makePostRequest(
        setLoading,
        "api/banners",
        data,
        "Banner",
        reset,
        redirect
      );
      setImageUrl("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
        />
        {/* Configure this endpoint in the core js */}
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="bannerImageUploader"
          label="Banner Image"
        />
        <ToggleInput
          label="Publish your Banner"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Banner please wait...`}
      />
    </form>
  );
}
