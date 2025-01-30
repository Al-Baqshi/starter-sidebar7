"use client";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ModeToggle } from "@/components/sidebar/mode-toogle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/nextjs";
import { Provider } from "react-redux";
import store from "@/store";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/services/users";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SignedOut>
        {/* Redirect unauthenticated users to the sign-in page */}
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
          <SignUpHandler />
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-screen">
              <div className="flex gap-3 items-center">
                <SidebarTrigger />
                <ModeToggle />
              </div>
              {children}
            </main>
          </SidebarProvider>
      </SignedIn>
    </ClerkProvider>
  );
}

// Component to handle the sign-up logic
function SignUpHandler() {
  const { user } = useUser();
  const router = useRouter();
  const [registerUser] = useRegisterUserMutation();
  useEffect(() => {
    console.log(user?.createdAt, "user.createdAt");
    console.log(user?.updatedAt, "user.updatedAt");
    if (
      user?.createdAt &&
      user?.updatedAt &&
      new Date(user?.createdAt) === new Date(user?.updatedAt)
    ) {
      // User has just signed up (createdAt equals updatedAt for new users)
      const handleSignUp = async () => {
        const response = await registerUser({
          clerkUserId: user?.id,
          email: user?.emailAddresses[0]?.emailAddress,
        });
        console.log(response, "response");
        // router.push("/profile/create");
      };

      handleSignUp();
    }
  }, [user, router]);

  return null;
}
