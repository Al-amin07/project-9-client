import { CommentsDashboard } from '@/components/module/dashboard/user/CommentsCard';
import React, { Suspense } from 'react';


export default function CommentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CommentsDashboard></CommentsDashboard>
        </Suspense>
    )
}


