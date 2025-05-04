"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import "./testimonial.css";
import Image from "next/image";

// const ResizePlugin: KeenSliderPlugin = (slider) => {
//   const observer = new ResizeObserver(() => {
//     slider.update();
//   });

//   slider.on("created", () => {
//     observer.observe(slider.container);
//   });
//   slider.on("destroyed", () => {
//     observer.unobserve(slider.container);
//   });
// };

const testimonials = [
  {
    name: "Rafiul Islam",
    location: "Chattogram, Bangladesh",
    role: "Food Blogger",
    testimonial:
      "The biryani was an absolute delight! Every grain of rice was infused with a rich, aromatic flavor that lingered beautifully. The meat was tender, well-marinated, and perfectly balanced with spices.",
    profileImage: "https://i.pravatar.cc/150?img=60",
    rating: 4.5,
  },
  {
    name: "Tanzina Rahman",
    location: "Sylhet, Bangladesh",
    role: "Software Developer",
    testimonial:
      "I had an amazing experience trying their chicken curry and paratha combo. The curry was rich, flavorful, and cooked to perfection with just the right amount of heat. ",
    profileImage: "https://i.pravatar.cc/150?img=44",
    rating: 5,
  },
  {
    name: "Jubayer Hossain",
    location: "Rajshahi, Bangladesh",
    role: "Photographer",
    testimonial:
      "As someone who travels often for food photography, I must say this restaurant left a strong impression. The kebabs were grilled to perfection—juicy, smoky, and full of flavor.",
    profileImage: "https://i.pravatar.cc/150?img=50",
    rating: 4,
  },
  {
    name: "Mehnaz Sultana",
    location: "Dhaka, Bangladesh",
    role: "Nutritionist",
    testimonial:
      "Healthy food can be delicious too—and this place proves it! I ordered a grilled fish platter with brown rice and sautéed vegetables, and I was thoroughly impressed. ",
    profileImage: "https://i.pravatar.cc/150?img=39",
    rating: 4.8,
  },
  {
    name: "Farhan Ahmed",
    location: "Khulna, Bangladesh",
    role: "Marketing Executive",
    testimonial:
      "Walking into this place instantly transported me to old Dhaka. I ordered their signature beef tehari, and it was bursting with authentic flavors—just like my grandmother used to make. ",
    profileImage: "https://i.pravatar.cc/150?img=33",
    rating: 5,
  },
  {
    name: "Sadia Akter",
    location: "Barisal, Bangladesh",
    role: "Travel Vlogger",
    testimonial:
      "During my recent food journey across Bangladesh, this restaurant stood out as one of the most memorable stops. I ordered their traditional platter, and every item—from the lentils",
    profileImage: "https://i.pravatar.cc/150?img=14",
    rating: 4.6,
  },
  {
    name: "Nayeem Islam",
    location: "Comilla, Bangladesh",
    role: "UX Designer",
    testimonial:
      "The overall dining experience here felt like a perfect blend of tradition and creativity. I had their signature rice bowl with beef curry and a side of grilled vegetables, and it was phenomenal.",
    profileImage: "https://i.pravatar.cc/150?img=24",
    rating: 5,
  },
];

const Testimonial = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slides: {
        perView: 3,
        spacing: 20,
      },

      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2, spacing: 15 },
        },
        "(max-width: 768px)": {
          slides: { perView: 1, spacing: 10 },
        },
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <section className=" py-12 bg-white">
      <h2 className="text-3xl lg:text-4xl font-medium mb-5 font-serif text-primary">
        What Our Premium Users Say{" "}
      </h2>
      <div ref={sliderRef} className="keen-slider mt-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="keen-slider__slide p-4">
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-md sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  alt={testimonial?.name}
                  src={testimonial.profileImage}
                  className="size-14 rounded-full object-cover"
                  width={40}
                  height={40}
                />

                <div>
                  <div className="flex gap-1 text-yellow-500">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )
                    )}
                  </div>
                  <p className="mt-1 text-lg  font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-left line-clamp-3 text-gray-700">
                {testimonial.testimonial}
              </p>
              <p className="text-left text-sm mt-4 text-gray-500">
                --{testimonial.location}
              </p>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
