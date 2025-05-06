"use client"
import React, { useState } from 'react';

// import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
// import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { useAuth } from '@/provider/UserProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EyeIcon, EyeOff, Lock, Mail } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { toast } from 'sonner';
import { getCurrentUser, loginUser } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginSchema } from './schema';
import { IUser } from '@/types';
const LoginForm = () => {
    interface LoginFormValues {
        email: string;
        password: string;
        rememberMe?: boolean;
    }

    const form = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams();
    const { setUser, user } = useAuth()!
    const redirect = (searchParams.get('redirect')) || (user?.role === "ADMIN" ? '/admin/dashboard' : '/user/dashboard');

    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const result = await loginUser(data);
            console.log({ result });
            if (result?.success) {
                const user = await getCurrentUser() as IUser;
                setUser(user);
                console.log({ redirect, user: user?.role })
                toast.success(result?.message || "Login successful")
                router.push(redirect)
            } else {
                toast.error(result?.message || "Login failed")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to sign in to your account</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black/85'>Email or Phone</FormLabel>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <FormControl>
                                                <Input placeholder="Enter email or phone" className="pl-9 " {...field} />
                                            </FormControl>
                                            <FormMessage className=' text-red-600' />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Password</FormLabel>
                                            <Link href={'/forget-password'}>
                                                <Button variant="link" className="p-0 h-auto text-xs font-normal" type="button">
                                                    Forgot password?
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <FormControl>
                                                <Input type={showPassword ? "text" : "password"} className="pl-9 pr-10" {...field} />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-2.5 top-1.5 h-6 w-6 text-muted-foreground"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
                                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                            </Button>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rememberMe"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                                {isSubmitting ? "Signing in..." : "Sign in"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
                <div className="px-8 pb-8 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className='cursor-pointer'><Button variant="link" className="p-0 h-auto text-sm font-normal">
                        Create an account
                    </Button></Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginForm;