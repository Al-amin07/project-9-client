import Profile from '@/components/module/dashboard/shared/Profile'
import { getMe } from '@/services/auth'
import React from 'react'

export default async function ProfilePage() {
    const data = await getMe()
    // console.log({ data })
    return (
        <div className='min-h-[600px] flex justify-center items-center'>
            <Profile data={data?.data} />
        </div>
    )
}
