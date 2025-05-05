"use client"
import AdminDashboard from '@/components/module/dashboard/admin/AdminDashboard'
import UserDashboard from '@/components/module/dashboard/user/UserDashboard'
import { useAuth } from '@/provider/UserProvider'

<<<<<<< HEAD
=======
import React from 'react'
import DashboardLoading from './loading'

>>>>>>> f64e6ea73ba0d22e2f47150897e0ab8b7b58ffdc
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
