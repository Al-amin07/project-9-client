"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { forgotPasswordSchema } from "./schema"
import { forgetPassword } from "@/services/auth"
import { toast } from "sonner"
import { useState } from "react"

// Define the form schema

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
    const [success, setSuccess] = useState(false)

    // Initialize the form
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const { formState: { isSubmitting, } } = form

    async function onSubmit(data: ForgotPasswordFormValues) {

        try {
            const result = await forgetPassword(data);
            if (result?.success) {
                toast.success(result?.message || "Email sent")
                setSuccess(true)
            } else {
                toast.error(result?.message || "Email not sent")
                setSuccess(false)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex min-h-[calc(100vh-80px)]  items-center justify-center  ">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password ?</CardTitle>
                    <CardDescription>Enter your email address and we&apos;ll send you a link to reset your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="rounded-md bg-green-50 p-4 text-green-700">
                            <div className="flex">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium">Email sent</h3>
                                    <p className="mt-2 text-sm">
                                        Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check
                                        your spam folder.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your.email@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                    <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
