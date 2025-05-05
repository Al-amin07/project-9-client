import React from 'react'

export default function DashboardLoading() {
    return (
        <div className="p-6 space-y-6 animate-pulse">
            <div className="h-6 w-1/3 bg-gray-300 rounded" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded p-6 h-32" />
                ))}
            </div>

            <div className="space-y-12 mt-16">
                {[...Array(3)].map((_, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-6 w-40 bg-gray-300 rounded" />
                            <div className="h-10 w-32 bg-gray-300 rounded" />
                        </div>
                        <div className="space-y-3">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="h-10 bg-gray-200 rounded" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

