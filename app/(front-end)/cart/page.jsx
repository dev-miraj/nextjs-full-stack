"use client";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CartItems from "@/components/frontend/CartItems";
import CartProduct from "@/components/frontend/CartProduct";
import CartSubTotalCard from "@/components/frontend/CartSubTotalCard";
import EmptyCart from "@/components/frontend/EmptyCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems);
  const subTotal =
    cartItems
      .reduce((acc, currentItem) => {
        return acc + currentItem.salePrice * currentItem.qty;
      }, 0)
      .toFixed(2) ?? 0;

  console.log(subTotal);
  return (
    <div>
      <Breadcrumb />
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 md:gap-14 ">
          <CartItems cartItems={cartItems} />
          <CartSubTotalCard subTotal={subTotal} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
