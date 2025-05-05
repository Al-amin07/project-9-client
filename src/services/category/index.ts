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
