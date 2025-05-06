import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/services/auth';
import { getCredentials } from '@/services/dashboard/admin';
import { IPost, IUser } from '@/types';
import { IComment } from '@/types/comment.type';
import { IRating } from '@/types/rating.type';
import { IVote } from '@/types/vote.type';
import React from 'react'

interface UserDashboardData {
    user: IUser
    posts: IPost[];
    comments: IComment[];
    ratings: IRating[];
    votes: IVote[];
}

export default async function UserDashboard() {
    const url = `${process.env.NEXT_PUBLIC_API}/user/dashboard`;
    const { data } = await getCredentials(url) as { data: UserDashboardData }
    // user info
     const userInfo = await getCurrentUser() as IUser;
            console.log(userInfo);
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Welcome, {userInfo?.fullName || ""}</h1>

            <Card className="bg-slate-50">
                <CardHeader>
                    <CardTitle className="text-lg">Profile Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Email:</strong> {userInfo?.email}</p>
                    <p><strong>Role:</strong> {data?.user.role}</p>
                    <p><strong>Status:</strong> {data?.user.status}</p>
                    <p><strong>Premium:</strong> {data?.user.isPremium ? 'Yes' : 'No'}</p>
                    {data?.user.isPremium && data?.user?.premiumUntil && (
                        <p><strong>Premium Until:</strong> {new Date(data.user.premiumUntil).toLocaleDateString()}</p>
                    )}
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50  ">
                    <CardHeader><CardTitle>Your Posts</CardTitle></CardHeader>
                    <CardContent className="text-2xl text-blue-700 font-semibold">{data?.posts.length}</CardContent>
                </Card>
                <Card className="bg-yellow-50">
                    <CardHeader><CardTitle>Your Comments</CardTitle></CardHeader>
                    <CardContent className="text-2xl text-yellow-700 font-semibold">{data?.comments.length}</CardContent>
                </Card>
                <Card className="bg-green-50">
                    <CardHeader><CardTitle>Your Ratings</CardTitle></CardHeader>
                    <CardContent className="text-2xl text-green-700 font-semibold">{data?.ratings.length}</CardContent>
                </Card>
                <Card className="bg-purple-50">
                    <CardHeader><CardTitle>Your Votes</CardTitle></CardHeader>
                    <CardContent className="text-2xl text-purple-700 font-semibold">{data?.votes.length}</CardContent>
                </Card>
            </div>
        </div>
    )
}
