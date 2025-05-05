import { CategoryTable } from '@/components/module/dashboard/admin/CategoryTable';
import { CreateCategoryModal } from '@/components/module/dashboard/admin/modal/CreateCategoryModal';


import { getAllCategories } from '@/services/dashboard/admin';

import React from 'react'

export default async function AdminCategoryPage({ searchParams }: { searchParams: Promise<{ [key: string]: string; }> }) {
    const query = await searchParams
    const data = await getAllCategories(query)
    return (
        <div>
            <main className="container mx-auto py-10">
                <div className='flex justify-between items-center mb-6'>
                    <h1 className="text-3xl font-bold mb-6">Post Management</h1>
                    <CreateCategoryModal />
                </div>

                <CategoryTable data={data?.data} meta={data?.meta} />
            </main>
        </div>
    )
}
