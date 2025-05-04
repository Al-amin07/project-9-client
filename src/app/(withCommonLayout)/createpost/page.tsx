"use client";

import { useAuth } from "@/provider/UserProvider";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "@/components/utils/uploadToCloudinary";
import { createPost } from "@/services/posts";
import { Ipost } from "../../../types/post.type";
import { getAllCategory } from "@/services/category";

interface FormData {
  title: string;
  description: string;
  location: string;
  priceRange: string;
  price: number;
  image: FileList;
  categoryId: string;
}

const Createpost = () => {
  const { user } = useAuth()!;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        if (res?.success && Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.warn("Unexpected category response format.", res);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);
// ------------submit form data to server------------------
const onSubmit = async (data: FormData) => {
  setLoading(true);
  try {
    const files = Array.from(data.image);
    const uploadPromises = files.map((file) => uploadToCloudinary(file));
    const imageUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];

    if (!imageUrls.length) {
      alert("Image upload failed.");
      return;
    }

    const postData = {
      title: data.title,
      description: data.description,
      location: data.location,
      priceRange: data.priceRange,
      price: data.price,
      image: imageUrls[0],
      categoryId: data.categoryId,
      userId: user?.id, 
    };

    console.log("📤 Sending post data to API:", postData); 

    const result = await createPost(postData as Ipost);
    console.log("✅ Post created:", result); 

    reset();
    alert("Post created successfully!");
  } catch (err) {
    console.error("❌ Post creation failed:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* ---------title---------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter post title"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6168]"
            required
          />
        </div>
{/* ---------------description---------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Write a short description..."
            rows={4}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6168]"
            required
          />
        </div>
{/* ------------location------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              {...register("location")}
              type="text"
              placeholder="City, Country"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6168]"
              required
            />
          </div>
          {/* ------------ price------------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Enter numeric price"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6168]"
              required
            />
          </div>
        </div>
{/* ------------price range--------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            {...register("priceRange")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6168]"
            required
          >
            <option value="">Select Range</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
{/* --------------category-------------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            {...register("categoryId")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6168]"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
{/* ---------------image upload----------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#FF6168]/10 file:text-[#FF6168] hover:file:bg-[#FF6168]/20"
            multiple
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-fit p-2 bg-[#FF6168] hover:bg-[#e3555d] text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {loading ? "Uploading..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createpost;
