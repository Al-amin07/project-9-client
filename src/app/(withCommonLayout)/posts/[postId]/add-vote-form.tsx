/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import { toast } from "sonner"
import { addvote } from "@/services/posts"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { useAuth } from "@/provider/UserProvider"

export default function AddVoteForm({ postId }: { postId: string }) {
  const { user } = useAuth() ?? {}
  const [loading, setLoading] = useState(false)

  const handleVote = async (status: "UPVOTE" | "DOWNVOTE") => {
    if (!user || !user.id) {
      toast.error("You must be logged in to vote.")
      return
    }

    setLoading(true)
    try {
      const res = await addvote({
        status,
        postId,
        userId: user.id,
      })

      if (res?.success) {
        toast.success(`Thanks for your ${status === "UPVOTE" ? "upvote" : "downvote"}!`)
      } else {
        toast.error(res?.message || "Failed to submit vote.")
      }
    } catch (err: any) {
      toast.error("Something went wrong while voting.", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2 mt-6">
      <Button
        variant="outline"
        disabled={loading}
        onClick={() => handleVote("UPVOTE")}
      >
        <ThumbsUp className="w-4 h-4 mr-1" /> Upvote
      </Button>
      <Button
        variant="outline"
        disabled={loading}
        onClick={() => handleVote("DOWNVOTE")}
      >
        <ThumbsDown className="w-4 h-4 mr-1" /> Downvote
      </Button>
    </div>
  )
}
