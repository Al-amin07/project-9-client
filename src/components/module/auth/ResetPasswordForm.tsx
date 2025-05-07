"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { resetPasswordSchema } from "./schema"
import { resetPassword } from "@/services/auth"
import { toast } from "sonner"

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const { formState: { isSubmitting } } = form
    async function onSubmit(data: ResetPasswordFormValues) {
        console.log(data)
        if (!token || !email) return
        // Simulate API call
        const modifiedData = {
            newPassword: data.password,
            token,
            email
        }
        try {
            const result = await resetPassword(modifiedData);
            if (result?.success) {
                console.log(result)
                toast.success(result?.message || "Password updated")
                setSuccess(true)
            }
            else {
                toast.error(result?.message || "Password update failed")
                setSuccess(false)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex  items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>Create a new password for your account</CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="rounded-md bg-green-50 p-4 text-green-700">
                            <div className="flex">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium">Password updated</h3>
                                    <p className="mt-2 text-sm">
                                        Your password has been successfully updated. You can now log in with your new password.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input type={showPassword ? "text" : "password"} {...field} />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-0 h-full px-3"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm New Password</FormLabel>
                                            <FormControl>
                                                <Input type={showPassword ? "text" : "password"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Updating..." : "Reset Password"}
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
