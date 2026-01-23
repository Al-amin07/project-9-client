/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/category`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
export const getAllHomePageCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/category`, {
      next: { revalidate: 60000 }, // Revalidate every 60 seconds
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
