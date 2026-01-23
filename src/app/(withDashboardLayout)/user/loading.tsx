import React from 'react'
import { PuffLoader } from "react-spinners"
export default function loading() {
    return (
        <div className=' min-h-[600px] w-full flex justify-center items-center'>
            <PuffLoader
                color="#FF3C48"
                size={100}
                speedMultiplier={1}
            />
        </div>
    )
}
