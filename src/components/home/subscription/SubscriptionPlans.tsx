"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuthCheck from "@/hooks/useAuthCheck";
import { FiCheck, FiX } from "react-icons/fi";
import { subscriptionPlans } from "@/data/subscriptionPlans";
import { motion } from "framer-motion";
import { RiVipCrownFill } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import TextSizer from "@/components/shared/TextSizer";

const SubscriptionPlans = () => {
  const { isLoggedIn } = useAuthCheck();
  const router = useRouter();

  const handleSubscribe = (planId: string) => {
    // Check if user is authenticated
    if (!isLoggedIn) {
      toast.error("Please log in to subscribe");
      router.push("/login?redirect=subscription");
      return;
    }

    if (planId === "FREE") {
      toast.info("You're already on the free plan!");
      return;
    }

    // Redirect to payment page with plan info
    router.push(`/checkout?plan=${planId}`);
  };

  return (
    <section className="py-10 sm:py-14 md:py-16  dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center"
        >
          <div className="inline-block mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <BsStars className="mr-1" /> Unlock Premium Features
            </span>
          </div>
          <TextSizer title="Choose Your Perfect Plan" desc="Discover exclusive street food spots that only premium members can
            access. Upgrade to unlock all premium content and hidden gems." />
        </motion.div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              key={plan.id}
              className={`flex flex-col p-5 sm:p-6 rounded-2xl shadow-xl ${plan.id === "MONTHLY"
                ? "border-2 border-primary relative bg-gradient-to-b from-white to-primary/5 dark:from-gray-800 dark:to-primary/10 transform scale-105 z-10"
                : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                } transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              {plan.id === "MONTHLY" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold py-1 px-4 rounded-full flex items-center shadow-lg">
                  <RiVipCrownFill className="mr-1" /> MOST POPULAR
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {plan.description}
                </p>

                <div className="mt-2 mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    ৳{plan.price}
                  </span>
                  {plan.duration > 0 && (
                    <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm">
                      /{plan.duration === 30 ? "month" : "year"}
                    </span>
                  )}
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4"></div>

                <ul className="mb-5 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div
                        className={`${feature.included
                          ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                          } rounded-full p-1 mr-2 flex-shrink-0`}
                      >
                        {feature.included ? (
                          <FiCheck size={14} />
                        ) : (
                          <FiX size={14} />
                        )}
                      </div>
                      <span
                        className={`text-xs sm:text-sm ${feature.included
                          ? "text-gray-800 dark:text-gray-200 font-medium"
                          : "text-gray-500 dark:text-gray-400"
                          }`}
                      >
                        {feature.feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() => handleSubscribe(plan.id)}
                variant={plan.id === "FREE" ? "outline" : "default"}
                className={`w-full cursor-pointer text-sm sm:text-base py-2 rounded-xl font-medium transition-all duration-300 ${plan.id === "MONTHLY"
                  ? "bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:shadow-primary/20"
                  : plan.id === "FREE"
                    ? "border-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    : "hover:shadow-md"
                  }`}
              >
                {plan.id === "FREE" ? "Current Plan" : "Subscribe Now"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
