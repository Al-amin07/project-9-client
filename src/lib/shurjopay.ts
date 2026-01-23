import { fetchWithAuth, getAccessToken } from "@/lib/auth";
import {
  PaymentInitiateData,
  PaymentResponse,
  SubscriptionStatus,
} from "@/types/subscription.type";

export async function initiatePayment(
  payload: PaymentInitiateData
): Promise<PaymentResponse> {
  try {
    // Check if token exists
    const token = getAccessToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API}/subscription/payment/initiate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to initiate payment",
    };
  }
}

export async function verifyPayment(orderId: string): Promise<PaymentResponse> {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API}/subscription/payment/verify?order_id=${orderId}`
    );

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to verify payment",
    };
  }
}

export async function checkSubscriptionStatus(): Promise<
  SubscriptionStatus & { message?: string }
> {
  try {
    const token = getAccessToken();
    if (!token) {
      return { isSubscribed: false };
    }

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API}/subscription/check`
    );
    const result = await response.json();

    if (result.success && result.data) {
      return {
        isSubscribed: result.data.isSubscribed,
        premiumUntil: result.data.premiumUntil
          ? new Date(result.data.premiumUntil)
          : undefined,
        plan: result.data.plan,
        hasCancelled: result.data.hasCancelled,
        message: result.message,
      };
    }

    return { isSubscribed: false, message: result.message };
  } catch (error) {
    return {
      isSubscribed: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to check subscription status",
    };
  }
}

export async function cancelSubscription(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API}/subscription/cancel`,
      {
        method: "POST",
      }
    );

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to cancel subscription",
    };
  }
}
