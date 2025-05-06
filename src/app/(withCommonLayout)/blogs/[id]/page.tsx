// import BlogPostDetail from "@/blog-post-detail"

import BlogPostDetail from "@/components/blog/BlogDetails";

export default async function BlogPost({ params }: { params: { id: string } }) {
    const id = params
    console.log(id)
    return <BlogPostDetail />
}
