"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { removeAccessToken } from "@/lib/auth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { toast } from "sonner";

export default function AuthButton() {
  const { isLoggedIn, user, isLoading } = useAuthCheck();
  const router = useRouter();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignOut = () => {
    setIsLogoutLoading(true);
    
    // Remove the token from cookies
    removeAccessToken();
    
    toast.success("Signed out successfully!");
    
    // Reload the page
    setTimeout(() => {
      setIsLogoutLoading(false);
      window.location.reload();
    }, 1000);
  };

  const handleGoToProfile = () => {
    router.push("/profile/subscription");
  };

  if (isLoading) {
    return <Button disabled>Loading...</Button>;
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={handleGoToProfile}>
          {user?.isPremium ? "Premium User" : "My Profile"}
        </Button>
        <Button variant="destructive" onClick={handleSignOut} disabled={isLogoutLoading}>
          {isLogoutLoading ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleLogin}>
      Sign In
    </Button>
  );
} 