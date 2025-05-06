/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Home, BookOpen, RefreshCw } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { fetchWithAuth, isAuthenticated } from "@/lib/auth";
import { verifyPayment } from "@/lib/shurjopay";
import { motion } from "framer-motion";

type PaymentStatus = "loading" | "success" | "failed";

const VerifyPaymentPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [message, setMessage] = useState("Verifying your payment...");
  const order_id = searchParams.get("order_id");

  useEffect(() => {
    const checkPayment = async () => {
      try {
        if (!order_id) {
          setStatus("failed");
          setMessage("No order ID found. Payment verification failed.");
          return;
        }

        // Check if user is authenticated via cookies
        if (!isAuthenticated()) {
          setStatus("failed");
          setMessage("Authentication required. Please log in to verify your payment.");
          return;
        }

        // Verify payment with backend using our utility function
        const result = await verifyPayment(order_id);

        if (result.success) {
          setStatus("success");
          setMessage(result.message || "Payment successful! You now have premium access.");
          toast.success("Payment verified successfully!");
        } else {
          setStatus("failed");
          setMessage(result.message || "Payment verification failed. Please try again.");
          toast.error(result.message || "Payment verification failed");
        }
      } catch (_error) {
        setStatus("failed");
        setMessage("An error occurred while verifying your payment.");
        toast.error("Payment verification failed");
      }
    };

    checkPayment();
  }, [order_id]);

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md mx-auto"
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Colored top border */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-purple-500 to-blue-500"></div>
          
          <div className="p-6">
            {status === "loading" && (
              <div className="flex flex-col items-center py-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                  <Loader2 className="h-14 w-14 text-primary animate-spin relative z-10" />
                </div>
                <h1 className="text-xl font-bold mt-4 mb-1 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Verifying Payment</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-xs text-center">
                  Please wait while we verify your transaction...
                </p>
                <div className="w-full max-w-xs bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-purple-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center py-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-green-50 dark:bg-green-900/20 p-3 rounded-full"
                >
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </motion.div>
                <h1 className="text-xl font-bold mt-4 mb-1 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Payment Successful!</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 max-w-xs text-center">{message}</p>
                
                <div className="space-y-2 w-full">
                  <Button asChild className="w-full py-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium rounded-lg transition-all duration-200 transform hover:translate-y-[-1px]">
                    <Link href="/posts" className="flex items-center justify-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Explore Premium Content
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                    <Link href="/" className="flex items-center justify-center">
                      <Home className="mr-2 h-4 w-4" />
                      Return to Home
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 w-full">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Transaction ID: {order_id}
                  </p>
                </div>
              </div>
            )}

            {status === "failed" && (
              <div className="flex flex-col items-center py-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full"
                >
                  <XCircle className="h-12 w-12 text-red-500" />
                </motion.div>
                <h1 className="text-xl font-bold mt-4 mb-1 bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Payment Failed</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 max-w-xs text-center">{message}</p>
                
                <div className="space-y-2 w-full">
                  <Button asChild className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-500/90 hover:to-orange-600/90 text-white font-medium rounded-lg transition-all duration-200 transform hover:translate-y-[-1px]">
                    <Link href="/checkout" className="flex items-center justify-center">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                    <Link href="/" className="flex items-center justify-center">
                      <Home className="mr-2 h-4 w-4" />
                      Return to Home
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
          Secured by ShurjoPay Payment Gateway
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyPaymentPage;