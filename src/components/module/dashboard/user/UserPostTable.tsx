"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, ChevronLeft, ChevronRight, ImageIcon, MoreHorizontal, XCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IPost } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"

import Image from "next/image"
import { ViewPostDetailsModal } from "../admin/modal/ViewPostDetailsModal"
import { UserPostUpdateModal } from "../admin/modal/UserPostUpdateModal"
// import { updatePost } from "@/services/posts"




interface PostsTableProps {
    data: IPost[]
    meta: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
    isPaginate?: boolean
}

export function UserPostsTable({ data, meta, isPaginate = true }: PostsTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        if (isPaginate && Object.keys(meta).length > 0) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(currentPage));
            router.push(`?${params.toString()}`);
        }

    }, [currentPage])
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    // Handle pagination
    const goToNextPage = () => {
        if (isPaginate && Object.keys(meta).length > 0) {

            if (currentPage < meta?.totalPage) {
                setCurrentPage(currentPage + 1)
            }
        }
    }
    const goToPreviousPage = () => {
        if (isPaginate && Object.keys(meta).length > 0) {

            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)

            }
        }
    }

    // Get status badge variant
    const getStatusVariant = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "bg-green-50 text-green-500"
            case "PENDING":
                return "bg-yellow-50 text-yellow-500"
            case "REJECTED":
                return "bg-red-100 text-red-500"
            default:
                return ""
        }
    }


    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Location</TableHead>

                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Premium</TableHead>


                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((post) => (
                            <TableRow key={post?.id}>
                                <TableCell className="font-medium flex gap-3">
                                    {post?.image ? (
                                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                            <Image
                                                src={post?.image}
                                                alt={post?.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    )}
                                    {post?.title}
                                </TableCell>
                                <TableCell>{post?.category?.name}</TableCell>
                                <TableCell>{post?.location}</TableCell>

                                <TableCell>{formatPrice(post?.price)}</TableCell>
                                <TableCell>
                                    <Badge className={`rounded-full ${getStatusVariant(post?.status)}`}>{post?.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {post?.isPremium ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-gray-400" />
                                    )}
                                </TableCell>

                                <TableCell className="text-right">
                                    <DropdownMenu >
                                        <DropdownMenuTrigger className="cursor-pointer" asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="flex flex-col gap-0">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <ViewPostDetailsModal post={post} />
                                            <UserPostUpdateModal post={post} />

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {
                isPaginate && Object.keys(meta).length > 0 &&
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {data?.length} of {meta?.total} posts
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={goToPreviousPage}
                            className="cursor-pointer"
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous page</span>
                        </Button>
                        <div className="text-sm font-medium">
                            Page {currentPage} of {meta?.totalPage}
                        </div>
                        <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === meta?.totalPage}>
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next page</span>
                        </Button>
                    </div>
                </div>
            }

        </div>
    )
}
