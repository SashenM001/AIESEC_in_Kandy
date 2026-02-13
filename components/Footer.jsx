import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@public/aiesecwhite.png";

const Footer = () => {
  return (
    <footer id="footer" className="relative mb-0">
      <div className="bg-aiesec-blue text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Logo and Description */}
          <div className="flex flex-col">
            <Image src={logo} alt="aiesec-logo" className="w-40 h-auto" />
            <p className="mt-6 text-gray-200 text-sm leading-relaxed">
              AIESEC is a global platform for young people to develop their
              leadership potential through international internships and volunteer
              opportunities. Founded in 1948 and currently present in 110+
              countries and territories, AIESEC is a non-governmental, and
              not-for-profit organization entirely run by youth for youth. AIESEC
              Sri Lanka was established in 1995, as a member chapter of AIESEC
              International.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="flex flex-col ml-8 md:ml-16">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/#opportunities" className="text-gray-300 hover:text-white transition-colors">Opportunities</Link></li>
              <li><Link href="/#partners" className="text-gray-300 hover:text-white transition-colors">Partners</Link></li>
              <li><Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Right Column - Contact Us */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-lg">✉</span>
                <a href="mailto:srilanka@aiesec.net" className="text-gray-300 hover:text-white transition-colors">srilanka@aiesec.net</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <a href="tel:+94112746190" className="text-gray-300 hover:text-white transition-colors">+94 112 746 190</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">📍</span>
                <p className="text-gray-300">102/2, Nagahawatta Road, Maharagama, 10280</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 bg-white text-gray-700 text-sm">
        Made with Love &lt;3 by Sashen M
      </div>
    </footer>
  );
};

export default Footer;
