import { UsersTable } from '@/components/module/dashboard/admin/UsersTable'
import { getAllUsers } from '@/services/dashboard/admin'
import React from 'react'

export default async function AdminUsers({ searchParams }: { searchParams: Promise<{ [key: string]: string; }> }) {
    const query = await searchParams
    const data = await getAllUsers(query)
    console.log({ data })
    return (
        <div>
            <main className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">User Management</h1>
                <UsersTable data={data?.data} meta={data?.meta} />
            </main>
        </div>
    )
}
