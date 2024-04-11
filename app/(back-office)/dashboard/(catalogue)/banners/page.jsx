import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import Link from "next/link";
import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
export default async function page() {
  const banners = await getData("banners");
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Banners"
        href="/dashboard/banners/new"
        linkTitle="Add Banner"
      />
      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}
