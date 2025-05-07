/* eslint-disable @typescript-eslint/no-unused-vars */

import VerifyPayment from "@/components/payment/VerifyPayment";
import { Suspense } from "react";



const VerifyPaymentPage = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPayment />
    </Suspense>
  );
};

export default VerifyPaymentPage;