/* eslint-disable @typescript-eslint/no-explicit-any */
// import BlogPostDetail from "@/blog-post-detail"

import BlogPostDetail from "@/components/blog/BlogDetails";

export default async function BlogPost(props: any) {
    const id = props.params.id;
    console.log(id)
    return <BlogPostDetail />
}
