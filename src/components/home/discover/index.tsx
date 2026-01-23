import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Discover() {
    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container px-4 mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Discover Amazing Street Food?</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                    Join our community today and start exploring the best street food spots in your area. Share your discoveries
                    and help others find culinary treasures!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                        <Link href="/register">Sign Up Now</Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild className="">
                        <Link href="/posts">Explore Food Spots</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
