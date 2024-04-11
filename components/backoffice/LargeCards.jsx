import React from "react";
import LargeCard from "./LargeCard";
export default function LargeCards({ sales }) {
  const today = new Date();
  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const todaySales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.toDateString() === today.toDateString();
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  const thisWeekSales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisWeekStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  const thisMonthSales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisMonthStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);
  console.log(todaySales, thisWeekSales, thisMonthSales);
  const totalSales =
    sales.reduce((acc, item) => acc + item.total, 0).toFixed(2) ?? 0;
  const orderStats = [
    {
      period: "Today sales",
      sales: todaySales,
      color: "bg-green-600",
    },
    {
      period: "This week Sales",
      sales: thisWeekSales,
      color: "bg-blue-600",
    },
    {
      period: "This Month",
      sales: thisMonthSales,
      color: "bg-orange-600",
    },
    {
      period: "All-Time Sales",
      sales: totalSales,
      color: "bg-purple-600",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStats.map((item, i) => {
        return <LargeCard className="bg-green-600" data={item} key={i} />;
      })}
    </div>
  );
}
