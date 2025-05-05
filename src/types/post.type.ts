import { ICategory } from "./category.type";

export type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IPost {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  price: number;
  priceRange: string;
  isPremium: boolean;
  status: PostStatus;
  categoryId: string;
  category: ICategory;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
