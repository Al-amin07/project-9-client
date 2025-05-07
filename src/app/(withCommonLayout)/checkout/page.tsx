/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"

import { Suspense } from "react"

import CheckOut from "@/components/module/checkout/CheckOut"



const CheckoutPage = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckOut />
    </Suspense>
  )
}


export default CheckoutPage
