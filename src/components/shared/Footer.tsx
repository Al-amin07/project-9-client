import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
    { label: "Blogs", href: "/blogs" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-12 pb-10 mt-20 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-xl font-bold text-[#FF3C48] mb-3">
              WebSite Name
            </h2>
            <p className="text-[16px] font-medium">
              Enjoy delicious meals from our wide range of categories. Fresh,
              fast, and flavorful — just for you!
            </p>
          </div>

          {/* Navigation  */}
          <div>
            <h3 className="text-lg text-primary font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-[16px] font-medium ">
              {links.map((el) => (
                <li key={el.label}>
                  <Link href={el.href} className="hover:text-primary">
                    {el.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}

          <div>
            <h3 className="text-lg text-[#FF3C48] font-bold mb-4">
              Get in Touch
            </h3>
            <p className="text-[16px] font-medium">Email: support@foods.com</p>
            <p className="text-[16px] font-medium">Phone: +880 1234-567890</p>

            <div className="flex flex-wrap mt-5 gap-3">
              <Link
                href="#"
                className="px-5 py-2 rounded-full border-2 border-[#FF3C48] text-[#FF3C48] hover:bg-[#FF3C48] hover:text-white font-semibold transition duration-300 text-sm"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="px-5 py-2 rounded-full border-2 border-[#FF3C48] text-[#FF3C48] hover:bg-[#FF3C48] hover:text-white font-semibold transition duration-300 text-sm"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="px-5 py-2 rounded-full border-2 border-[#FF3C48] text-[#FF3C48] hover:bg-[#FF3C48] hover:text-white font-semibold transition duration-300 text-sm"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 text-center text-md text-[#FF3C48] dark:text-[#FF3C48]">
          &copy; {new Date().getFullYear()} Foods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
