'use client'
import { useAuth } from "@/provider/UserProvider";
import { getComment } from "@/services/posts";
import { useEffect, useState } from "react";

interface CommentType {
  id: string;
  text: string;
  userId: string;
  postId: string;
  createdAt: string;
}
const userComment = () => {
  const {user}=useAuth()!;
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('user',user)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComment();
        if (res?.data) {
          const userComments = res.data.filter(
            (comment: CommentType) => comment.userId === user?.id
          );
          setComments(userComments);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchComments();
  }, [user]);

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Your Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-600">You haven't posted any comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <p className="text-gray-700">{comment.text}</p>
            <span className="text-sm text-gray-400 block mt-1">
              Posted on: {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
    </div>
  )
}

export default userComment;
