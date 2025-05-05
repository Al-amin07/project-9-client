"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IPost } from "@/types";
import { ICategory } from "@/types/category.type";

interface Props {
  post: IPost;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  categories: ICategory[];
}

const EditPostModal: React.FC<Props> = ({
  post,
  isOpen,
  onClose,
  refetch,
  categories,
}) => {
  const [formData, setFormData] = useState({
    title: post.title,
    price: post.price,
    image: post.image,
    categoryId: post.categoryId,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        price: post.price,
        image: post.image,
        categoryId: post.categoryId,
      });
    }
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/post/user/${post.id}`,
        formData
      );
      refetch();
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md pointer-events-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Post</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Title"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Price"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Image URL"
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex justify-between mt-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-1.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition duration-300"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border-2 border-gray-300 text-gray-600 hover:bg-gray-200 font-semibold transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
