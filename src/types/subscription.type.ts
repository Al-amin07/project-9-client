export type SubscriptionPlanId = "FREE" | "MONTHLY" | "YEARLY";

export interface PlanFeature {
  feature: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  price: number;
  description: string;
  duration: number;
  features: PlanFeature[];
}

export interface SubscriptionStatus {
  isSubscribed: boolean;
  premiumUntil?: Date;
  plan?: SubscriptionPlanId;
  hasCancelled?: boolean;
}

export interface PaymentInitiateData {
  plan: SubscriptionPlanId;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    checkout_url: string;
    transactionId: string;
  };
}
