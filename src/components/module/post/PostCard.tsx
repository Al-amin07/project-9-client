import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IPost } from '@/types'
import { ArrowRight, Crown, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PostCard({ post }: { post: IPost & { averageRating: number } }) {
    return (
        // <Card key={spot.id} className="overflow-hidden py-0 h-full flex flex-col">
        //     <div className="relative h-48">
        //         <Image src={spot.image || "/placeholder.svg"} alt={spot.title} fill className="object-cover" />
        //         {spot.isPremium && (
        //             <div className="absolute top-2 right-2">
        //                 <Badge className="bg-amber-500 hover:bg-amber-600">
        //                     <Crown className="h-3 w-3 mr-1" /> Premium
        //                 </Badge>
        //             </div>
        //         )}
        //         <div className="absolute top-2 left-2">
        //             <Badge variant="outline" className="bg-white/80 text-gray-800 hover:bg-white">
        //                 {spot.category?.name}
        //             </Badge>
        //         </div>
        //     </div>
        //     <CardHeader className="px-3">
        //         <div className="flex justify-between items-start">
        //             <CardTitle className="text-xl">{spot.title}</CardTitle>
        //             <span className="text-sm whitespace-nowrap font-medium text-gray-500">{spot.price} TK</span>
        //         </div>
        //         <div className="flex items-center text-sm text-gray-500">
        //             <MapPin className="h-3 w-3 mr-1" />
        //             <span>{spot.location}</span>
        //         </div>
        //     </CardHeader>
        //     <CardContent className=" flex-grow p-0 px-4">
        //         <CardDescription
        //             className="line-clamp-2">{spot.description}</CardDescription>
        //     </CardContent>
        //     <CardFooter className="p-0 pb-4 px-4 flex justify-between">
        //         <div className="flex items-center">
        //             <div className="flex">
        //                 {[...Array(spot.averageRating || 5)].map((_, i) => (
        //                     <Star
        //                         key={i}
        //                         className={`h-4 w-4 text-yellow-500 fill-yellow-500`}
        //                     />
        //                 ))}
        //             </div>
        //             <span className="ml-2 text-sm font-medium">{Math.ceil(spot?.ratings!.reduce((a, b) => a + Number(b.value), 0)) || 10}</span>
        //         </div>
        //         <Button variant="ghost" className='hover:bg-primary hover:text-white transction-colors duration-500' size="sm" asChild>
        //             <Link href={`/posts/${spot.id}`}>
        //                 View <ArrowRight className="ml-1 h-4 w-4" />
        //             </Link>
        //         </Button>
        //     </CardFooter>
        // </Card>
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
