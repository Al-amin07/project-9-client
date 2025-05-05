
import { UserPostsTable } from '@/components/module/dashboard/user/UserPostTable';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/services/dashboard/user';
import Link from 'next/link';
// import { getAllPosts } from '@/services/dashboard/admin'
import React from 'react'

export default async function UserPosts({ searchParams }: { searchParams: Promise<{ [key: string]: string; }> }) {
    const query = await searchParams
    const { data } = await getAllPosts(query)

    return (
        <div>
            <main className="container mx-auto py-10">
                <div className='flex justify-between items-center mb-8'>
                    <h1 className="text-3xl font-bold ">Post Management</h1>
                    <Link href={'/createpost'}><Button>Create Post</Button></Link>
                </div>
                <UserPostsTable data={data?.data} meta={data?.meta} />
            </main>
        </div>
    )
}
