"use client"
import AdminDashboard from '@/components/module/dashboard/admin/AdminDashboard'
import UserDashboard from '@/components/module/dashboard/user/UserDashboard'
import { useAuth } from '@/provider/UserProvider'

export default function DashboardPage() {
    const { user, isLoading } = useAuth()!
    return (
        <div>
            {
                !user && isLoading ? <p>Loading....</p> : user?.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />
            }
            {/* {
                user?.role === "ADMIN" && isLoading ? <AdminDashboard /> : <UserDashboard />
            } */}
        </div>
    )
}
