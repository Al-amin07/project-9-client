import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How do I post a food spot?",
      answer:
        "Register or log in, then go to the 'Post' page there is a section named 'add post' click and fill out the form with the title, description, location, image, and price range.",
    },
    {
      question: "What is a Premium post?",
      answer:
        "Premium posts are exclusive food spots that are only visible to premium subscribers.",
    },
    {
      question: "How do I become a premium user?",
      answer:
        "Go to the Subscription page and choose a plan. You can pay securely using SSLCommerz or ShurjoPay.",
    },
    {
      question: "Can I edit or delete my post?",
      answer:
        "Currently, you can’t edit a post after submission. You can request deletion through your user dashboard.",
    },
    {
      question: "How are posts approved?",
      answer:
        "All posts go through admin review for quality and authenticity before being published.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-center text-[#FF3C48] mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion type="multiple" className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-[#FF3C48] rounded-xl shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 cursor-pointer text-left text-lg font-semibold text-[#FF3C48] hover:bg-[#FF3C48]/10 transition-all duration-200 rounded-t-xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 text-gray-700 text-[16px] bg-gray-50 rounded-b-xl">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
