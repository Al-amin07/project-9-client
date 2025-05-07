/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addcomment } from "@/services/posts"
import { useAuth } from "@/provider/UserProvider"
import { toast } from "sonner"

export default function AddCommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const { user } = useAuth() ?? {}

  const handleSubmit = async () => {
    if (!user || !user.id) {
      toast.error("You must be logged in to comment.")
      return
    }

    setLoading(true)
    try {
      const res = await addcomment({
        text,
        postId,
        userId: user.id,
        id: "",
      })

      if (res?.success) {
        toast.success("Comment posted successfully!")
        setText("")
      } else {
        toast.error(res?.message || "Failed to post comment.")
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred.", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" w-70 gap-2">
      <h3 className="text-lg font-semibold">Add a Comment</h3>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your comment..."
      />
      <Button className="mt-2" onClick={handleSubmit} disabled={!text.trim() || loading}>
        {loading ? "Submitting..." : "Submit Comment"}
      </Button>
    </div>
  )
}
