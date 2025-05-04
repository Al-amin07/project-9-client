import { PostsTable } from '@/components/module/dashboard/admin/PostTable';
import { getAllPosts } from '@/services/dashboard/admin'
import React from 'react'

export default async function AdminPosts({ searchParams }: { searchParams: Promise<{ [key: string]: string; }> }) {
    const query = await searchParams
    const data = await getAllPosts(query)
    return (
        <div>
            <main className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Post Management</h1>
                <PostsTable data={data?.data} meta={data?.meta} />
            </main>
        </div>
    )
}
