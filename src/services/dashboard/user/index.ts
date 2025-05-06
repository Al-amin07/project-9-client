/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { generateAccessToken } from "@/services/utils";
import { cookies } from "next/headers";

export const getAllPosts = async (query: { [key: string]: string }) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API}/post/user?`;

    if (Object.keys(query).length > 0) {
      url += new URLSearchParams(query).toString();
    }
    const res = await fetch(url, {
      next: {
        tags: ["POSTS"],
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
          next: {
            tags: ["USERPOSTS"],
          },
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
export const getHomePagePosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/post/all`, {
      next: {
        revalidate: 60000,
      },
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
