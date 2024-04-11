import CustomerForm from "@/components/backoffice/CustomerForm";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";

import React from "react";

export default async function UpdateCustomer({ params: { id } }) {
  const user = await getData(`users/${id}`);
  return (
    <div>
      <FormHeader title="Update Customer" />
      <CustomerForm user={user} />
    </div>
  );
}
