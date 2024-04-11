"use client";
import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkoutFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  const cartItems = useSelector((store) => store.cart);
  const subTotal =
    cartItems
      .reduce((acc, currentItem) => {
        return acc + currentItem.salePrice * currentItem.qty;
      }, 0)
      .toFixed(2) ?? 0;

  async function submitData() {
    // orderItems = cartItems;
    //
    const data = {
      orderItems: cartItems,
      checkoutFormData,
    };
    // console.log(data.orderItems);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success("Order Created Successfully");
        router.push(`/order-confirmation/${responseData.id}`);
      } else {
        setLoading(false);
        toast.error("Something Went wrong, Please Try Again");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Order Summary
      </h2>
      {cartItems.map((cartItem, i) => {
        return (
          <div className="flex items-center justify-between border-b border-slate-400  pb-3 font-semibold text-sm mb-4">
            <div className="flex items-center gap-3">
              <Image
                src={cartItem.imageUrl}
                width={249}
                height={249}
                alt={cartItem.title}
                className="rounded-xl w-14 h-14"
              />
              <div className="flex flex-col">
                <h2>{cartItem.title}</h2>
              </div>
            </div>
            <div className=" rounded-xl border border-gray-400 flex gap-3 items-center ">
              <p className="flex-grow py-2 px-4">{cartItem.qty}</p>
            </div>
            <div className="flex items-center gap-2">
              <h4>UGX{cartItem.salePrice}</h4>
            </div>
          </div>
        );
      })}
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
            <span>Proceed to Payment</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
