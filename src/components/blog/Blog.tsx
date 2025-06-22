"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ChevronRight, ArrowRight, User, Tag, MessageSquare, Share2 } from "lucide-react"
import img1 from '@/assets/blog/1.jpg'
import img2 from '@/assets/blog/2.jpeg'
import img3 from '@/assets/blog//3.jpeg'
import img4 from '@/assets/blog/4.jpeg'
import img5 from '@/assets/blog/5.jpeg'
import img6 from '@/assets/blog/6.jpg'
import img7 from '@/assets/blog/7.jpeg'
import img8 from '@/assets/blog/8.avif'
import img9 from '@/assets/blog/9.jpeg'
import img10 from '@/assets/blog/Food-blog-photography.jpeg'
// Sample blog post data
const blogPosts = [
    {
        id: 1,
        title: "10 Must-Try Street Foods in Bangkok That Will Blow Your Mind",
        excerpt:
            "Discover the vibrant flavors of Bangkok's street food scene with these incredible dishes that locals love and tourists can't get enough of.",
        content: "",
        category: "Travel",
        author: "Sarah Johnson",
        date: "May 2, 2025",
        readTime: "8 min read",
        comments: 24,
        image: img1,
        featured: true,
    },
    {
        id: 2,
        title: "The History of Tacos: From Mexican Streets to Global Phenomenon",
        excerpt:
            "Explore the fascinating journey of how tacos evolved from humble street food to an international culinary sensation loved worldwide.",
        content: "",
        category: "Food History",
        author: "Miguel Rodriguez",
        date: "April 28, 2025",
        readTime: "6 min read",
        comments: 18,
        image: img2,
        featured: true,
    },
    {
        id: 3,
        title: "Street Food Safety: How to Eat Like a Local Without Getting Sick",
        excerpt:
            "Learn essential tips for enjoying street food safely while traveling, so you can experience authentic local cuisine without health concerns.",
        content: "",
        category: "Health",
        author: "Dr. Emily Chen",
        date: "April 25, 2025",
        readTime: "5 min read",
        comments: 32,
        image: img3,
        featured: false,
    },
    {
        id: 4,
        title: "The Rise of Gourmet Food Trucks: Street Food Gets an Upgrade",
        excerpt:
            "How innovative chefs are transforming street food culture with gourmet ingredients and creative techniques while keeping the casual vibe.",
        content: "",
        category: "Trends",
        author: "James Wilson",
        date: "April 22, 2025",
        readTime: "7 min read",
        comments: 15,
        image: img4,
        featured: false,
    },
    {
        id: 5,
        title: "5 Street Food Recipes You Can Easily Make at Home",
        excerpt:
            "Bring the flavors of global street food to your kitchen with these simple recipes that anyone can make with ingredients from your local supermarket.",
        content: "",
        category: "Recipes",
        author: "Lisa Chang",
        date: "April 18, 2025",
        readTime: "10 min read",
        comments: 47,
        image: img5,
        featured: false,
    },
    {
        id: 6,
        title: "How Street Food Vendors Are Embracing Sustainability",
        excerpt:
            "Innovative ways street food vendors around the world are reducing waste, using eco-friendly packaging, and sourcing ingredients sustainably.",
        content: "",
        category: "Sustainability",
        author: "Tom Green",
        date: "April 15, 2025",
        readTime: "6 min read",
        comments: 21,
        image: img6,
        featured: false,
    },
    {
        id: 7,
        title: "The Best Street Food Cities in the World, Ranked",
        excerpt:
            "Our global food experts have traveled the world to bring you the definitive ranking of cities with the most amazing street food scenes.",
        content: "",
        category: "Travel",
        author: "Marco Oliveira",
        date: "April 12, 2025",
        readTime: "9 min read",
        comments: 53,
        image: img7,
        featured: false,
    },
    {
        id: 8,
        title: "Street Food and Social Media: How TikTok Is Changing Food Tourism",
        excerpt:
            "Explore how viral street food videos on social platforms are creating food tourism booms and changing local economies around the world.",
        content: "",
        category: "Technology",
        author: "Zoe Williams",
        date: "April 8, 2025",
        readTime: "7 min read",
        comments: 29,
        image: img2,
        featured: false,
    },
]

// Popular categories
const categories = [
    { name: "Travel", count: 12 },
    { name: "Recipes", count: 8 },
    { name: "Food History", count: 6 },
    { name: "Health", count: 5 },
    { name: "Trends", count: 9 },
    { name: "Sustainability", count: 4 },
    { name: "Technology", count: 3 },
]

