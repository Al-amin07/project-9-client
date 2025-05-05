import React from 'react'

export default function loading() {
    return (
        <div className="p-6 space-y-6">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />

            <div className="bg-slate-50 p-4 rounded-lg shadow">
                <div className="h-5 w-32 bg-gray-300 rounded mb-4 animate-pulse" />
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-100 p-4 rounded-lg shadow space-y-3 animate-pulse"
                    >
                        <div className="h-5 w-24 bg-gray-300 rounded" />
                        <div className="h-6 w-16 bg-gray-400 rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
}
