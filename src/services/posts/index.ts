
"use server";

import { IPost } from "@/types";
import { IComment } from "@/types/comment.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { IRating } from '../../types/rating.type';
import { IVote } from "@/types/vote.type";

// get all products
// lib/api.ts
export const getAllposts = async (
  page?: string,
  limit?: string,
  query: { [key: string]: string | undefined } = {}
) => {
  const params = new URLSearchParams()

  if (query.searchTerm) params.append("searchTerm", query.searchTerm)
  if (query.category) params.append("category", query.category)
  if (query.location) params.append("location", query.location)
  if (query.minPrice) params.append("minPrice", query.minPrice)
  if (query.maxPrice) params.append("maxPrice", query.maxPrice)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/post?page=${page}&limit=${limit}&${params}`)
  const data = await res.json()
  return data
}



// get single product
export const getSinglePost = async (postId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/post/${postId}`,
      {
        next: {
          tags: ["POST"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// ------------ add product -----------
export const createPost = async (postData:IPost): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/post`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
       

      },
    });
    revalidateTag("POST");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// ------------ update product --------------
export const updatePost = async (
  postData: IPost,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/${productId}`,
      {
        method: "PATCH",
        body: JSON.stringify(postData),
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("POST");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
// ------------add comment----------
export const addcomment = async (commentData:IComment): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
       

      },
    });
    revalidateTag("COMMENT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// ------------get all comments----------

export const getComment = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/comments`, {
      cache: "no-store", 
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
// ------------add rating----------
export const addrating = async (commentData:IRating): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/rating`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
       

      },
    });
    revalidateTag("RATING");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
// ------------add vOTE----------
export const addvote = async (voteData:IVote): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/vote`, {
      method: "POST",
      body: JSON.stringify(voteData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
       

      },
    });
    revalidateTag("VOTE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};