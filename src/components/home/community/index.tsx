import TextSizer from '@/components/shared/TextSizer'
import { MapPin, Star, Users, Utensils } from 'lucide-react'
import React from 'react'
const stats = [
    {
        label: "Food Spots",
        value: "1,200+",
        icon: <Utensils className="h-8 w-8 mx-auto mb-2 text-orange-600" />,
    },
    {
        label: "Active Users",
        value: "50,000+",
        icon: <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />,
    },
    { label: "Reviews", value: "85,000+", icon: <Star className="h-8 w-8 mx-auto mb-2 text-orange-600" /> },
    { label: "Cities", value: "120+", icon: <MapPin className="h-8 w-8 mx-auto mb-2 text-orange-600" /> },
]
export default function Community() {

    return (
        <section className="py-12 bg-white">
            <div className="container px-4 mx-auto">
                <TextSizer title='Join Our Foodie Community' desc='Connect with fellow food enthusiasts, share your favorite spots, write reviews, and be part of a growing network that celebrates great taste.' />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats?.map((stat, index) => (
                        <div key={index} className="p-6">
                            {stat.icon}
                            <p className="text-3xl font-bold mb-1">{stat.value}</p>
                            <p className="text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
