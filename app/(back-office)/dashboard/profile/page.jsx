import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) return;
  const { user } = session;
  return (
    <div>
      <h2>Welcome {user?.name} </h2>
    </div>
  );
}