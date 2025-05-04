"use client"
import { getCredentials } from '@/services/dashboard/admin';
import React, { useEffect, useState } from 'react'

export default function AdminDashboard() {
    const [data, setData] = useState([])
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
    console.log({ data })
    return (
        <div>
            <h1>This is Admin Dashboard</h1>
        </div>
    )
}
