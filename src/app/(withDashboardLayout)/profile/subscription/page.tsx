/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cancelSubscription, checkSubscriptionStatus } from "@/lib/shurjopay";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

interface SubscriptionInfo {
  isSubscribed: boolean;
  premiumUntil?: Date;
  role?: string;
  hasCancelled?: boolean;
}

const SubscriptionManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    isSubscribed: false,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        setLoading(true);
        
        // First check if user is authenticated
        if (!isAuthenticated()) {
          router.push('/login?redirect=/profile/subscription');
          return;
        }
        
        const result = await checkSubscriptionStatus();
        setSubscriptionInfo(result);
      } catch (_error) {
        toast.error("Failed to load subscription details");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [router]);

  const handleCancelSubscription = async () => {
    try {
      setCancelling(true);
      const result = await cancelSubscription();

      if (result.success) {
        toast.success("Subscription cancelled successfully");
        // Update local subscription state
        setSubscriptionInfo((prev) => ({
          ...prev,
          hasCancelled: true,
        }));
      } else {
        toast.error(result.message || "Failed to cancel subscription");
      }
    } catch (_error) {
      toast.error("An error occurred while cancelling your subscription");
    } finally {
      setCancelling(false);
    }
  };

  const handleRenewSubscription = () => {
    router.push("/checkout?plan=MONTHLY");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-lg text-gray-600">Loading subscription details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-6">Subscription Management</h1>

          {subscriptionInfo.isSubscribed ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-green-700 mb-2">
                      Active Premium Subscription
                    </h2>
                    <p className="text-green-600 mb-1">
                      Your subscription is active and will {subscriptionInfo.hasCancelled ? 'expire' : 'automatically renew'} on{" "}
                      {subscriptionInfo.premiumUntil
                        ? new Date(subscriptionInfo.premiumUntil).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                      .
                    </p>
                    <p className="text-sm text-green-500">
                      Current plan: {subscriptionInfo.role === "PREMIUM" ? "Premium" : "Free"}
                    </p>
                  </div>
                  {!subscriptionInfo.hasCancelled && (
                    <Button
                      variant="outline"
                      className="mt-4 sm:mt-0 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={handleCancelSubscription}
                      disabled={cancelling}
                    >
                      {cancelling ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        "Cancel Subscription"
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {subscriptionInfo.hasCancelled && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-medium text-amber-800">
                        Your subscription has been cancelled
                      </h3>
                      <p className="text-amber-600 mt-1">
                        You will still have access to premium features until your current billing period ends.
                        After that, your account will be downgraded to the free plan.
                      </p>
                      <Button
                        className="mt-4 bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={handleRenewSubscription}
                      >
                        Renew Subscription
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Premium Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Access to premium content and exclusive food spots</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>No ads experience</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Priority customer support</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">No Active Subscription</h2>
              <p className="text-gray-600 mb-6">
                You don&apos;t have an active premium subscription. Upgrade now to access premium content and exclusive features.
              </p>
              <Button onClick={() => router.push("/checkout?plan=MONTHLY")}>
                Upgrade to Premium
              </Button>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-500">
            <p>
              If you have any questions about your subscription, please contact our customer support at{" "}
              <a href="mailto:support@streetfood.com" className="text-primary hover:underline">
                support@streetfood.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagementPage; 