"use client"
import AdminDashboard from '@/components/module/dashboard/admin/AdminDashboard'
import UserDashboard from '@/components/module/dashboard/user/UserDashboard'
import { useAuth } from '@/provider/UserProvider'

import React from 'react'
import DashboardLoading from './loading'

export default function DashboardPage() {
    const { user, isLoading } = useAuth()!
    return (
        <div>
            {
                !user && isLoading ? <DashboardLoading /> : user?.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />
            }

        </div>
    )
}
