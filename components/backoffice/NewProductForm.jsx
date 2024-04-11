"use client";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";

import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MultipleImageInput from "../FormInputs/MultipleImageInput";

export default function NewProductForm({
  categories,
  farmers,
  updateData = {},
}) {
  console.log(updateData);
  const initialImageUrl = updateData?.imageUrl ?? "";
  const initialTags = updateData?.tags ?? [];
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  // TAGS
  const [tags, setTags] = useState(initialTags);
  console.log(tags);
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
      isWholesale: false,
      ...updateData,
    },
  });
  const isActive = watch("isActive");
  const isWholesale = watch("isWholesale");
  console.log(isActive);
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/products");
  }
  const [productImages, setProductImages] = useState([]);
  console.log(productImages);
  async function onSubmit(data) {
    const slug = generateSlug(data.title);
    const productCode = generateUserCode("LLP", data.title);
    data.slug = slug;
    data.productImages = productImages;
    data.tags = tags;
    data.qty = 1;
    data.productCode = productCode;
    console.log(data);
    if (id) {
      data.id = id;
      // Make Put Request (Update)
      makePutRequest(
        setLoading,
        `api/products/${id}`,
        data,
        "Product",
        redirect
      );
      console.log("update Request: ", data);
    } else {
      makePostRequest(
        setLoading,
        "api/products",
        data,
        "Product",
        reset,
        redirect
      );
      setProductImages([]);
      setTags([]);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Product Title"
          name="title"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Product SKU"
          name="sku"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Product Barcode"
          name="barcode"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Product Price (Before Discount)"
          name="productPrice"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Product Sale Price(Discounted)"
          name="salePrice"
          register={register}
          errors={errors}
          type="number"
          className="w-full"
        />
        <TextInput
          label="Product Stock"
          name="productStock"
          register={register}
          errors={errors}
          type="number"
          className="w-full"
        />
        <TextInput
          label="Unit of Measurement(eg Kilograms)"
          name="unit"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="Select Category"
          name="categoryId"
          register={register}
          errors={errors}
          className="w-full"
          options={categories}
        />
        <SelectInput
          label="Select Farmer"
          name="farmerId"
          register={register}
          errors={errors}
          className="w-full"
          options={farmers}
        />
        <ToggleInput
          label="Supports Wholesale Selling"
          name="isWholesale"
          trueTitle="Supported"
          falseTitle="Not Supported"
          register={register}
        />

        {isWholesale && (
          <>
            <TextInput
              label="Wholesale Price"
              name="wholesalePrice"
              register={register}
              errors={errors}
              type="number"
              className="w-full"
            />
            <TextInput
              label="Minimum Wholesale Qty"
              name="wholesaleQty"
              register={register}
              errors={errors}
              type="number"
              className="w-full"
            />
          </>
        )}

        <MultipleImageInput
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint="multipleProductsUploader"
          label="Product Image Images"
        />
        {/* Tags */}
        <ArrayItemsInput setItems={setTags} items={tags} itemTitle="Tag" />

        <TextareaInput
          label="Product Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ToggleInput
          label="Publish your Product"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Product" : "Create Product"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Product please wait...`}
      />
    </form>
  );
}
