"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const locations = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi"];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight md:mx-3 xl:text-2xl">
            Subscribe to our newsletter for <span className="text-primary">tasty updates 🍔</span>
          </h1>

          <div className="mt-6 md:mx-3 md:mt-0">
            <Button
              variant="destructive"
              className="inline-flex items-center justify-center px-4 py-2 text-sm"
            >
              <span>Join Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Grid Links */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Quick Links */}
          <div>
            <p className="font-semibold">Quick Links</p>
            <div className="mt-5 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-primary hover:underline "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Food Locations */}
          <div>
            <p className="font-semibold">Food Locations</p>
            <div className="mt-5 space-y-2">
              {locations.map((location) => (
                <a
                  key={location}
                  href="#"
                  className="block text-gray-300 hover:underline hover:text-primary"
                >
                  {location}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="font-semibold">Categories</p>
            <div className="mt-5 space-y-2">
              <a href="#" className="block text-gray-300 hover:underline hover:text-primary">
                Street Food
              </a>
              <a href="#" className="block text-gray-300 hover:underline hover:text-primary">
                Fine Dining
              </a>
              <a href="#" className="block text-gray-300 hover:underline hover:text-primary">
                Cafés & Desserts
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-semibold">Contact Us</p>
            <div className="mt-5 space-y-2">
              <a href="tel:+8807684734978" className="block text-gray-300 hover:underline hover:text-primary">
                +880 768 473 4978
              </a>
              <a href="mailto:info@foodreview.com" className="block text-gray-300 hover:underline hover:text-primary">
                info@foodreview.com
              </a>
              <div className="flex items-center space-x-3">
                <a href="" className="p-2 hover:bg-primary text-white rounded-full transition-colors duration-500"><Facebook /></a>
                <a href="" className="p-2 hover:bg-primary text-white rounded-full transition-colors duration-500"><Instagram /></a>
                <a href="" className="p-2 hover:bg-primary text-white rounded-full transition-colors duration-500"><Twitter /></a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="">
            <Image
              src="/image/logo/🦆 icon _dish spoon knife_.png"
              height={80}
              width={80}
              alt="logo icon"
            />
            <span className=" text-lg font-mono">Rate My Bite</span>
          </div>
          <p className=" text-sm text-gray-400 sm:mt-0">© 2025 Food Review. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
