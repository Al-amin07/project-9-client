"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,

    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { uploadToCloudinary } from "@/components/utils/uploadToCloudinary";
import { createCategory } from "@/services/dashboard/admin";
import { ICategory } from "@/types/category.type";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export function CreateCategoryModal() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { register, handleSubmit, watch, reset, formState: { isSubmitting } } = useForm()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        const toastId = toast.loading("Creating category...")
        const files = Array.from(data.image) as File[]
        const uploadPromises = files.map((file) => uploadToCloudinary(file))
        const imageUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[]
        console.log({ imageUrls })
        if (!imageUrls.length) {
            toast.error("Image upload failed.")
            return
        }
        const categoryData: Partial<ICategory> = {
            name: data?.name,
            image: imageUrls[0]
        }
        try {
            const result = await createCategory(categoryData)
            if (result?.success) {
                toast.success("Category created successfully!", { id: toastId })
                reset()
                setImagePreview(null)
            } else {
                toast.error(result?.message || "Category not created.", { id: toastId })
            }
        } catch (error) {
            console.log(error)
        }
        console.log({ categoryData })
    }
    const watchedImage = watch("image")

    useEffect(() => {
        if (watchedImage?.length) {
            const file = watchedImage[0]
            setImagePreview(URL.createObjectURL(file))
        }
    }, [watchedImage])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border-0 text-sm cursor-pointer bg-black/85 hover:bg-black text-white rounded-lg px-2.5 py-1.5 text- flex items-center gap-1">
                    <Plus />
                    Create Category
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>

                </DialogHeader>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input {...register("name")} type="text" id="name" name="name" required
                                className="mt-1 block w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Category Image</label>
                            <input type="file" id="image" name="image" accept="image/*" required
                                className="mt-1 block w-full text-sm text-gray-700 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:border-none" />
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                            <div className="flex items-center gap-6">
                                <input
                                    {...register("image")}
                                    type="file"
                                    accept="image/*"
                                    className=" text-sm text-gray-700  file:py-1.5 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#FF6168]/10 file:text-[#FF6168] hover:file:bg-[#FF6168]/20"
                                    required
                                />
                                {imagePreview && (
                                    <Image
                                        width={50}
                                        height={50}
                                        src={imagePreview}
                                        alt="Preview"
                                        className=" rounded-md w-16 h-10 object-cover border"
                                    />
                                )}
                            </div>
                        </div>
                        <DialogClose asChild >
                            <div className="flex justify-end">
                                <Button variant={"outline"} disabled={isSubmitting} type="submit"
                                    className="  rounded-md  transition duration-200">
                                    {isSubmitting ? "Creating..." : "Create Category"}
                                </Button>
                            </div>

                        </DialogClose>
                    </form>
                </DialogContent>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
