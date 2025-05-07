import AboutBanner from "@/components/about/aboutBanner";
import { FAQSection } from "@/components/faqSection/faq";

export default function AboutPage() {
  return (
    <>
      <AboutBanner></AboutBanner>
      <div className="min-h-screen container mx-auto  dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
          {/* What We Do */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md shadow-[#FF3C48] p-6 transition transform hover:-translate-y-1 hover:shadow-lg duration-300 ">
            <h2 className="text-2xl font-semibold mb-4">🌟 What We Do</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Let users share and discover hidden food gems</li>
              <li>Enable reviews, ratings, and photos for every post</li>
              <li>Allow premium users to unlock exclusive food spots</li>
              <li>Moderate content for quality and authenticity</li>
            </ul>
          </div>

          {/* Why It Matters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-lg duration-300 shadow-[#FF3C48]">
            <h2 className="text-2xl font-semibold mb-4">👨‍🍳 Why It Matters</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Celebrate diverse street food culture</li>
              <li>Support local vendors and small businesses</li>
              <li>Make food adventures easier and more reliable</li>
              <li>Build a trusted foodie community</li>
            </ul>
          </div>

          {/* Community Impact Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-lg duration-300 shadow-[#FF3C48]">
            <h2 className="text-2xl font-semibold mb-4">🌍 Our Community Impact</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Help local food vendors get visibility and grow their business</li>
              <li>Empower users to share authentic cultural food stories</li>
              <li>Bridge the gap between hungry foodies and hidden gems</li>
              <li>Create a platform where street food culture thrives online</li>
            </ul>
          </div>
          {/* Mission Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-lg duration-300 shadow-[#FF3C48]">
            <h2 className="text-2xl font-semibold mb-4 ">💡 Our Mission</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
              To empower food lovers to explore, rate, and share local street food,
              while helping small vendors reach a wider audience — one bite at a time.
            </ul>
          </div>
        </div>


        <FAQSection></FAQSection>
      </div>
    </>
  );
}
