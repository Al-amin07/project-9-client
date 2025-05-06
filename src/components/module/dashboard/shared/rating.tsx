'use client';

import { useAuth } from '@/provider/UserProvider';
import { IRating } from '@/types/rating.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Star } from 'lucide-react';

interface Props {
  data: IRating[];
}

export default function Rating({ data }: Props) {
  const { user } = useAuth()!;

  if (!user) return <div>Please login to view your ratings.</div>;

  const myRatings = data.filter((item) => item.userId === user.id);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">⭐ My Ratings</h2>

      {myRatings.length === 0 ? (
        <p className="text-gray-500">No ratings submitted yet.</p>
      ) : (
        <Table className="bg-white rounded-xl shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Post Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myRatings.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell>
                  <img
                    src={rating.post?.image}
                    alt={rating.post?.title}
                    className="h-14 w-14 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{rating.post?.title}</TableCell>
                <TableCell className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < rating.value ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </TableCell>
                <TableCell>{new Date(rating.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
