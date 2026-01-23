"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Utensils,
  Users,
  Shield,
  Clock,
  MapPin,
  Camera,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "reviews",
    title: "About Reviews",
    icon: <Star className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "restaurants",
    title: "For Restaurants",
    icon: <Utensils className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "community",
    title: "Community",
    icon: <Users className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "privacy",
    title: "Privacy & Safety",
    icon: <Shield className="h-5 w-5" />,
    color: "bg-red-100 text-red-600",
  },
];

const faqs = [
  // General Questions
  {
    category: "general",
    question: "What is Rate My Bite?",
    answer:
      "Rate My Bite is an independent restaurant review platform where passionate food enthusiasts share honest, detailed reviews to help you discover amazing dining experiences. We cover everything from fine dining to street food, providing unbiased recommendations based on real visits.",
  },
  {
    category: "general",
    question: "How often do you publish new reviews?",
    answer:
      "We publish 3-5 new restaurant reviews each week. Our team visits restaurants multiple times to ensure accuracy and consistency in our reviews. We also update existing reviews annually or when significant changes occur at restaurants.",
  },
  {
    category: "general",
    question: "Do you cover restaurants outside the city?",
    answer:
      "Currently, we focus primarily on restaurants within the metropolitan area, but we do feature exceptional dining destinations within a 50-mile radius. We're planning to expand to other cities in 2024.",
  },
  {
    category: "general",
    question: "How can I stay updated with new reviews?",
    answer:
      "You can subscribe to our newsletter, follow us on social media, or bookmark our website. We also have an RSS feed available for those who prefer feed readers.",
  },

  // About Reviews
  {
    category: "reviews",
    question: "How do you rate restaurants?",
    answer:
      "We use a 5-star rating system based on food quality, service, atmosphere, value for money, and overall experience. Each review includes detailed explanations for our ratings, and we visit each restaurant at least twice before publishing.",
  },
  {
    category: "reviews",
    question: "Do you accept paid reviews or sponsorships?",
    answer:
      "Absolutely not. We maintain complete editorial independence. All our reviews are unbiased and based on genuine dining experiences that we pay for ourselves. We clearly mark any sponsored content, which is separate from our reviews.",
  },
  {
    category: "reviews",
    question: "Can I trust your reviews?",
    answer:
      "Yes! Our reviewers are experienced food enthusiasts who visit restaurants anonymously and pay for their meals. We have strict editorial guidelines and never accept payment for positive reviews. Our reputation depends on honest, trustworthy recommendations.",
  },
  {
    category: "reviews",
    question: "How do you handle negative reviews?",
    answer:
      "We believe in honest feedback. If a restaurant doesn't meet our standards, we'll explain why in a constructive manner. We focus on specific issues and give restaurants opportunities to improve. We also revisit establishments that have made significant changes.",
  },
  {
    category: "reviews",
    question: "Do you review chain restaurants?",
    answer:
      "We primarily focus on independent restaurants and local gems, but we do review chain restaurants if they offer something unique or exceptional. Our goal is to highlight the best dining experiences, regardless of whether it's a chain or independent establishment.",
  },

  // For Restaurants
  {
    category: "restaurants",
    question: "How can my restaurant get reviewed?",
    answer:
      "While we can't guarantee coverage, you can suggest your restaurant through our contact form. We prioritize based on community interest, uniqueness, and our editorial calendar. The best way to get noticed is to focus on providing exceptional food and service.",
  },
  {
    category: "restaurants",
    question: "Can restaurants request changes to reviews?",
    answer:
      "We welcome feedback from restaurants and will correct any factual errors. However, we don't change opinions or ratings based on restaurant requests. If significant improvements have been made, we may schedule a re-visit for an updated review.",
  },
  {
    category: "restaurants",
    question: "Do you offer advertising opportunities?",
    answer:
      "Yes, we offer various advertising options including banner ads, sponsored content (clearly marked), and newsletter sponsorships. However, advertising never influences our editorial reviews. Contact our team for advertising rates and opportunities.",
  },
  {
    category: "restaurants",
    question: "How do you handle restaurant closures or changes?",
    answer:
      "We regularly update our database and mark closed restaurants accordingly. For major changes like new ownership or chef changes, we schedule re-visits to provide updated reviews. Readers can also notify us of changes through our contact form.",
  },

  // Community
  {
    category: "community",
    question: "Can I submit my own restaurant reviews?",
    answer:
      "Currently, reviews are written by our editorial team to maintain consistency and quality standards. However, we love hearing from our community! You can share your experiences and restaurant suggestions through our contact form or social media.",
  },
  {
    category: "community",
    question: "How can I suggest a restaurant for review?",
    answer:
      "Use our contact form or email us at suggestions@tasteguide.com. Include the restaurant name, location, and why you think we should review it. We read every suggestion and consider them for our editorial calendar.",
  },
  {
    category: "community",
    question: "Do you have a mobile app?",
    answer:
      "We're currently developing a mobile app that will launch in early 2024. It will include all our reviews, a restaurant finder, and exclusive mobile-only content. Sign up for our newsletter to be notified when it's available.",
  },
  {
    category: "community",
    question: "Can I share your reviews on social media?",
    answer:
      "We encourage sharing our reviews. Each review page has social sharing buttons, and you're welcome to share excerpts with proper attribution. We appreciate when you tag us in your posts!",
  },

  // Privacy & Safety
  {
    category: "privacy",
    question: "How do you protect my personal information?",
    answer:
      "We take privacy seriously. We only collect necessary information (like email for newsletters) and never sell or share your data with third parties. We use industry-standard security measures to protect your information. Read our full privacy policy for details.",
  },
  {
    category: "privacy",
    question: "Do you use cookies on your website?",
    answer:
      "Yes, we use essential cookies for website functionality and analytics cookies to understand how visitors use our site. You can control cookie preferences through your browser settings. We don't use tracking cookies for advertising purposes.",
  },
  {
    category: "privacy",
    question: "How do you ensure reviewer safety?",
    answer:
      "Our reviewers visit restaurants anonymously and follow safety protocols. We don't reveal reviewer identities and have procedures in place for handling any conflicts or safety concerns that may arise during the review process.",
  },
  {
    category: "privacy",
    question: "What if I have a complaint about a review?",
    answer:
      "We welcome feedback about our reviews. If you believe a review contains factual errors or have concerns about our coverage, please contact us through our official channels. We investigate all complaints thoroughly and make corrections when necessary.",
  },
];

