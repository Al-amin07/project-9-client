import { IPost } from "./post.type";
import { IUser } from "./user.type";

export interface IRating {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  value: number;
  postId: string;
  post: IPost;
  user: IUser;
}
