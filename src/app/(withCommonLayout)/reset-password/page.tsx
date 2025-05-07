import ResetPasswordForm from '@/components/module/auth/ResetPasswordForm'
import React, { Suspense } from 'react'

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>

            <ResetPasswordForm />
        </Suspense>
    )
}