// Popular posts for sidebar
const popularPosts = [
    {
        id: 101,
        title: "Why Street Food Tastes Better Than Restaurant Food",
        date: "April 5, 2025",
        image: img8,
    },
    {
        id: 102,
        title: "The Psychology Behind Food Markets: Why We Love Them",
        date: "April 1, 2025",
        image: img9,
    },
    {
        id: 103,
        title: "From Street Cart to Empire: Success Stories of Street Food Vendors",
        date: "March 28, 2025",
        image: img10,
    },
]

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")

    const featuredPosts = blogPosts.filter((post) => post.featured)

    const filteredPosts = blogPosts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = activeCategory === "All" || post.category === activeCategory
        return matchesSearch && matchesCategory
    })

    const regularPosts = filteredPosts.filter((post) => !post.featured)

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Blog Header */}

            <div className="text-center mb-1 px-4 py-12">
                <h1 className="text-4xl  font-bold text-gray-900 mb-6">
                    Street Food  <span className="text-primary">Stories</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Discover the culture, history, and flavors of street food from around the world
                </p>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Search and Filter */}
                        <div className="mb-8 flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search articles..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                                <Button
                                    variant={activeCategory === "All" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveCategory("All")}
                                    className={activeCategory === "All" ? "bg-primary hover:bg-primary/90" : ""}
                                >
                                    All
                                </Button>
                                {categories.slice(0, 4).map((category) => (
                                    <Button
                                        key={category.name}
                                        variant={activeCategory === category.name ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setActiveCategory(category.name)}
                                        className={activeCategory === category.name ? "bg-orange-500 hover:bg-orange-600" : ""}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Posts */}
                        {searchQuery === "" && activeCategory === "All" && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    Featured Stories
                                    <ChevronRight className="h-5 w-5 ml-2" />
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {featuredPosts.map((post) => (
                                        <Card key={post.id} className="overflow-hidden h-full py-0 hover:shadow-md transition-shadow">
                                            <div className="relative">
                                                <Image
                                                    src={post.image || "/placeholder.svg"}
                                                    alt={post.title}
                                                    width={800}
                                                    height={450}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <Badge className="absolute rounded-full top-2 right-2 bg-primary">{post.category}</Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-bold text-xl mb-2 line-clamp-2">
                                                    <Link href={`/blogs/${post.id}`} className="hover:text-primary transition-colors">
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {post.date}
                                                    <Clock className="h-4 w-4 ml-4 mr-1" />
                                                    {post.readTime}
                                                </div>
                                            </CardContent>

                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Regular Posts */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                {searchQuery || activeCategory !== "All" ? "Search Results" : "Latest Articles"}
                                <ChevronRight className="h-5 w-5 ml-2" />
                            </h2>

                            {regularPosts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-8">
                                    {regularPosts.map((post) => (
                                        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow py-0">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="md:w-1/3">
                                                    <Image
                                                        src={post.image || "/placeholder.svg"}
                                                        alt={post.title}
                                                        width={800}
                                                        height={450}
                                                        className="w-full h-48 md:h-full object-cover"
                                                    />
                                                </div>
                                                <div className="md:w-2/3 p-6">
                                                    <Badge className="mb-3 bg-primary rounded-full">{post.category}</Badge>
                                                    <h3 className="font-bold text-xl mb-2">
                                                        <Link href={`/blogs/${post.id}`} className="hover:text-primary transition-colors">
                                                            {post.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                                                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                                                        <User className="h-4 w-4 mr-1" />
                                                        {post.author}
                                                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                                                        {post.date}
                                                        <Clock className="h-4 w-4 ml-4 mr-1" />
                                                        {post.readTime}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Link
                                                            href={`/blogs/${post.id}`}
                                                            className="text-orange-500 font-medium flex items-center hover:text-primary transition-colors"
                                                        >
                                                            Read More
                                                            <ArrowRight className="h-4 w-4 ml-1" />
                                                        </Link>
                                                        <div className="ml-auto flex items-center gap-4 text-muted-foreground">
                                                            <div className="flex items-center">
                                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                                {post.comments}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Share2 className="h-4 w-4 mr-1" />
                                                                Share
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                    <p className="text-lg text-muted-foreground mb-4">No articles found matching your criteria.</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchQuery("")
                                            setActiveCategory("All")
                                        }}
                                    >
                                        Reset Filters
                                    </Button>
                                </div>
                            )}

                            {/* Load More Button */}
                            {regularPosts.length > 0 && (
                                <div className="mt-8 text-center">
                                    <Button size="lg" variant="outline">
                                        Load More Articles
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* About Blog */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-3">About Our Blog</h3>
                                <p className="text-muted-foreground mb-4">
                                    Street Food Stories is your guide to the world&apos;s most delicious street food. We share recipes, travel
                                    tips, vendor stories, and the cultural significance behind every bite.
                                </p>
                                <Button className="w-full bg-primary/80 hover:bg-primary">Subscribe to Updates</Button>
                            </CardContent>
                        </Card>

                        {/* Popular Posts */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
                                <div className="space-y-4">
                                    {popularPosts.map((post) => (
                                        <div key={post.id} className="flex gap-3">
                                            <Image
                                                src={post.image || "/placeholder.svg"}
                                                alt={post.title}
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <div>
                                                <h4 className="font-medium line-clamp-2 mb-1">
                                                    <Link href={`/blogs/${post.id}`} className="hover:text-primary transition-colors">
                                                        {post.title}
                                                    </Link>
                                                </h4>
                                                <p className="text-sm text-muted-foreground">{post.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Categories */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <div
                                            key={category.name}
                                            className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={() => setActiveCategory(category.name)}
                                        >
                                            <div className="flex items-center">
                                                <Tag className="h-4 w-4 mr-2 text-orange-500" />
                                                {category.name}
                                            </div>
                                            <Badge variant="outline">{category.count}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Newsletter Signup */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-3">Newsletter</h3>
                                <p className="text-muted-foreground mb-4">
                                    Subscribe to our newsletter and never miss out on new street food discoveries and stories.
                                </p>
                                <div className="space-y-3">
                                    <Input placeholder="Your email address" />
                                    <Button className="w-full bg-primary/80 hover:bg-primary">Subscribe</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
