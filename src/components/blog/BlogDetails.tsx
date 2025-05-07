"use client"
import img1 from "@/assets/blog/12.webp"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import img2 from "@/assets/blog/2.jpeg"
import img3 from "@/assets/blog/3.jpeg"
import img4 from "@/assets/blog/3.jpg"
import {
    Calendar,
    Clock,
    User,
    MessageSquare,
    Facebook,
    Twitter,
    Linkedin,
    Link2,
    ThumbsUp,
    ChevronLeft,
    ChevronRight,
    Send,
    BookmarkPlus,
} from "lucide-react"

// Sample blog post data
const blogPost = {
    id: 1,
    title: "10 Must-Try Street Foods in Bangkok That Will Blow Your Mind",
    excerpt:
        "Discover the vibrant flavors of Bangkok's street food scene with these incredible dishes that locals love and tourists can't get enough of.",
    category: "Travel",
    tags: ["Bangkok", "Thailand", "Asian Cuisine", "Food Tourism", "Travel Tips"],
    author: {
        name: "Sarah Johnson",
        role: "Food & Travel Writer",
        bio: "Sarah is a culinary explorer who has traveled to over 40 countries documenting street food culture. She holds a culinary degree from Le Cordon Bleu and previously worked as a chef before becoming a full-time food writer.",
        image: "/placeholder.svg?height=200&width=200",
    },
    date: "May 2, 2025",
    readTime: "8 min read",
    comments: 24,
    likes: 87,
    image: img1,
    featured: true,
}

// Sample related posts
const relatedPosts = [
    {
        id: 2,
        title: "The History of Tacos: From Mexican Streets to Global Phenomenon",
        excerpt:
            "Explore the fascinating journey of how tacos evolved from humble street food to an international culinary sensation loved worldwide.",
        category: "Food History",
        author: "Miguel Rodriguez",
        date: "April 28, 2025",
        image: img2,
    },
    {
        id: 7,
        title: "The Best Street Food Cities in the World, Ranked",
        excerpt:
            "Our global food experts have traveled the world to bring you the definitive ranking of cities with the most amazing street food scenes.",
        category: "Travel",
        author: "Marco Oliveira",
        date: "April 12, 2025",
        image: img3,
    },
    {
        id: 5,
        title: "5 Street Food Recipes You Can Easily Make at Home",
        excerpt:
            "Bring the flavors of global street food to your kitchen with these simple recipes that anyone can make with ingredients from your local supermarket.",
        category: "Recipes",
        author: "Lisa Chang",
        date: "April 18, 2025",
        image: img4,
    },
]

// Sample comments
const comments = [
    {
        id: 1,
        user: {
            name: "Alex Thompson",
            image: "/placeholder.svg?height=100&width=100",
        },
        date: "May 3, 2025",
        content:
            "I visited Bangkok last year and tried most of these! The Pad Thai from the street vendors was so much better than any restaurant version I've had. Great article!",
        likes: 12,
        replies: [
            {
                id: 2,
                user: {
                    name: "Sarah Johnson",
                    image: blogPost.author.image,
                },
                date: "May 3, 2025",
                content:
                    "Thanks Alex! I completely agree - there's something special about street Pad Thai. The vendors have perfected their recipes over decades!",
                likes: 3,
            },
        ],
    },
    {
        id: 3,
        user: {
            name: "Priya Patel",
            image: "/placeholder.svg?height=100&width=100",
        },
        date: "May 4, 2025",
        content:
            "I'm planning a trip to Bangkok next month and this is exactly what I needed! Do you have any recommendations for vegetarian street food options there?",
        likes: 8,
        replies: [],
    },
]

export default function BlogPostDetail() {
    const [commentText, setCommentText] = useState("")

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Blog Post Header */}
            <div className="bg-primary/80 text-white py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center text-white/90 hover:text-white mb-4">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back to all articles
                        </Link>
                        <Badge className="mb-4 bg-white text-orange-600">{blogPost.category}</Badge>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{blogPost.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                            <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-2 border-2 border-white">
                                    <AvatarImage src={blogPost.author.image || "/placeholder.svg"} alt={blogPost.author.name} />
                                    <AvatarFallback>{blogPost.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{blogPost.author.name}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {blogPost.date}
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {blogPost.readTime}
                            </div>
                            <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {blogPost.comments} comments
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="container mx-auto px-4 -mt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={blogPost.image || "/placeholder.svg"}
                            alt={blogPost.title}
                            width={1200}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Social Sharing Sidebar */}
                        <div className="lg:w-16 order-2 lg:order-1">
                            <div className="lg:sticky lg:top-24 flex lg:flex-col gap-4 justify-center mb-8 lg:mb-0">
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <ThumbsUp className="h-5 w-5 text-orange-500" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Facebook className="h-5 w-5 text-blue-600" />
                                    <span className="sr-only">Share on Facebook</span>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Twitter className="h-5 w-5 text-sky-500" />
                                    <span className="sr-only">Share on Twitter</span>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Linkedin className="h-5 w-5 text-blue-700" />
                                    <span className="sr-only">Share on LinkedIn</span>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Link2 className="h-5 w-5 text-gray-600" />
                                    <span className="sr-only">Copy link</span>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <BookmarkPlus className="h-5 w-5 text-gray-600" />
                                    <span className="sr-only">Save</span>
                                </Button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:flex-1 order-1 lg:order-2">
                            {/* Article Content */}
                            <div className="prose prose-lg max-w-none">
                                <p className="text-xl font-medium text-gray-700 mb-6">
                                    Bangkok is a paradise for food lovers, offering an incredible array of flavors, textures, and aromas
                                    on virtually every street corner. From spicy soups to sweet desserts, the street food scene in
                                    Thailand&apos;s capital is unmatched in its diversity and authenticity.
                                </p>

                                <p>
                                    As you navigate the bustling streets of Bangkok, you&apos;ll find that some of the most memorable culinary
                                    experiences come not from high-end restaurants, but from humble street vendors who have perfected
                                    their signature dishes over generations. These culinary artisans create masterpieces using simple
                                    equipment and fresh ingredients, often cooking right before your eyes.
                                </p>

                                <h2>1. Pad Thai</h2>
                                <p>
                                    No list of Thai street food would be complete without mentioning Pad Thai. This iconic stir-fried
                                    noodle dish is a perfect balance of sweet, sour, and savory flavors. The best versions are cooked over
                                    high heat in a well-seasoned wok, giving the dish its characteristic smoky aroma known as &quot;wok hei.&quot;
                                </p>
                                <p>
                                    <strong>Where to find it:</strong> Thip Samai on Maha Chai Road is often cited as having the best Pad
                                    Thai in Bangkok, with lines forming well before they open at 5 PM.
                                </p>

                                <h2>2. Som Tam (Green Papaya Salad)</h2>
                                <p>
                                    This refreshing yet fiery salad is made by pounding shredded unripe papaya with a mortar and pestle,
                                    mixing it with lime juice, fish sauce, palm sugar, chili, and various other ingredients. The result is
                                    a perfect balance of sweet, sour, salty, and spicy flavors that exemplify Thai cuisine.
                                </p>
                                <p>
                                    <strong>Where to find it:</strong> Som Tam stalls are ubiquitous throughout Bangkok, but for an
                                    authentic experience, head to Som Tam Jay So in the Siam Square area.
                                </p>

                                <h2>3. Moo Ping (Grilled Pork Skewers)</h2>
                                <p>
                                    These marinated pork skewers are grilled over charcoal until caramelized and smoky. The marinade
                                    typically includes garlic, coriander root, pepper, and coconut milk, creating a sweet and savory
                                    flavor profile that&apos;s irresistible, especially when paired with sticky rice.
                                </p>

                                <blockquote>
                                    <blockquote>
                                        &quot;The secret to great street food is simplicity and freshness. Bangkok&apos;s vendors understand that
                                        quality ingredients, cooked with care, need little embellishment.&quot; — Chef David Thompson
                                    </blockquote>
                                </blockquote>

                                <h2>4. Boat Noodles (Kuay Teow Reua)</h2>
                                <p>
                                    These intensely flavored noodle soups were traditionally sold from boats in Bangkok&apos;s canals. The
                                    broth is rich and complex, often containing pork or beef, blood, herbs, and spices. The small serving
                                    size (traditionally in a tiny bowl) allows you to try multiple variations.
                                </p>

                                <h2>5. Mango Sticky Rice</h2>
                                <p>
                                    This beloved dessert combines sweet glutinous rice with fresh mango and coconut cream. The contrast
                                    between the warm, chewy rice and the cool, juicy mango creates a dessert that&apos;s greater than the sum
                                    of its parts.
                                </p>

                                <h3>Tips for Enjoying Bangkok Street Food Safely</h3>
                                <ul>
                                    <li>Look for busy stalls with high turnover – this ensures freshness</li>
                                    <li>Watch how the food is handled and prepared</li>
                                    <li>Bring hand sanitizer or wet wipes for before and after eating</li>
                                    <li>Start with small portions to see how your stomach reacts</li>
                                    <li>
                                        Drink bottled water, but don&apos;t fear ice from reputable vendors (it&apos;s usually factory-produced)
                                    </li>
                                </ul>

                                <p>
                                    Bangkok&apos;s street food scene is constantly evolving, but these classics remain at the heart of the
                                    city&apos;s culinary identity. Whether you&apos;re a first-time visitor or a seasoned traveler, these dishes
                                    offer an authentic taste of Thai culture and hospitality.
                                </p>

                                <p>
                                    Have you tried any of these dishes in Bangkok? Or do you have other favorites that didn&apos;t make our
                                    list? Let us know in the comments below!
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="mt-8 flex flex-wrap gap-2">
                                {blogPost.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-sm">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Author Bio */}
                            <Card className="mt-12">
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src={blogPost.author.image || "/placeholder.svg"} alt={blogPost.author.name} />
                                            <AvatarFallback>{blogPost.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-bold">{blogPost.author.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-2">{blogPost.author.role}</p>
                                            <p className="text-muted-foreground">{blogPost.author.bio}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Post Navigation */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link
                                    href="/blog/previous-post"
                                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                                >
                                    <ChevronLeft className="h-5 w-5 mr-2" />
                                    <div>
                                        <div className="text-sm text-muted-foreground">Previous Article</div>
                                        <div className="font-medium">The History of Tacos: From Mexican Streets to Global Phenomenon</div>
                                    </div>
                                </Link>
                                <Link
                                    href="/blog/next-post"
                                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-end text-right"
                                >
                                    <div>
                                        <div className="text-sm text-muted-foreground">Next Article</div>
                                        <div className="font-medium">Street Food Safety: How to Eat Like a Local Without Getting Sick</div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 ml-2" />
                                </Link>
                            </div>

                            {/* Comments Section */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

                                {/* Comment Form */}
                                <div className="mb-8">
                                    <Textarea
                                        placeholder="Share your thoughts..."
                                        className="mb-3 min-h-[100px]"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                    <Button className="bg-orange-500 hover:bg-orange-600">
                                        <Send className="h-4 w-4 mr-2" />
                                        Post Comment
                                    </Button>
                                </div>

                                {/* Comments List */}
                                <div className="space-y-6">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="border-b pb-6">
                                            <div className="flex gap-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={comment.user.image || "/placeholder.svg"} alt={comment.user.name} />
                                                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-medium">{comment.user.name}</h4>
                                                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                                                    </div>
                                                    <p className="text-gray-700 mb-2">{comment.content}</p>
                                                    <div className="flex items-center gap-4">
                                                        <button className="text-sm text-muted-foreground hover:text-gray-900 flex items-center">
                                                            <ThumbsUp className="h-4 w-4 mr-1" />
                                                            Like ({comment.likes})
                                                        </button>
                                                        <button className="text-sm text-muted-foreground hover:text-gray-900 flex items-center">
                                                            <MessageSquare className="h-4 w-4 mr-1" />
                                                            Reply
                                                        </button>
                                                    </div>

                                                    {/* Replies */}
                                                    {comment.replies.length > 0 && (
                                                        <div className="mt-4 ml-6 space-y-4">
                                                            {comment.replies.map((reply) => (
                                                                <div key={reply.id} className="flex gap-3">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarImage src={reply.user.image || "/placeholder.svg"} alt={reply.user.name} />
                                                                        <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <h5 className="font-medium">{reply.user.name}</h5>
                                                                            <span className="text-xs text-muted-foreground">{reply.date}</span>
                                                                        </div>
                                                                        <p className="text-gray-700 text-sm mb-1">{reply.content}</p>
                                                                        <button className="text-xs text-muted-foreground hover:text-gray-900 flex items-center">
                                                                            <ThumbsUp className="h-3 w-3 mr-1" />
                                                                            Like ({reply.likes})
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            <div className="container mx-auto px-4 mt-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map((post) => (
                            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow py-0">
                                <div className="relative">
                                    <Image
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-48 object-cover"
                                    />
                                    <Badge className="absolute top-2 right-2 bg-orange-500">{post.category}</Badge>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                        <Link href={`/blogs/${post.id}`} className="hover:text-primary transition-colors">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <User className="h-4 w-4 mr-1" />
                                        {post.author}
                                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                                        {post.date}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
