"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, ImageIcon, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { ICategory } from "@/types/category.type"
import { useRouter, useSearchParams } from "next/navigation"



interface CategoryTableProps {
    data: ICategory[]
    meta: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
}

export function CategoryTable({ data, meta }: CategoryTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter();
    const searchParams = useSearchParams();
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
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

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(currentPage));
        router.push(`?${params.toString()}`);
    }, [currentPage])

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Name</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((category) => (
                            <TableRow key={category?.id}>
                                <TableCell className="font-medium">{category?.name}</TableCell>
                                <TableCell>
                                    {category?.image ? (
                                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                            <Image
                                                src={category.image || "/placeholder.svg"}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{formatDate(category?.createdAt)}</TableCell>
                                <TableCell>{formatDate(category?.updatedAt)}</TableCell>
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
                                            <DropdownMenuItem>Edit category</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Delete category</DropdownMenuItem>
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
                    Showing {data?.length} of {meta?.total} categories
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
                    <Button variant="outline" className="cursor-pointer disabled:cursor-not-allowed" size="sm" onClick={goToNextPage} disabled={currentPage === meta?.totalPage}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
