
import { UserPostsTable } from '@/components/module/dashboard/user/UserPostTable';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/services/dashboard/user';

import Link from 'next/link';
// import { getAllPosts } from '@/services/dashboard/admin'
import React, { Suspense } from 'react'

export default async function UserPosts({ searchParams }: { searchParams: Promise<{ [key: string]: string; }> }) {
    const query = await searchParams
    const { data } = await getAllPosts(query)

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="container mx-auto pt-3">
                <div className='flex justify-between items-center mb-8'>
                    <h1 className="text-3xl font-bold ">Post Management</h1>
                    <Link href={'/createpost'}><Button>Create Post</Button></Link>
                </div>
                {
                    data?.data && data?.data?.length !== 0 ? <UserPostsTable data={data?.data} meta={data?.meta} /> : <div className='flex justify-center  items-center bg-gray-50 rounded-md h-40'>

                        <h1 className='text-2xl font-semibold text-slate-700'> No Post Found</h1>
                    </div>
                }
            </main>
        </Suspense>
    )
}
