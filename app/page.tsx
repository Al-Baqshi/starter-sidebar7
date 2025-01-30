import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  // If the user is authenticated, redirect to the dashboard
  if (userId) {
    redirect("/dashboard");
  }
  redirect("/home");
}
