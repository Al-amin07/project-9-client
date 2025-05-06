import { Check, Star, Upload, UserPlus, Utensils } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import TextSizer from "@/components/shared/TextSizer"

export default function HowItWorks() {
  return (
    <section className="" id="how-it-works">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <TextSizer title="How It Works" desc="Discover, share, and enjoy the best street food spots in your city" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <Card className="border-0 hover:shadow-primary cursor-pointer shadow-md duration-500 transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Utensils className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Discover</h3>
              <p className="text-muted-foreground text-center">
                Browse through hundreds of street food spots, filter by category, price range, or search by name.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0  shadow-md  transition-shadow hover:shadow-primary duration-500 cursor-pointer">
            <CardContent className="pt-6">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Share</h3>
              <p className="text-muted-foreground text-center">
                Post your favorite street food discoveries with photos, location, price, and description.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-primary cursor-pointer shadow-md duration-500  transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Rate & Review</h3>
              <p className="text-muted-foreground text-center">
                Vote, comment, and rate food spots to help others find the best street food experiences.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 hover:shadow-primary cursor-pointer shadow-md duration-500  transition-shadow">
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Go Premium</h3>
              <p className="text-muted-foreground text-center">
                Subscribe to unlock exclusive premium food spots not available to regular users.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-orange-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center mb-6">The Approval Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-orange-500">
                <span className="font-bold text-orange-500">1</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Submit a Food Spot</h4>
              <p className="text-muted-foreground">
                Share details about your favorite street food vendor including photos, location, and price.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-orange-500">
                <span className="font-bold text-orange-500">2</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Admin Review</h4>
              <p className="text-muted-foreground">
                Our admins review your submission to ensure quality and accuracy before publishing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center mb-4 border-2 border-orange-500">
                <span className="font-bold text-orange-500">3</span>
              </div>
              <h4 className="text-lg font-medium mb-2">Live on Platform</h4>
              <p className="text-muted-foreground">
                Once approved, your food spot goes live for everyone to discover and enjoy!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Premium Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start p-4 bg-white rounded-lg shadow">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-medium">Exclusive Food Spots</h4>
                <p className="text-sm text-muted-foreground">Access hidden gems and exclusive street food locations</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white rounded-lg shadow">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-medium">Premium Content</h4>
                <p className="text-sm text-muted-foreground">Discover food spots marked as premium by our admins</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white rounded-lg shadow">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-medium">Special Offers</h4>
                <p className="text-sm text-muted-foreground">Get access to special discounts and offers from vendors</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white rounded-lg shadow">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-medium">Priority Support</h4>
                <p className="text-sm text-muted-foreground">Get faster responses to your questions and issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
