import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Users,
  Camera,
  Utensils,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactReasons = [
  {
    icon: <Utensils className="h-5 w-5" />,
    title: "Restaurant Recommendations",
    description: "Suggest a restaurant for us to review",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "General Inquiries",
    description: "Questions about our reviews or services",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Partnership Opportunities",
    description: "Collaborate with us on food events",
  },
  {
    icon: <Camera className="h-5 w-5" />,
    title: "Media & Press",
    description: "Press inquiries and media requests",
  },
];

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];
export default function ContactPage() {
  return (
    <div className="min-h-screen ">
      {/* Navigation */}

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl  font-bold text-gray-900 mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a restaurant recommendation? Want to collaborate? Or just want
            to say hello? We&lsquo;d love to hear from you! Reach out to our
            team of food enthusiasts.
          </p>
        </div>

        {/* Contact Reasons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactReasons.map((reason, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardContent className="p-0">
                <div className="text-orange-500 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Input placeholder="Restaurant recommendation" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about the restaurant you'd like us to review, or ask us anything..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    How did you hear about us?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-orange-100"
                    >
                      Social Media
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-orange-100"
                    >
                      Google Search
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-orange-100"
                    >
                      Friend Referral
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-orange-100"
                    >
                      Food Blog
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-orange-100"
                    >
                      Other
                    </Badge>
                  </div>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">
                      123 Foodie Street
                      <br />
                      Culinary District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">+1 (555) 123-FOOD</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600 text-sm">
                      hello@tasteguide.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700 font-medium">
                      {schedule.day}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">
                  Quick Response Guarantee
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  We typically respond to all inquiries within 24 hours during
                  business days.
                </p>
                <Badge variant="secondary" className="bg-white text-orange-500">
                  24 Hour Response
                </Badge>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Stay updated with our latest reviews and food discoveries on
                  social media.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    Instagram
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                How do you choose restaurants to review?
              </h3>
              <p className="text-gray-600 text-sm">
                We select restaurants based on community recommendations, new
                openings, trending spots, and hidden gems we discover during our
                food adventures.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you accept paid reviews?
              </h3>
              <p className="text-gray-600 text-sm">
                No, we maintain complete editorial independence. All our reviews
                are unbiased and based on genuine dining experiences that we pay
                for ourselves.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can restaurants request a review?
              </h3>
              <p className="text-gray-600 text-sm">
                While restaurants can suggest themselves for review, we cannot
                guarantee coverage. We prioritize based on our editorial
                calendar and community interest.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                How often do you update reviews?
              </h3>
              <p className="text-gray-600 text-sm">
                We revisit popular restaurants annually or when significant
                changes occur (new chef, menu overhaul, etc.) to ensure our
                reviews remain current and accurate.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
