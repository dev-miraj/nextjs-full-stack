import { signOut } from "next-auth/react";

const { useRouter } = require("next/navigation");

export default async function handleLogout() {
  const router = useRouter();
  await signOut();
  router.push("/");
}
