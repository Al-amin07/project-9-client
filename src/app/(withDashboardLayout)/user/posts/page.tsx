"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/provider/UserProvider";
import { IPost } from "@/types";
import Image from "next/image";
import { ICategory } from "@/types/category.type";
import EditPostModal from "@/components/postModal/postmodal";

const UserPostsPage = () => {
  const { user, isLoading } = useAuth() ?? {};

  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/post?userId=${user?.id}`
      );
      setPosts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPosts();
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/category`);
        setCategories(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const openEditModal = (post: IPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#FF3C48]">
        Your Posts
      </h1>
      <table className="min-w-full border-2 border-gray-400">
        <thead className="bg-[#FF3C48]/10">
          <tr>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Premium</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: IPost) => (
            <tr key={post.id} className="text-center">
              <td className="py-2 px-4 border">
                <Image
                  src={post.image}
                  alt=""
                  width={64}
                  height={40}
                  className="rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-4 border">{post.title}</td>
              <td className="py-2 px-4 border">{post.category?.name}</td>
              <td className="py-2 px-4 border">${post.price}</td>
              <td className="py-2 px-4 border">{post.status}</td>
              <td className="py-2 px-4 border">
                {post.isPremium ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border ">
                <button
                  onClick={() => openEditModal(post)}
                  className="px-4 py-1.5 rounded-full cursor-pointer border-1 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition duration-300"
                >
                  update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedPost && (
        <EditPostModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refetch={fetchPosts}
          categories={categories}
        />
      )}
    </div>
  );
};

export default UserPostsPage;
