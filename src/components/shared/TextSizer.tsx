import React from 'react'

export default function TextSizer({ title, desc }: { title: string, desc?: string }) {
    return (
        <div className='mb-10 text-center'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-medium  font-serif text-primary'>{title}</h1>
            <p className='text-gray-600 mt-4 max-w-2xl mx-auto text-center'>{desc}</p>
        </div>
    )
}
