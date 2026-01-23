import { ICategory } from "./category.type";
import { IRating } from "./rating.type";
import { IUser } from "./user.type";

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
  reasons?: string;
  categoryId: string;
  category: ICategory;
  ratings?: IRating[];
  userId: string;
  user?: IUser;
  createdAt: string;
  updatedAt: string;
}
