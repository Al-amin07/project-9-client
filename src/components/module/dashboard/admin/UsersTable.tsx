"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, ChevronLeft, ChevronRight, MoreHorizontal, XCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IUser } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import { UserUpdateModal } from "./modal/UserUpdateModal"
import { ViewDetailsModal } from "./modal/ViewDetailsModal"
import { DeleteModal } from "./modal/DeleteModal"
import { toast } from "sonner"
import { deleteUserStatus, updateUserStatus } from "@/services/dashboard/admin"
interface UsersTableProps {
    data: IUser[]
    meta: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
}
export function UsersTable({ data, meta }: UsersTableProps) {
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
    const deleteUser = async (id: string): Promise<void> => {
        console.log(id)
        const toastId = toast.loading("Deleting user...")
        try {
            const result = await deleteUserStatus(id)
            if (result?.success) {
                toast.success(result?.message || "User deleted", { id: toastId })

            } else {
                toast.error(result?.message || "User not deleted", { id: toastId })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async (id: string, data: { status: "ACTIVE" | "BLOCKED" | "DELETED" }): Promise<void> => {
        const toastId = toast.loading("Updating user...")
        try {
            const result = await updateUserStatus(id, data)
            if (result?.success) {
                toast.success(result?.message || "User updated", { id: toastId })
            } else {
                toast.error(result?.message || "User not updated", { id: toastId })
            }
        } catch (error) {
            console.log(error)
        }
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
            case "ACTIVE":
                return "bg-green-50 text-green-500"
            case "BLOCKED":
                return "bg-blue-100 text-blue-500"
            case "DELETED":
                return "bg-red-100 text-red-500"
            default:
                return ""
        }
    }

    // Get role badge variant
    const getRoleVariant = (role: string) => {
        switch (role) {
            case "ADMIN":
                return "default"
            case "PREMIUM":
                return "secondary"
            default:
                return "outline"
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
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Premium</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((user) => (
                            <TableRow key={user?.id}>
                                <TableCell className="font-medium">{user?.fullName}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>
                                    <Badge className="rounded-full" variant={getRoleVariant(user?.role)}>{user?.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`rounded-full ${getStatusVariant(user?.status)}`} >{user?.status}</Badge>
                                </TableCell>

                                <TableCell>
                                    {user?.isPremium ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-gray-400" />
                                    )}
                                </TableCell>
                                <TableCell>{formatDate(user?.createdAt)}</TableCell>
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
                                            <div className="flex flex-col gap-0">
                                                <ViewDetailsModal user={user} />
                                                <UserUpdateModal
                                                    user={user}
                                                    onSubmit={updateUser}
                                                />
                                                <DropdownMenuSeparator />
                                                <DeleteModal onDelete={() => deleteUser(user?.id)} />
                                            </div>


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
                    Showing {data?.length} of {meta?.total} users
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={goToPreviousPage} className=" cursor-pointer disabled:cursor-not-allowed" disabled={currentPage === 1}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <div className="text-sm font-medium">
                        Page {currentPage} of {meta?.totalPage}
                    </div>
                    <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onClick={goToNextPage} disabled={currentPage === meta?.totalPage}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
