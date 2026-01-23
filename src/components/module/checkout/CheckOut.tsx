/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CreditCard, Loader2, MapPin, Phone, User } from "lucide-react"
import Image from "next/image"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { initiatePayment } from "@/lib/shurjopay"
import { fetchWithAuth, isAuthenticated, getUserFromToken } from "@/lib/auth"
import { subscriptionPlans } from "@/data/subscriptionPlans"
import type { SubscriptionPlanId } from "@/types/subscription.type"
import { z } from "zod"
/* eslint-disable @typescript-eslint/no-explicit-any */
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z
        .string()
        .min(11, "Please enter a valid phone number (11 digits)")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
})

const CheckOut = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const plan = searchParams.get("plan")
    const [isLoading, setIsLoading] = useState(false)
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        city: "",
        address: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Find the selected plan details
    const selectedPlan = plan ? subscriptionPlans.find((p) => p.id === plan) : null

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (!isAuthenticated()) {
                    router.push("/login?redirect=checkout")
                    return
                }

                const userData = getUserFromToken()
                if (userData && userData.email) {
                    setCustomerInfo((prev) => ({
                        ...prev,
                        name: userData.fullName || "",
                    }))
                    return
                }

                const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API}/api/auth/me`)

                if (response.ok) {
                    const data = await response.json()
                    setCustomerInfo((prev) => ({
                        ...prev,
                        name: data.data.fullName || "",
                    }))
                } else {
                    toast.error("Authentication required")
                    router.push("/login?redirect=checkout")
                }
            } catch (error: any) {
                toast.error("Error loading user information")
                router.push("/login?redirect=checkout")
            }
        }

        fetchUserInfo()
    }, [router])

    useEffect(() => {
        if (plan && !selectedPlan) {
            toast.error("Invalid subscription plan")
            router.push("/")
        }
    }, [plan, router, selectedPlan])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }

        // For phone field, only accept digits
        if (name === "phone" && value !== "" && !/^\d+$/.test(value)) {
            return // Don't update state if non-digits are entered
        }

        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const validateForm = () => {
        try {
            formSchema.parse(customerInfo)
            setErrors({})
            return true
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {}
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        formattedErrors[err.path[0].toString()] = err.message
                    }
                })
                setErrors(formattedErrors)
            }
            return false
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!plan || !selectedPlan) {
            toast.error("Invalid subscription plan")
            return
        }

        if (!isAuthenticated()) {
            toast.error("Please log in to continue")
            router.push("/login?redirect=checkout")
            return
        }

        // Validate form
        if (!validateForm()) {
            return
        }

        try {
            setIsLoading(true)

            const userData = getUserFromToken()

            const paymentData = {
                plan: plan as SubscriptionPlanId,
                customerName: customerInfo.name,
                customerEmail: userData?.email || "",
                customerPhone: customerInfo.phone,
                customerCity: customerInfo.city,
                customerAddress: customerInfo.address,
            }

            const result = await initiatePayment(paymentData)

            if (result.success && result.data?.checkout_url) {
                window.location.href = result.data.checkout_url
            } else {
                toast.error("Failed to initiate payment")
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            toast.error("An error occurred while processing your payment")
        } finally {
            setIsLoading(false)
        }
    }

    if (!selectedPlan) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading your subscription details...</p>
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto py-6 sm:py-8 md:py-12 px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[80vh]">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Plan Details */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-gray-900 dark:to-gray-800 p-5 sm:p-6 md:p-8">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white flex items-center">
                            <CreditCard className="mr-3 h-5 w-5 text-primary" />
                            Subscription Details
                        </h1>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 bg-white dark:bg-gray-800 mb-4 sm:mb-6 shadow-md transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg sm:text-xl font-bold text-primary dark:text-primary">{selectedPlan.name}</h2>
                                <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">Premium</div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm border-b border-gray-200 dark:border-gray-700 pb-3">
                                {selectedPlan.description}
                            </p>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                        </span>
                                        Duration
                                    </span>
                                    <span className="dark:text-white text-sm font-medium">{selectedPlan.duration} days</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                        </span>
                                        Price
                                    </span>
                                    <span className="text-xl sm:text-2xl font-bold text-primary">৳{selectedPlan.price}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="flex items-center justify-center sm:justify-start mt-6 sm:mt-10">
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm">
                                    Secured by{" "}
                                    <Image
                                        src="/image/logo/shurjopay.png"
                                        alt="Shurjopay"
                                        width={70}
                                        height={70}
                                        className="w-14 sm:w-[70px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="p-5 sm:p-6 md:p-8">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white flex items-center">
                            <User className="mr-3 h-5 w-5 text-primary" />
                            Customer Information
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="relative">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={customerInfo.name}
                                            onChange={handleInputChange}
                                            required
                                            className={cn(
                                                "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 dark:bg-gray-700 dark:text-white dark:border-gray-600",
                                                errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600",
                                            )}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={customerInfo.phone}
                                            onChange={handleInputChange}
                                            required
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            className={cn(
                                                "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 dark:bg-gray-700 dark:text-white dark:border-gray-600",
                                                errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600",
                                            )}
                                            placeholder="01XXXXXXXXX"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        City
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={customerInfo.city}
                                            onChange={handleInputChange}
                                            required
                                            className={cn(
                                                "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 dark:bg-gray-700 dark:text-white dark:border-gray-600",
                                                errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-600",
                                            )}
                                            placeholder="Pabna"
                                        />
                                    </div>
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>

                                <div className="relative">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={customerInfo.address}
                                            onChange={handleInputChange}
                                            required
                                            className={cn(
                                                "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 dark:bg-gray-700 dark:text-white dark:border-gray-600",
                                                errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-600",
                                            )}
                                            placeholder="Santhia, Pabna"
                                        />
                                    </div>
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-4 sm:mt-6 bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Pay ৳{selectedPlan.price}
                                    </>
                                )}
                            </Button>

                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                                Your payment information is securely processed by ShurjoPay
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CheckOut
