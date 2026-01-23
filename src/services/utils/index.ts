"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const generateAccessToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/generate-access-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")?.value as string,
        },
      }
    );
    const data = await res.json();
    return data?.data?.accessToken;
  } catch (error: any) {
    return Error(error);
  }
};
