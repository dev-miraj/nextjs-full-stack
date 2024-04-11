import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";

import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import DataTable from "@/components/data-table-components/DataTable";

export default async function page() {
  const trainings = await getData("trainings");
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Limi Community Trainings"
        href="/dashboard/community/new"
        linkTitle="Add Training"
      />
      <div className="py-0">
        <DataTable data={trainings} columns={columns} />
      </div>
    </div>
  );
}
