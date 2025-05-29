/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

import { getAllposts } from "@/services/posts"
import { getAllCategory } from "@/services/category"
import { IPost } from "@/types"
import { ICategory } from "@/types/category.type"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PuffLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"


const POSTS_PER_PAGE = 6

export default function PostsPage() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [allCategories, setAllCategories] = useState<ICategory[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)


  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  // 🔄 Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory()

        setAllCategories(res?.data || [])
      } catch (err: any) {
        console.error("Failed to load categories", err)
      }
    }
    fetchCategories()
  }, [])

  // 🔄 Fetch Posts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await getAllposts(String(currentPage), String(POSTS_PER_PAGE), {
        searchTerm,
        category,
        location,
        minPrice,
        maxPrice,
      })
      console.log(res)
      setPosts(res?.data || [])
      setTotalPages(Math.ceil((res?.meta?.total || 1) / POSTS_PER_PAGE))
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  // 🔁 Re-fetch when filters or page change
  useEffect(() => {
    fetchPosts()
  }, [searchTerm, category, location, minPrice, maxPrice, currentPage])

  const handleFilter = () => {
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setCategory("")
    setLocation("")
    setMinPrice("")
    setMaxPrice("")
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Explore Posts</h1>
            <p className="text-muted-foreground">Discover amazing items and services from our community.</p>
          </div>
          <Link
            href="/createpost"

          >
            <Button variant={'default'}>Create New Post</Button>

          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-1/2 flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts by title, category, or location..."
              className="flex-grow p-2 border border-gray-300 rounded-md text-sm"
            />
            <Button variant={'default'} onClick={handleFilter}>Search</Button>
          </div>
          <Button onClick={resetFilters} variant='outline'>Reset</Button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <aside className="w-full dark:text-gray-600  lg:w-1/4 border p-4 rounded-md shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full p-1 border rounded text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full p-1 border rounded text-sm"
            >
              <option value="">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 border rounded p-1 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 border rounded p-1 text-sm"
              />
            </div>
          </div>


          <Button onClick={handleFilter} className="w-full" variant={'destructive'}>Apply Filters</Button>
        </aside>

        {/* Posts */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading ? (
              <div className=' min-h-[500px]  w-full flex justify-center items-center col-span-1 sm:col-span-2 xl:col-span-3'>
                <PuffLoader
                  color="#FF3C48"
                  size={100}
                  speedMultiplier={1}
                />
              </div>
            ) : posts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              posts?.map((post) => (
                <Link href={`/posts/${post.id}`} key={post?.id} className="group">
                  <Card className="overflow-hidden py-0 h-full transition-all hover:shadow-md">
                    <div className="relative aspect-video">
                      <Image
                        src={post?.image || "/placeholder.svg"}
                        alt={post?.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        {post.isPremium && (
                          <Badge variant="default" className=" text-white hover:bg-primary/90">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="px-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{post?.category?.name}</Badge>
                        <span className="font-semibold text-muted-foreground text-sm">{post?.price} TK</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 line-clamp-1">{post?.title}</h2>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-1">{post?.description}</p>
                    </CardContent>
                    <CardFooter className=" pt-0 px-3 pb-4 flex justify-between items-center">
                      <Badge variant="secondary">{post?.priceRange}</Badge>
                      <span className="font-semibold text-muted-foreground text-sm">{post?.location?.slice(0, 25)}</span>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {
            !loading && <div className="flex justify-center items-center mt-6 gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-3 py-1 rounded bg-transparent text-black hover:bg-primary hover:text-white transition-colors duration-300 `}
              >
                <ArrowLeft />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-1.5 rounded border  ${currentPage === i + 1 ? "bg-primary text-white" : "bg-transparent text-black hover:bg-primary hover:text-white"}
                }`}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-3 py-1 rounded bg-transparent text-black hover:bg-primary hover:text-white transition-colors duration-300 `}
              >
                <ArrowRight />
              </Button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
