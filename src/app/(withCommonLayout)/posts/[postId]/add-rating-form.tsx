/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Star } from "lucide-react"
import { addrating } from "@/services/posts"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/provider/UserProvider"

export default function AddRatingForm({ postId }: { postId: string }) {
  const [value, setValue] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth() ?? {}

  const handleSubmit = async () => {
    if (!user || !user.id) {
      toast.error("You must be logged in to rate.")
      return
    }

    setLoading(true)
    try {
      const res = await addrating({
        value,
        postId,
        userId: user.id,
      })

      if (res?.success) {
        toast.success("Thanks for rating!")
        setValue(0)
      } else {
        toast.error(res?.message || "Failed to submit rating.")
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred.", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-2">Rate this post</h3>
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setValue(star)}
            className="text-yellow-500 hover:scale-110 transition-transform"
          >
            <Star
              size={24}
              fill={value >= star ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={value < 1 || loading}>
        {loading ? "Submitting..." : "Submit Rating"}
      </Button>
    </div>
  )
}
