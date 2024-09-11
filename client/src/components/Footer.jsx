import React from "react";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 border-t-2 border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wide">Shop Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="/electronics" className="text-gray-400 hover:text-white">Electronics</a>
              </li>
              <li>
                <a href="/mobiles" className="text-gray-400 hover:text-white">Mobiles</a>
              </li>
              <li>
                <a href="/home-appliances" className="text-gray-400 hover:text-white">Home Appliances</a>
              </li>
              <li>
                <a href="/computers" className="text-gray-400 hover:text-white">Computers</a>
              </li>
              <li>
                <a href="/accessories" className="text-gray-400 hover:text-white">Accessories</a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wide">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="/contact-us" className="text-gray-400 hover:text-white">Contact Us</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white">FAQs</a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-white">Shipping & Delivery</a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white">Returns & Exchanges</a>
              </li>
              <li>
                <a href="/track-order" className="text-gray-400 hover:text-white">Track Your Order</a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wide">Company Info</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="/careers" className="text-gray-400 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="/news" className="text-gray-400 hover:text-white">Latest News</a>
              </li>
              <li>
                <a href="/investors" className="text-gray-400 hover:text-white">Investors</a>
              </li>
              <li>
                <a href="/partnerships" className="text-gray-400 hover:text-white">Partnerships</a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-gray-400 hover:text-white">Cookie Policy</a>
              </li>
              <li>
                <a href="/disclaimer" className="text-gray-400 hover:text-white">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-5 text-center">
          <p className="text-gray-400">© 2024 ElectroMart. All Rights Reserved.</p>
          <p className="text-xs text-gray-500 mt-2">Powered by ElectroMart Inc. | Designed for Performance & Security</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;