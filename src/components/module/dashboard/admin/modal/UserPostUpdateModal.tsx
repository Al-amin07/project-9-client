"use client"

import {
    Dialog,

    DialogContent,

    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getAllCategory } from "@/services/category";
import { createCategory } from "@/services/dashboard/admin";
import { IPost } from "@/types";
import { ICategory } from "@/types/category.type";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export function UserPostUpdateModal({ post }: { post: IPost }) {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {
            title: post?.title,
            description: post?.description,
            category: post?.category,
            location: post?.location,
            priceRange: post?.priceRange,
            price: post?.price,
            categoryId: post?.categoryId

        }
    });
    const [categories, setCategories] = useState([])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        const toastId = toast.loading("Creating category...")
        console.log({ data })

        try {
            const result = await createCategory(data)
            if (result?.success) {
                toast.success("Category created successfully!", { id: toastId })
                reset()

            } else {
                toast.error(result?.message || "Category not created.", { id: toastId })
            }
        } catch (error) {
            console.log(error)
        }
        // console.log({ categoryData })
    }


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await getAllCategory()
                setCategories(result?.data)
            } catch (error) {
                console.log(error)
            }
        }
        console.log("Hello world")
        fetchCategory()
    }, [])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border-0 text-sm cursor-pointer hover:bg-secondary px-2.5 py-1.5 ">Update Post</span>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>

                </DialogHeader>
                <DialogContent>
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
                                {categories.map((cat: ICategory) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>



                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-fit bg-[#FF6168] hover:bg-[#e3555d] text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                {isSubmitting ? "Uploading..." : "Create Post"}
                            </button>
                        </div>
                    </form>
                </DialogContent>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
