import { IPost } from "./post.type";
import { IUser } from "./user.type";

export interface IComment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  text: string;
  postId: string;
  post: IPost;
  user: IUser;
}
