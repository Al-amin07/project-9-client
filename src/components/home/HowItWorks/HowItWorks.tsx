import TextSizer from "@/components/shared/TextSizer";

const steps = [
  {
    id: "01",
    title: "Find Interesting Place",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-map-pinned-icon lucide-map-pinned"
      >
        <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
        <circle cx="12" cy="8" r="2" />
        <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
      </svg>
    ),
    description:
      "Browse restaurants, cafés, and dishes near you.Craving something delicious but not sure where to go? Our food revie..",
  },
  {
    id: "02",
    title: "Check Reviews",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-sparkles-icon lucide-sparkles"
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
    ),
    description:
      "See honest ratings and real user photos.cafés, and street eats around. From honest customer reviews and ratings t...",
  },
  {
    id: "03",
    title: "Make a Reservation",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-ticket-check-icon lucide-ticket-check"
      >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    description:
      "Book a table at your favorite restaurants in seconds Choose the date, time, and number of guests",
  },
  {
    id: "04",
    title: "Share Your Experience",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-message-square-more-icon lucide-message-square-more"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
      </svg>
    ),
    description:
      "Write reviews, rate dishes, and upload food photos to help others find great meals.",
  },
];

export default function HowItWorks() {
  const cardStyles =
    "bg-white dark:bg-gray-800 rounded-xl shadow px-4 py-5 text-center space-y-2 transition-all cursor-pointer duration-300 shadow-md shadow-[#FF3C48] transition transform hover:-translate-y-1  ";

  const textStyle = "text-gray-600 dark:text-gray-300  ";
  return (
    <section className="text-center   bg-white relative">
      <TextSizer title="How It Works Step by Step" desc="Find and share honest food reviews, ratings, and photos to discover the
        best places to eat around you."/>
      {/* <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#FF3C48]">

      </h2>
      <p className="text-gray-500 max-w-xl mx-auto mb-12">
        Find and share honest food reviews, ratings, and photos to discover the
        best places to eat around you.
      </p> */}

      <div className="relative">

        {/* Steps */}

        <div className=" grid grid-cols-2 md:grid-cols-4 gap-10 px-4">
          {steps.map((step) => (
            <div key={step.id} className={cardStyles}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 border rounded-full bg-white shadow-md flex items-center justify-center text-sm font-semibold text-gray-700  border-primary">
                {step.id}
              </div>

              <div className=" flex items-center justify-center text-primary">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className={textStyle}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
