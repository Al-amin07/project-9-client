import { SubscriptionPlan } from "@/types/subscription.type";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "FREE",
    name: "Free",
    price: 0,
    description: "Basic access to public street food spots",
    duration: 0,
    features: [
      { feature: "Post food discoveries", included: true },
      { feature: "Comment on food posts", included: true },
      { feature: "Rate food spots (1-5 stars)", included: true },
      { feature: "Search and filter posts", included: true },
      { feature: "Access to premium content", included: false },
    ],
  },
  {
    id: "MONTHLY",
    name: "Monthly Premium",
    price: 299,
    description: "Unlock exclusive premium food spots for 30 days",
    duration: 30,
    features: [
      { feature: "Post food discoveries", included: true },
      { feature: "Comment on food posts", included: true },
      { feature: "Rate food spots (1-5 stars)", included: true },
      { feature: "Search and filter posts", included: true },
      { feature: "Access to premium content", included: true },
    ],
  },
  {
    id: "YEARLY",
    name: "Yearly Premium",
    price: 2499,
    description: "Access all premium content for a full year (save 30%)",
    duration: 365,
    features: [
      { feature: "Post food discoveries", included: true },
      { feature: "Comment on food posts", included: true },
      { feature: "Rate food spots (1-5 stars)", included: true },
      { feature: "Search and filter posts", included: true },
      { feature: "Access to premium content", included: true },
    ],
  },
];
