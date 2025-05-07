import RegistrationForm from '@/components/module/auth/RegisterForm';
import React, { Suspense } from 'react';

const RegisterPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegistrationForm />
        </Suspense>
    );
};

export default RegisterPage;