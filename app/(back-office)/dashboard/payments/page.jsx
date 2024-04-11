import { getData } from "@/lib/getData";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const data = await getData("categories");

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
