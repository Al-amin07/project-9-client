/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useAuth } from "@/provider/UserProvider"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { uploadToCloudinary } from "@/components/utils/uploadToCloudinary"
import { createPost } from "@/services/posts"
// import { Ipost } from "../../../types/post.type"
import { getAllCategory } from "@/services/category"
import { toast } from "sonner"
import { IPost } from "@/types"
import { ICategory } from "@/types/category.type"
import { useRouter } from "next/navigation"
import Image from "next/image"


interface FormData {
  title: string
  description: string
  location: string
  priceRange: string
  price: number
  image: FileList
  categoryId: string
}

const Createpost = () => {
  const { user } = useAuth()!
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const route = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>()

  const watchedImage = watch("image")

  useEffect(() => {
    if (watchedImage?.length) {
      const file = watchedImage[0]
      setImagePreview(URL.createObjectURL(file))
    }
  }, [watchedImage])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory()
        if (res?.success && Array.isArray(res.data)) {
          setCategories(res.data)
        } else {
          toast.error("Invalid category response")
        }
      } catch (err: any) {
        toast.error("Failed to fetch categories", err)
      }
    }
    fetchCategories()
  }, [])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const files = Array.from(data.image)
      const uploadPromises = files.map((file) => uploadToCloudinary(file))
      const imageUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[]
      console.log({ imageUrls })
      if (!imageUrls.length) {
        toast.error("Image upload failed.")
        return
      }

      const postData: Partial<IPost> = {
        title: data.title,
        description: data.description,
        location: data.location,
        priceRange: data.priceRange,
        price: data.price || 0,
        image: imageUrls[0],
        categoryId: data.categoryId,
        userId: user?.id || ""
      }

      const result = await createPost(postData)
      console.log({ result })
      if (result?.success) {
        toast.success("Post created successfully! Wait for admin approval")
        route.push('/user/posts')
        reset()
        setImagePreview(null)
      } else {
        toast.error("Failed to create post")
      }
    } catch (err) {
      toast.error("Post creation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter post title"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6168]"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Write a short description..."
            rows={4}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6168]"
            required
          />
        </div>

        {/* Location & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              {...register("location")}
              type="text"
              placeholder="City, Country"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6168]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Enter price"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6168]"
              required
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            {...register("priceRange")}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6168]"
            required
          >
            <option value="">Select Range</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            {...register("categoryId")}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6168]"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#FF6168]/10 file:text-[#FF6168] hover:file:bg-[#FF6168]/20"
            required
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={200}
              height={200}
              className="mt-3 rounded-md w-full h-60 object-cover border"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-fit bg-[#FF6168] hover:bg-[#e3555d] text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {loading ? "Uploading..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Createpost
