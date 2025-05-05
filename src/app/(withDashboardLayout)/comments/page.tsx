
import React from 'react'
import { getComment } from "@/services/posts";

export default async function Commentpage() {
    const data = await getComment()
  
    return (
        <div className='min-h-[600px] flex justify-center items-center'>
           
        </div>
    )
}