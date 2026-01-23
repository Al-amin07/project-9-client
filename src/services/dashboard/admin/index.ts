"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { generateAccessToken } from "@/services/utils";
import { IPost } from "@/types";
import { ICategory } from "@/types/category.type";

/**
 * Helper to handle authenticated requests and automatic token refreshing.
 * Prevents repeating the retry logic in every single function.
 */
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
      ...options.headers,
    },
  };

  let response = await fetch(url, config);

  // If Forbidden, attempt to refresh token and retry ONCE
  if (!response.ok && response.status === 403) {
    const newToken = (await generateAccessToken()) as string;

    if (newToken) {
      const retryConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: newToken,
        },
      };
      response = await fetch(url, retryConfig);
    }
  }

  return response;
}

// --- USER ACTIONS ---

export const getAllUsers = async (query: Record<string, string>) => {
  try {
    const params = new URLSearchParams(query).toString();
    const url = `${process.env.NEXT_PUBLIC_API}/user?${params}`;

    const res = await authenticatedFetch(url, {
      next: { tags: ["USERS"] },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateUserStatus = async (
  id: string,
  userData: { status: "ACTIVE" | "BLOCKED" | "DELETED" },
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/user/${id}`;
    const res = await authenticatedFetch(url, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    revalidateTag("USERS", {});
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const deleteUserStatus = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/user/${id}`;
    const res = await authenticatedFetch(url, { method: "DELETE" });

    const data = await res.json();
    revalidateTag("USERS", {});
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// --- POST ACTIONS ---

export const getAllPosts = async (query: Record<string, string>) => {
  try {
    const params = new URLSearchParams(query).toString();
    const url = `${process.env.NEXT_PUBLIC_API}/post/admin?${params}`;

    const res = await authenticatedFetch(url, {
      next: { tags: ["POSTS"] },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updatePost = async (id: string, data: Partial<IPost>) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/post/${id}/update-status`;
    const res = await authenticatedFetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    revalidateTag("POSTS", {});
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// --- CATEGORY ACTIONS ---

export const getAllCategories = async (query: Record<string, string>) => {
  try {
    const params = new URLSearchParams(query).toString();
    const url = `${process.env.NEXT_PUBLIC_API}/category?${params}`;

    const res = await authenticatedFetch(url, {
      next: { tags: ["CATEGORIES"] },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const createCategory = async (categoryData: Partial<ICategory>) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/category`;
    const res = await authenticatedFetch(url, {
      method: "POST",
      body: JSON.stringify(categoryData),
    });

    const data = await res.json();
    revalidateTag("CATEGORIES", {});
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

/** Utility for generic credential fetching if needed */
export const getCredentials = async (url: string) => {
  try {
    const res = await authenticatedFetch(url);
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
