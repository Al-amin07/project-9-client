import { PostsTable } from '@/components/module/dashboard/admin/PostTable';
import { getAllPosts } from '@/services/dashboard/admin'
import React, { Suspense } from 'react'

export default async function AdminPosts({ searchParams }: { searchParams: Promise<{ [key: string]: string; }> }) {
    const query = await searchParams
    const data = await getAllPosts(query)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="container mx-auto ">
                <h1 className="text-3xl font-bold mb-6">Post Management</h1>
                <PostsTable data={data?.data} meta={data?.meta} />
            </main>
        </Suspense>
    )
}
