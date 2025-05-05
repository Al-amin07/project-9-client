"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, ChevronLeft, ChevronRight, MoreHorizontal, XCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IPost } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"




interface PostsTableProps {
    data: IPost[]
    meta: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
}

export function PostsTable({ data, meta }: PostsTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter();
    const searchParams = useSearchParams();
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(currentPage));
        router.push(`?${params.toString()}`);
    }, [currentPage])
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    // Handle pagination
    const goToNextPage = () => {
        if (currentPage < meta?.totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)

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
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((post) => (
                            <TableRow key={post?.id}>
                                <TableCell className="font-medium">{post?.title}</TableCell>
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
                                <TableCell>{formatDate((post?.createdAt).toString())}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit post</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Delete post</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

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
        </div>
    )
}
