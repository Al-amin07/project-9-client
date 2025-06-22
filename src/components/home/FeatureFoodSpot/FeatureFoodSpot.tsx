import PostCard from '@/components/module/post/PostCard'

import { Button } from '@/components/ui/button'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getHomePagePosts } from '@/services/dashboard/user'
import { IPost } from '@/types'

import Link from 'next/link'
import React from 'react'

export default async function FeatureFoodSpot() {
    const { data } = await getHomePagePosts()! as { data: IPost[] }
    console.log('FeatureFoodSpot data:', data)
    const postsWithAverage =
        data?.map((post) => {
            const values = post?.ratings!.map((r) => r.value);
            const average =
                values.reduce((sum, val) => sum + val, 0) / (values.length || 1);

            return {
                ...post,
                averageRating: average,
            };
        });



    return (

        <section className="container px-4 mx-auto">
            <div className=" relative mb-12">
                <h2 className="text-lg md:text-2xl lg:text-3xl absolute top-0
                     font-bold">Featured Food Spots</h2>
                <Tabs defaultValue="trending" className="mt-4 md:mt-0  w-full">
                    <TabsList className=' ml-auto'>
                        <TabsTrigger className='cursor-pointer' value="trending">Trending</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value="new">New</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value="top-rated">Top Rated</TabsTrigger>
                    </TabsList>
                    <TabsContent className='mt-12' value="trending">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                postsWithAverage?.slice(0, 6)?.map((spot) => (
                                    <PostCard key={spot.id} post={spot} />
                                ))}
                        </div>
                    </TabsContent>
                    <TabsContent className='mt-12' value="new">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                postsWithAverage?.slice(3, 9)?.map((spot) => (
                                    <PostCard key={spot.id} post={spot} />
                                ))}
                        </div>
                    </TabsContent>
                    <TabsContent className='mt-12' value="top-rated">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                postsWithAverage?.slice(6, 12)?.map((spot) => (
                                    <PostCard key={spot.id} post={spot} />
                                ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>



            <div className="mt-10 text-center">
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                    <Link href="/posts">View All Food Spots</Link>
                </Button>
            </div>
        </section>

    )
}