export default function FaqSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen ">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl  font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to common questions about Rate My Bite, our review
            process, and how we help you discover amazing restaurants.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 ${
                selectedCategory === "all"
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-primary/90 "
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              All Questions
            </Badge>
            {faqCategories.map((category) => (
              <Badge
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className={`cursor-pointer px-4 py-2 flex  items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-primary/90"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                {category.title}
              </Badge>
            ))}
          </div>
        </div>

        {/* FAQ Categories Overview */}
        {selectedCategory === "all" && searchTerm === "" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {faqCategories.map((category) => {
              const categoryCount = faqs.filter(
                (faq) => faq.category === category.id,
              ).length;
              return (
                <Card
                  key={category.id}
                  className="cursor-pointer py-0 hover:shadow-lg transition-shadow group"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {categoryCount} question{categoryCount !== 1 ? "s" : ""}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      View Questions
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {selectedCategory !== "all" && (
            <div className="mb-8">
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-orange-500 hover:text-orange-600 flex items-center gap-2 mb-4"
              >
                ← Back to all categories
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {
                  faqCategories.find((cat) => cat.id === selectedCategory)
                    ?.title
                }
              </h2>
              <p className="text-gray-600">
                {filteredFAQs.length} question
                {filteredFAQs.length !== 1 ? "s" : ""} in this category
              </p>
            </div>
          )}

          {filteredFAQs.length === 0 ? (
            <Card className="text-center p-12">
              <CardContent className="p-0">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or browse different
                  categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Clear filters
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const isExpanded = expandedItems.includes(index);
                const category = faqCategories.find(
                  (cat) => cat.id === faq.category,
                );

                return (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div
                              className={`w-8 h-8 rounded-full ${category?.color} flex items-center justify-center flex-shrink-0 mt-1`}
                            >
                              {category?.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1 text-left">
                                {faq.question}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {category?.title}
                              </Badge>
                            </div>
                          </div>
                          <div className="ml-4">
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-6">
                          <div className="ml-12 pt-4 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <Card className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-lg mb-6 opacity-90">
              Can&apos;t find what you&apos;re looking for? Our team is here to
              help you with any questions about TasteGuide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Contact Us
              </Link>
              <a
                href="mailto:help@tasteguide.com"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors inline-block"
              >
                Email Support
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600 text-sm">
              We typically respond to inquiries within 24 hours during business
              days.
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <MapPin className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Coverage Area</h3>
            <p className="text-gray-600 text-sm">
              We currently cover the metropolitan area and surrounding regions.
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <Camera className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Review Process</h3>
            <p className="text-gray-600 text-sm">
              Each restaurant is visited multiple times before we publish our
              review.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
