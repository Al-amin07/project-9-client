import LoginForm from '@/components/module/auth/loginFrom'
import React, { Suspense } from 'react'

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
