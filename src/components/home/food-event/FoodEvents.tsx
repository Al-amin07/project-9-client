import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, CalendarDays } from "lucide-react"
import img1 from "@/assets/event/1.jpeg"
import img2 from "@/assets/event/2.jpeg"
import img3 from "@/assets/event/3'.jpeg"
const upcomingEvents = [
    {
        id: "1",
        title: "International Street Food Festival",
        image: img1,
        date: "June 15-17, 2025",
        time: "11:00 AM - 9:00 PM",
        location: "Downtown Plaza",
        description:
            "Experience street food from over 30 countries in one place. Live music, cooking demonstrations, and activities for the whole family.",
        attendees: 1200,
        isFree: false,
        price: "$10",
        tags: ["International", "Festival", "Family-Friendly"],
    },
    {
        id: "2",
        title: "Night Market Food Tour",
        image: img2,
        date: "Every Friday in July",
        time: "6:00 PM - 11:00 PM",
        location: "Chinatown",
        description:
            "Join our guided tour of the best street food vendors at the night market. Sample 8 different dishes and learn about their cultural significance.",
        attendees: 45,
        isFree: false,
        price: "$35",
        tags: ["Tour", "Night Market", "Guided"],
    },
    {
        id: "3",
        title: "Food Truck Rally",
        image: img3,
        date: "July 8, 2025",
        time: "12:00 PM - 8:00 PM",
        location: "Riverside Park",
        description:
            "Over 20 food trucks gathered in one location for a day of delicious food, craft beer, and live music.",
        attendees: 850,
        isFree: true,
        price: "Free",
        tags: ["Food Trucks", "Beer", "Music"],
    },
]
export function FoodEvents() {


    return (

        <section className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <div>
                    <h2 className="text-3xl font-bold flex items-center">
                        <Calendar className="h-7 w-7 mr-2 text-primary" />
                        Upcoming Food Events
                    </h2>
                    <p className="text-gray-600 mt-2">Don&apos;t miss these exciting street food gatherings and festivals</p>
                </div>

                <Button asChild className="mt-4 md:mt-0 bg-primary hover:bg-orange-700 text-white">
                    <Link href="/events">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        View Full Calendar
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden py-0 h-full flex flex-col">
                        <div className="relative h-48">
                            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                            <div className="absolute top-2 right-2">
                                <Badge className={event.isFree ? "bg-green-600" : "bg-blue-600"}>
                                    {event.isFree ? "Free" : event.price}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader className="">
                            <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                            <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                            </div>
                        </CardHeader>

                        <CardContent className="py-0 pb-5 flex-grow">
                            <div className="space-y-2 text-sm mb-2">
                                <div className="flex items-center text-gray-700">
                                    <CalendarDays className="h-4 w-4 mr-2 text-orange-600" />
                                    {event.date}
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Clock className="h-4 w-4 mr-2 text-orange-600" />
                                    {event.time}
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Users className="h-4 w-4 mr-2 text-orange-600" />
                                    {event.attendees} attending
                                </div>
                            </div>

                            <CardDescription className="line-clamp-2">{event.description}</CardDescription>

                            {event.tags && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {event.tags.map((tag) => (
                                        <Badge key={tag} variant="default" className="text-xs rounded-full">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>

                    </Card>
                ))}
            </div>
        </section>

    )
}
