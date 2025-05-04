"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@/types";
import { useAuth } from "@/provider/UserProvider";

const UserPostsPage = () => {
  const { user, isLoading } = useAuth() ?? {};

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post?userId=${user.id}`
        );
        setPosts(res.data.data);

        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [user?.id]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#FF3C48]">
        Your Posts
      </h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-[#FF3C48]/10">
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Premium</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: Post) => (
            <tr key={post.id} className="text-center">
              <td className="py-2 px-4 border">{post.title}</td>
              <td className="py-2 px-4 border">{post.category?.name}</td>
              <td className="py-2 px-4 border">${post.price}</td>
              <td className="py-2 px-4 border">{post.status}</td>
              <td className="py-2 px-4 border">
                {post.isPremium ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPostsPage;
