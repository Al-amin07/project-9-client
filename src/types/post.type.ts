export type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPremium: boolean;
  category: {
    id: string;
    name: string;
  } | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
