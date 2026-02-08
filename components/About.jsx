'use client'
import React, { useState } from "react";
import Image from "next/image";
import AboutAIESEC from "../public/assets/images/landing/people for people.webp";

function About() {
  const [activeTab, setActiveTab] = useState("global");

  const tabContent = {
    global: {
      title: "AIESEC",
      description: "AIESEC is the world's largest youth-led organization, currently present in over 110 nations with a vision to achieve peace and fulfillment of human kind's potential."
    },
    national: {
      title: "In Sri Lanka",
      description: "AIESEC has been creating a positive impact since 1995. We empower the nation's youth by providing a powerful network of cross-cultural exchanges from global volunteering projects to professional internships, giving students the practical skills and global perspective to build a brighter future."
    },
    local: {
      title: "University of Peradeniya's AIESEC",
      description: "Our chapter is a passionate team of Pera students dedicated to empowering our peers. We bring global opportunities directly to you, run impactful projects right here on campus, and open the door for you to challenge yourself, develop your potential, and become a leader—whether at home or abroad."
    }
  };

  return (
    <div id="about" className="w-full py-20 px-4 sm:px-6 bg-white">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-16">
        About Us
      </h2>
      
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-16 flex-wrap">
          <button
            onClick={() => setActiveTab("global")}
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base ${
              activeTab === "global"
                ? "bg-aiesec-blue text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            GLOBAL
          </button>
          <button
            onClick={() => setActiveTab("national")}
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base ${
              activeTab === "national"
                ? "bg-aiesec-blue text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            NATIONAL
          </button>
          <button
            onClick={() => setActiveTab("local")}
            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base ${
              activeTab === "local"
                ? "bg-aiesec-blue text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            LOCAL
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:flex-1 w-full">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-bold text-aiesec-blue mb-6">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {tabContent[activeTab].description}
              </p>
            </div>
          </div>
          
          <div className="lg:flex-1 w-full flex justify-center">
            <Image 
              src={AboutAIESEC} 
              alt="AIESEC Team" 
              width={400}
              height={500}
              className="rounded-2xl object-cover shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
