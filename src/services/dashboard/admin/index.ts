"use server";
import { generateAccessToken } from "@/services/utils";
import { revalidateTag } from "next/cache";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const getCredentials = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllUsers = async (query: { [key: string]: string }) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API}/user?`;
    if (Object.keys(query).length > 0) {
      url += new URLSearchParams(query).toString();
    }
    const res = await fetch(url, {
      next: {
        tags: ["USERS"],
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
    });
    const data = await res.json();
    if (!data?.success && data?.err?.statusCode === 403) {
      const accessToken = (await generateAccessToken()) as string;
      if (accessToken) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });
        const data = await res.json();

        return data;
      }
    }
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteUserStatus = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API}/user/${id}`;
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
    });
    const data = await res.json();
    if (!data?.success && data?.err?.statusCode === 403) {
      const accessToken = (await generateAccessToken()) as string;
      if (accessToken) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });
        const data = await res.json();
        revalidateTag("USERS");
        return data;
      }
    }
    revalidateTag("USERS");
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateUserStatus = async (
  id: string,
  userData: { status: "ACTIVE" | "BLOCKED" | "DELETED" }
) => {
  const url = `${process.env.NEXT_PUBLIC_API}/user/${id}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!data?.success && data?.err?.statusCode === 403) {
      const accessToken = (await generateAccessToken()) as string;
      if (accessToken) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });
        const data = await res.json();
        revalidateTag("USERS");
        return data;
      }
    }
    revalidateTag("USERS");
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllPosts = async (query: { [key: string]: string }) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API}/post/admin?`;
    if (Object.keys(query).length > 0) {
      url += new URLSearchParams(query).toString();
    }
    const res = await fetch(url);
    const data = await res.json();
    if (!data?.success && data?.err?.statusCode === 403) {
      const accessToken = (await generateAccessToken()) as string;
      if (accessToken) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });
        const data = await res.json();

        return data;
      }
    }
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCategories = async (query: { [key: string]: string }) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API}/category?`;
    if (Object.keys(query).length > 0) {
      url += new URLSearchParams(query).toString();
    }
    const res = await fetch(url);
    const data = await res.json();
    if (!data?.success && data?.err?.statusCode === 403) {
      const accessToken = (await generateAccessToken()) as string;
      if (accessToken) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });
        const data = await res.json();

        return data;
      }
    }
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
