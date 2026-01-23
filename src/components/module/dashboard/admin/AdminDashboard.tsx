"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCredentials } from '@/services/dashboard/admin';
import { IPost, IUser } from '@/types';
import { ICategory } from '@/types/category.type';
import Link from 'next/link';

import React, { useEffect, useState } from 'react'
import { UsersTable } from './UsersTable';
import { PostsTable } from './PostTable';
import { CategoryTable } from './CategoryTable';

export default function AdminDashboard() {
    interface DashboardData {
        totalUsers: number;
        totalPosts: number;
        totalComments: number;
        totalVotes: number;
        totalRatings: number;
        totalCategories: number;
        posts: IPost[] | undefined,
        categories: ICategory[] | undefined,
        users: IUser[] | undefined
    }

    const [data, setData] = useState<DashboardData | null>(null);
    const url = `${process.env.NEXT_PUBLIC_API}/admin/dashboard`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCredentials(url);
                setData(data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [url])
    return (
        <div className="p-6 space-y-6">
            <h1 className='text-2xl font-semibold'>Welcome to Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-blue-50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <CardHeader>
                        <CardTitle className='dark:text-black'>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-semibold text-blue-700">
                        {data?.totalUsers ?? "..."}
                    </CardContent>
                </Card>
                <Card className="bg-green-50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <CardHeader>
                        <CardTitle className='dark:text-black'>Total Posts</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-semibold text-green-700">
                        {data?.totalPosts ?? "..."}
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <CardHeader>
                        <CardTitle className='dark:text-black'>Total Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-semibold text-yellow-700">
                        {data?.totalComments ?? "..."}
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <CardHeader>
                        <CardTitle className='dark:text-black'>Total Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-semibold text-yellow-700">
                        {data?.totalCategories ?? "..."}
                    </CardContent>
                </Card>
                <Card className="bg-purple-50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <CardHeader>
                        <CardTitle className='dark:text-black'>Total Votes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-semibold text-purple-700">
                        {data?.totalVotes ?? "..."}
                    </CardContent>
                </Card>
                <Card className="bg-pink-50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <CardHeader>
                        <CardTitle>Total Ratings</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-semibold text-pink-700">
                        {data?.totalRatings ?? "..."}
                    </CardContent>
                </Card>
            </div>

            <div className='space-y-12 mt-16'>
                <div className=''>
                    <div className='flex justify-between items-center  mb-6'>
                        <h1 className='text-2xl font-semibold'>Users</h1>
                        <Link href={'/admin/users'}><Button>View All Users</Button></Link>
                    </div>
                    <UsersTable isPaginate={false} meta={{ page: 1, limit: 10, total: 10, totalPage: 1 }} data={data?.users as IUser[]} />
                </div>
                <div className=''>
                    <div className='flex justify-between items-center  mb-6'>
                        <h1 className='text-2xl font-semibold'>Posts</h1>
                        <Link href={'/admin/posts'}><Button>View All Posts</Button></Link>
                    </div>
                    <PostsTable isPaginate={false} meta={{ page: 1, limit: 10, total: 10, totalPage: 1 }} data={data?.posts as IPost[]} />
                </div>
                <div className=''>
                    <div className='flex justify-between items-center  mb-6'>
                        <h1 className='text-2xl font-semibold'>Category</h1>
                        <Link href={'/admin/categories'}><Button>View All Category</Button></Link>
                    </div>
                    <CategoryTable isPaginate={false} meta={{ page: 1, limit: 10, total: 10, totalPage: 1 }} data={data?.categories as ICategory[]} />
                </div>
            </div>
        </div>
    )
}
