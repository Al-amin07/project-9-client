import { IComment } from "./comment.type";
import { IPost } from "./post.type";
import { IRating } from "./rating.type";
import { IVote } from "./vote.type";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  photo?: string;
  password: string;
  role: "USER" | "ADMIN" | "PREMIUM";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  isDeleted: boolean;
  isPremium: boolean;
  comments: IComment[];
  posts: IPost[];
  ratings: IRating[];
  votes: IVote[];
  createdAt: string;
  updatedAt: string;
}
