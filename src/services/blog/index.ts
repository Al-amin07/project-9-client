/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
export const getAllBlog = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blogs`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
