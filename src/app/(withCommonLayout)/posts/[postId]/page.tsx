// app/posts/[postId]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getSinglePost } from "@/services/posts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, Star, MessageSquare } from "lucide-react";
import AddCommentForm from "./add-comment-form";
import AddVoteForm from "./add-vote-form";
import AddRatingForm from "./add-rating-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function PostPage({ params }: { params: { postId: string } }) {
  const res = await getSinglePost(params.postId);
  if (!res?.data) notFound();

  const post = res.data;
  const upvotes = post.votes?.filter((v: any) => v.status === "UPVOTE").length || 0;
  const downvotes = post.votes?.filter((v: any) => v.status === "DOWNVOTE").length || 0;
  const averageRating =
    post.ratings?.reduce((acc: number, r: any) => acc + r.value, 0) / post.ratings.length || 0;

  return (
    <div className="container max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Post Card */}
      <Card className="overflow-hidden shadow-md">
        {/* Banner Image */}
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover brightness-110"
          />
          {post.isPremium && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-amber-500 text-white hover:bg-amber-600">Premium</Badge>
            </div>
          )}
        </div>

        {/* Card Header */}
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{post.category?.name}</Badge>
            <Badge variant="secondary">{post.priceRange}</Badge>
          </div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-muted-foreground text-sm">{post.location}</p>
        </CardHeader>

        {/* Card Content */}
        <CardContent className="space-y-6 text-base">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line text-muted-foreground">{post.description}</p>
          </div>

          <Separator />

          {/* Voting & Rating */}
          <div className="flex flex-wrap items-center gap-4 text-sm pt-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-green-600" /> {upvotes} Upvotes
            </div>
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-4 h-4 text-red-600" /> {downvotes} Downvotes
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" /> {averageRating.toFixed(1)} / 5
            </div>
          </div>

          <Separator />

          {/* Forms: Comment, Vote, Rate */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <AddCommentForm postId={post.id} />
            <AddVoteForm postId={post.id} />
            <AddRatingForm postId={post.id} />
          </div>

          {/* Comments Section */}
          {post.comments?.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-red-500" /> Comments
              </h2>
              <ul className="space-y-4">
                {post.comments.map((comment: any, idx: number) => (
                  <li
                    key={comment.id}
                    className="flex items-start gap-4 p-4 border rounded-lg bg-muted/40"
                  >
                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="user" />
                      <AvatarFallback className="bg-red-400">U</AvatarFallback>
                    </Avatar>

                    {/* Comment Body */}
                    <div className="flex-1">
                      <p className="text-base">{comment.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
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
  );
}
