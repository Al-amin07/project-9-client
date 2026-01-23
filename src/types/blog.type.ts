export enum BlogCategory {
  Programming = "Programming",
  Lifestyle = "Lifestyle",
  Travel = "Travel",
  Tech = "Tech",
  Education = "Education",
  Business = "Business",
}

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  category: BlogCategory;
  isPublished: boolean;
  views?: number;
  likes?: number;
  createdAt: string;
  updatedAt: string;
}
