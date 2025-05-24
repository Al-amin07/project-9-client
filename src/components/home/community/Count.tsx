"use client"
import React from 'react'
import CountUp from "react-countup";
export default function Count({ target, label }: { target?: number, label: string }) {
    return (
        <div className="text-center">
            <CountUp
                start={0}
                end={target || 1200}
                suffix="+"
                separator=","
                enableScrollSpy
                scrollSpyDelay={200}
                className="text-4xl font-bold text-primary mb-2"
            />
            <p className="text-gray-600">{label}</p>
        </div>
    )
}
