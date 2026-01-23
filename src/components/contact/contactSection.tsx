'use client';

import React from 'react';

const ContactSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 ">
      {/* Map */}
      <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.7760297838474!2d-1.316345084071313!3d50.88204377953814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487474d911cf7a3f%3A0xedaeb9c7a8d3b4d9!2sSanlorenzo%20Yachts%20UK!5e0!3m2!1sen!2suk!4v1682435877953!5m2!1sen!2suk"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white  border-b-4 border-[#FF3C48] pb-3 ">Send Us Message</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
          <textarea
            placeholder="Write Your Message Here..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white h-32 resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#FF3C48] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors cursor-pointer"
          >
            Send Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
