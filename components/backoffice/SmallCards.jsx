import React from "react";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from "lucide-react";

export default function SmallCards({ orders }) {
  const status = {
    pending: "PENDING",
    processing: "PROCESSING",
    shipping: "SHIPPED",
    delivering: "DELIVERED",
    cancelling: "CANCELED",
  };
  function getOrdersCountByStatus(status) {
    const filteredOrders = orders.filter(
      (order) => order.orderStatus === status
    );
    const count = filteredOrders.length.toString().padStart(2, "0");
    return count;
  }
  const ordersCount = orders.length.toString().padStart(2, "0");
  const pendingOrdersCount = getOrdersCountByStatus(status.pending);
  const processingOrdersCount = getOrdersCountByStatus(status.processing);
  const deliveredOrdersCount = getOrdersCountByStatus(status.delivering);
  const orderStatus = [
    {
      title: "Total Order",
      number: ordersCount,
      iconBg: "bg-green-600",
      icon: ShoppingCart,
    },
    {
      title: "Orders Pending",
      number: pendingOrdersCount,
      iconBg: "bg-blue-600",
      icon: Loader2,
    },
    {
      title: "Order Processing",
      number: processingOrdersCount,
      iconBg: "bg-orange-600",
      icon: RefreshCcw,
    },
    {
      title: "Orders Delivered",
      number: deliveredOrdersCount,
      iconBg: "bg-purple-600",
      icon: CheckCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStatus.map((data, i) => {
        return <SmallCard data={data} key={i} />;
      })}
    </div>
  );
}
