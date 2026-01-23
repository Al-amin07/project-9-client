import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Star, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import Count from "@/components/home/community/Count";
import mission from "@/assets/mission.jpg";
import t1 from "@/assets/member/1.avif";
import t2 from "@/assets/member/2.avif";
import t3 from "@/assets/member/3.avif";
import t4 from "@/assets/member/4.avif";
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & Head Food Critic",
    image: t1,
    bio: "With over 15 years in culinary journalism, Sarah brings her passion for exceptional dining experiences to every review.",
    specialties: ["Fine Dining", "Wine Pairing"],
  },
  {
    name: "Marcus Chen",
    role: "Senior Food Reviewer",
    image: t2,
    bio: "Marcus specializes in street food and casual dining, bringing authentic perspectives from his travels across Asia.",
    specialties: ["Street Food", "Budget Eats"],
  },
  {
    name: "Isabella Rodriguez",
    role: "Dessert & Bakery Specialist",
    image: t3,
    bio: "A pastry chef turned food critic, Isabella has an eye for the finest desserts and baked goods in the city.",
    specialties: ["Desserts", "Bakeries", "Brunch Spots"],
  },
  {
    name: "David Thompson",
    role: "Photography Director",
    image: t4,
    bio: "David captures the essence of every dish with his stunning food photography, making every meal look irresistible.",
    specialties: [" Photography", " Ambiance"],
  },
];

const stats = [
  {
    label: "Food Spots",
    value: 1200,
    icon: <Utensils className="h-8 w-8 mx-auto mb-2 text-orange-600" />,
  },
  {
    label: "Active Users",
    value: 50000,
    icon: <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />,
  },
  {
    label: "Reviews",
    value: 85000,
    icon: <Star className="h-8 w-8 mx-auto mb-2 text-orange-600" />,
  },
  {
    label: "Cities",
    value: 120,
    icon: <MapPin className="h-8 w-8 mx-auto mb-2 text-orange-600" />,
  },
];
export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl  font-bold text-gray-900 mb-6">
            About <span className="text-primary">Rate My Bite</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re passionate food enthusiasts dedicated to helping you
            discover the best dining experiences in your city. From hidden gems
            to fine dining establishments, we taste it all so you don&apos;t
            have to guess.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center cursor-pointer p-6 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className="text-orange-500 mb-1 flex justify-center">
                  {stat.icon}
                </div>
                <Count label={stat.label} target={Number(stat.value)} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At Rate My Bite, we believe that great food brings people
                together and creates lasting memories. Our mission is to be your
                trusted companion in discovering exceptional dining experiences
                that match your taste, budget, and occasion.
              </p>
              <p>
                We go beyond just rating restaurants – we tell the story behind
                each dish, the passion of the chefs, and the atmosphere that
                makes each place special. Our detailed reviews help you make
                informed decisions about where to spend your precious dining
                moments.
              </p>
              <p>
                Whether you&apos;re looking for a romantic dinner spot, a
                family-friendly restaurant, or the best late-night eats,
                we&apos;ve got you covered with honest, detailed, and helpful
                reviews.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={mission}
              alt="Restaurant interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Heart className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Authenticity
                </h3>
                <p className="text-gray-600">
                  We provide honest, unbiased reviews based on real dining
                  experiences. No paid promotions, just genuine recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Star className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  We maintain the highest standards in our reviews, visiting
                  each restaurant multiple times to ensure consistency and
                  accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Community
                </h3>
                <p className="text-gray-600">
                  We&apos;re building a community of food lovers who share their
                  experiences and help each other discover amazing places to
                  eat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden py-0 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="px-4 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 line-clamp-2 text-sm mb-3 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, specIndex) => (
                      <Badge
                        key={specIndex}
                        variant="default"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
