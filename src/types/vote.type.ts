import { IPost } from "./post.type";
import { IUser } from "./user.type";

export type VoteStatus = "UPVOTE" | "DOWNVOTE";
export interface IVote {
  id: string;
  status: VoteStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: IUser;
  postId: string;
  post: IPost;
}
