import { Card, CardContent } from "@/components/ui/card"

export const CommentsDashboard = () => {
  const comments = [
    {
      id: 1,
      user: "Alice",
      dish: "Spicy Ramen",
      comment: "🔥 Loved it! Perfect heat.",
      date: "2025-05-05",
    },
    {
      id: 2,
      user: "Bob",
      dish: "Butter Chicken",
      comment: "Rich and creamy. Super flavorful.",
      date: "2025-05-04",
    },
    {
      id: 3,
      user: "Charlie",
      dish: "Grilled Salmon",
      comment: "Fresh and perfectly cooked.",
      date: "2025-05-03",
    },
  ];
  //   const [comments, setComments] = useState([])

  //   useEffect(() => {
  //     fetch("/api/comment.js")
  //       .then((res) => res.json())
  //       .then((data) => setComments(data))
  //   }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {comments.map((c) => (
        <Card key={c.id} className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg text-red-600">{c.dish}</h3>
            <p className="text-sm text-gray-700 mt-1">{c.comment}</p>
            <div className="text-xs text-gray-500 mt-2">
              by <span className="font-medium">{c.user}</span> on {c.date}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
