"use client"
import React, { useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"


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
import { EyeIcon, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { toast } from 'sonner';
import { getCurrentUser, registerUser } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { registrationSchema } from './schema';
import { IUser } from '@/types';
const RegistrationForm = () => {
    interface RegisterFormValues {
        fullName: string;
        email: string;
        password: string;
        terms?: boolean;
    }

    const form = useForm<RegisterFormValues>({ resolver: zodResolver(registrationSchema) });
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const { setUser } = useAuth()!
    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {


        try {
            const result = await registerUser(data);
            console.log({ result });
            if (result?.success) {
                toast.success(result?.message || "Registration successful")
                const user = await getCurrentUser() as IUser;
                setUser(user);
                // setIsLoading(true)
                router.push('/')
            } else {
                toast.error(result?.message || "Registration failed")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">Enter your information to get started</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black/85'>Full Name</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input placeholder="Enter full name" className="pl-4 " {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black/85'>Email</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input placeholder="Enter email" className="pl-4 " {...field} />
                                            </FormControl>
                                            <FormMessage />
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

                                        </div>
                                        <div className="relative">

                                            <FormControl>
                                                <Input type={showPassword ? "text" : "password"}
                                                    placeholder='Enter password' className="pl-4 pr-10" {...field} />
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
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-xs font-normal">
                                                I agree to the{" "}
                                                <Button variant="link" className="p-0 h-auto text-sm font-normal" type="button">
                                                    terms of service
                                                </Button>{" "}
                                                and{" "}
                                                <Button variant="link" className="p-0 h-auto text-sm font-normal" type="button">
                                                    privacy policy
                                                </Button>
                                            </FormLabel>
                                            <FormMessage />
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

export default RegistrationForm;