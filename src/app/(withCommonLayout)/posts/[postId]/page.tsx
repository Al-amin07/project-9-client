// app/posts/[postId]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import { getSinglePost } from "@/services/posts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PostStatusBadge } from "./post-status-badge"
import { ThumbsUp, ThumbsDown, Star } from "lucide-react"
import AddCommentForm from "./add-comment-form"
import AddVoteForm from "./add-vote-form"
import AddRatingForm from "./add-rating-form"
import { MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function PostPage({ params }: { params: { postId: string } }) {
  const res = await getSinglePost(params.postId)
  if (!res || res instanceof Error) return notFound()
  const post = res.data

  const upvotes = post.votes?.filter((v: any) => v.status === "UPVOTE").length || 0
  const downvotes = post.votes?.filter((v: any) => v.status === "DOWNVOTE").length || 0
  const averageRating =
    post.ratings?.reduce((acc: number, r: any) => acc + r.value, 0) / post.ratings.length || 0

  return (
    <div className="container py-8">
      <Card>
        <div className="relative h-[300px] sm:h-[400px]">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <PostStatusBadge status={post.status} />
            {post.isPremium && (
              <Badge variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600">
                Premium
              </Badge>
            )}
          </div>
        </div>

        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{post.category?.name}</Badge>
            <Badge variant="secondary">{post.priceRange}</Badge>
          </div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-muted-foreground">{post.location}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line text-muted-foreground">{post.description}</p>
          </div>

          <Separator />

          {/* Voting & Rating Info */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <ThumbsUp className="w-4 h-4 text-green-600" /> {upvotes} Upvotes
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ThumbsDown className="w-4 h-4 text-red-600" /> {downvotes} Downvotes
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-yellow-500" /> {averageRating.toFixed(1)} / 5
            </div>
          </div>

         
          <Separator />

          {/* Add Comment/Rating/Vote Forms */}
         <div className="flex  justify-between items-center gap-4 mt-4">
         <AddCommentForm postId={post.id} />
         <AddVoteForm postId={post.id} />
         <AddRatingForm postId={post.id} />
         </div>
         
         

          <Separator />

     
           {/* Display Comments */}
           {post.comments?.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
      <MessageSquare className="w-5 h-5 text-red-500" />
      All Comments
    </h2>
    <ul className="space-y-4">
      {post.comments.map((comment: any, idx: number) => (
        <li
          key={comment.id}
          className="flex items-start gap-4 bg-muted p-4 rounded-lg shadow-sm border"
        >
          {/* Avatar - use fallback if not available */}
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt="user" />
            <AvatarFallback className="bg-red-500">U</AvatarFallback>
          </Avatar>

          {/* Comment Body */}
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">{comment.text}</div>
            <p className="text-xs text-gray-500 mt-1">
              Posted on{" "}
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {idx !== post.comments.length - 1 && <Separator className="mt-3" />}
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

        </CardContent>

        <CardFooter />
      </Card>
    </div>
  )
}
