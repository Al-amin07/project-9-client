"use client"

import { useAuth } from "@/provider/UserProvider"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { uploadToCloudinary } from "@/components/utils/uploadToCloudinary"
import { createPost } from "@/services/posts"
import { IPost } from "../../../types/post.type"
import { getAllCategory } from "@/services/category"
import { toast } from "sonner"

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
  const [imageFiles, setImageFiles] = useState<File[]>([])

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
      const filesArray = Array.from(watchedImage)
      setImageFiles(filesArray)
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
      } catch (err) {
        toast.error("Failed to fetch categories")
      }
    }
    fetchCategories()
  }, [])

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageChange = (files: FileList | null) => {
    if (!files) return
    const fileArray = Array.from(files)
    setImageFiles(fileArray)
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const files = imageFiles
      const uploadPromises = files.map((file) => uploadToCloudinary(file))
      const imageUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[]

      if (!imageUrls.length) {
        toast.error("Image upload failed.")
        return
      }

      const postData: IPost = {
        title: data.title,
        description: data.description,
        location: data.location,
        priceRange: data.priceRange,
        price: data.price || 0,
        image: imageUrls[0],
        categoryId: data.categoryId,
        userId: user?.id || "",
      }

      const result = await createPost(postData)
      if (result?.success) {
        toast.success("Post created successfully!")
        reset()
        setImageFiles([])
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files)}
              className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imageFiles.length === 0 && (
              <p className="text-red-500 text-sm">At least one image is required</p>
            )}
            <div className="flex flex-wrap gap-4">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative group w-28 h-28">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

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
