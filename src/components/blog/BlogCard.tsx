import { IBlog } from '@/types/blog.type'
import React from 'react'
import blogImage from '@/assets/blog.webp'
import Image from 'next/image'
export default function BlogCard({ blog }: { blog: IBlog }) {
    return (
        <div className="max-w-md bg-white rounded-2xl shadow-md overflow-hidden transition-transform  hover:shadow-lg">
            {blog?.coverImage && (
                <Image
                    src={blogImage}
                    alt={blog?.title}
                    height={300}
                    width={500}
                    className="w-full h-52 object-cover"
                />
            )}

            <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">{blog?.category}</span>
                    {blog?.isPublished ? (
                        <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Published</span>
                    ) : (
                        <span className="text-yellow-600 font-medium">Draft</span>
                    )}
                </div>

                <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{blog?.title}</h2>

                <p className="text-gray-600 text-sm line-clamp-3">{blog?.content}</p>

                {blog?.tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {blog?.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 pt-4">
                    <div>{blog?.author || "Unknown Author"}</div>
                    <div className="flex gap-4">
                        <span>👁 {blog?.views || 0}</span>
                        <span>❤️ {blog?.likes || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
