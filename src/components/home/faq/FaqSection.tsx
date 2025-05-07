// "use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQSection() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about our Street Food Finder platform.
                    </p>
                </div>

                <Card>
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl">General Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="what-is">
                                <AccordionTrigger>What is Street Food Finder?</AccordionTrigger>
                                <AccordionContent>
                                    Street Food Finder is a community-driven platform where users can discover, post, and review street
                                    food spots. Our mission is to help food enthusiasts find hidden culinary gems in their area and share
                                    their discoveries with others.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="cost">
                                <AccordionTrigger>Is it free to use Street Food Finder?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, basic features are completely free! You can browse public food spots, post your own discoveries,
                                    and interact with the community at no cost. We also offer a Premium subscription that unlocks
                                    exclusive food spots and additional features.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>


                <Card className="mt-6">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl">Posting & Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="post-spot">
                                <AccordionTrigger>How do I post a new street food spot?</AccordionTrigger>
                                <AccordionContent>
                                    After logging in, click the &quot;Add Spot&quot; button on the dashboard. Fill in details like the name,
                                    description, location, price range, and upload at least one photo. Your submission will be reviewed by
                                    our admins before being published.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="approval-time">
                                <AccordionTrigger>How long does it take for my post to be approved?</AccordionTrigger>
                                <AccordionContent>
                                    Our admin team typically reviews submissions within 24-48 hours. You&apos;ll receive a notification once
                                    your post is approved or if additional information is needed.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="edit-post">
                                <AccordionTrigger>Can I edit my post after submission?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, you can edit your post even after submission. However, significant changes will require
                                    re-approval by our admin team to ensure quality and accuracy.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="review-rating">
                                <AccordionTrigger>How does the rating system work?</AccordionTrigger>
                                <AccordionContent>
                                    Users can rate food spots on a scale of 1-5 stars. The overall rating displayed is an average of all
                                    user ratings. You can also upvote or downvote posts to indicate their helpfulness to the community.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl">Premium Subscription</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="premium-benefits">
                                <AccordionTrigger>What are the benefits of a Premium subscription?</AccordionTrigger>
                                <AccordionContent>
                                    Premium subscribers gain access to exclusive food spots that aren&apos;t visible to regular users. These
                                    are often hidden gems or special culinary experiences curated by our team and community. Premium
                                    members also enjoy additional platform features.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="subscription-cost">
                                <AccordionTrigger>How much does a Premium subscription cost?</AccordionTrigger>
                                <AccordionContent>
                                    Premium subscriptions are available at competitive rates with monthly and annual billing options.
                                    Visit our Subscription page for current pricing details and special offers.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="payment-methods">
                                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                <AccordionContent>
                                    We accept payments through SSLCommerz and ShurjoPay, which support various payment methods including
                                    credit/debit cards, mobile banking, and other local payment options.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="cancel-subscription">
                                <AccordionTrigger>How can I cancel my Premium subscription?</AccordionTrigger>
                                <AccordionContent>
                                    You can cancel your subscription anytime from your account settings. Your Premium access will continue
                                    until the end of your current billing period.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl">Content & Moderation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="report-content">
                                <AccordionTrigger>How can I report inappropriate content?</AccordionTrigger>
                                <AccordionContent>
                                    If you come across inappropriate content or inaccurate information, click the &ldquo;Report&quot; button on the
                                    post or comment. Our moderation team will review your report and take appropriate action.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="post-rejected">
                                <AccordionTrigger>Why was my post rejected?</AccordionTrigger>
                                <AccordionContent>
                                    Posts may be rejected if they violate our community guidelines, contain insufficient information, or
                                    have poor quality images. You&apos;ll receive a notification explaining the reason for rejection and how to
                                    improve your submission.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="become-admin">
                                <AccordionTrigger>Can I become an admin or moderator?</AccordionTrigger>
                                <AccordionContent>
                                    Active community members with a history of quality contributions may be invited to join our moderation
                                    team. We occasionally open applications for these positions based on platform needs.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl">Technical Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="technical-issues">
                                <AccordionTrigger>I&apos;m experiencing technical issues. What should I do?</AccordionTrigger>
                                <AccordionContent>
                                    For technical support, please visit our Help Center or contact us through the Support form. Include
                                    details about the issue, your device, and browser to help us resolve it quickly.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="browser-compatibility">
                                <AccordionTrigger>Which browsers are supported?</AccordionTrigger>
                                <AccordionContent>
                                    Our platform is optimized for modern browsers including Chrome, Firefox, Safari, and Edge. For the
                                    best experience, we recommend keeping your browser updated to the latest version.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="mobile-app">
                                <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                                <AccordionContent>
                                    Our website is fully responsive and works great on mobile devices. We&apos;re currently developing
                                    dedicated mobile apps for iOS and Android, which will be available soon.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
