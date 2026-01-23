import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { IPost } from '@/types'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PostCard({ post }: { post: IPost & { averageRating: number } }) {
    return (
        <Card className="overflow-hidden border-0 shadow-md  cursor-pointer py-0 h-full transition-all hover:shadow-2xl group">
            <div className="relative aspect-video">
                <Image
                    src={post?.image || "/placeholder.svg"}
                    alt={post?.title}
                    fill
                    className="object-cover transition-transform  duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    {post.isPremium && (
                        <Badge variant="default" className=" text-white hover:bg-primary/90">
                            Premium
                        </Badge>
                    )}
                </div>
            </div>
            <CardContent className="px-3">
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post?.category?.name}</Badge>
                    <span className="font-semibold text-muted-foreground text-sm">{post?.price} TK</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-1">{post?.title}</h2>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-1">{post?.description}</p>
            </CardContent>
            <CardFooter className=" pt-0 px-3 pb-4 flex justify-between items-center">
                <span className="font-semibold text-muted-foreground text-sm">{post?.location?.slice(0, 25)}</span>
                <Link href={`/posts/${post?.id}`}> <Button variant={'outline'} className='text-primary border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300' size={'sm'}>View Details <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
            </CardFooter>
        </Card>
    )
}
