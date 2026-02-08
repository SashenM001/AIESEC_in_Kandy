'use client'
import React from "react";
import { useState } from "react";
import Image from "next/image"
import banner1 from "@public/assets/images/landing/Kandy.jpg";
// import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import CountUpComponent from "./Micro_components/Microcounter";

const animationStyles = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes textGlow {
    0%, 100% {
      text-shadow: 0 0 10px rgba(255, 165, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
    }
    50% {
      text-shadow: 0 0 20px rgba(255, 165, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.6);
    }
  }

  .animate-slide-in-up {
    animation: slideInUp 0.8s ease-out;
  }

  .animate-text-glow {
    animation: textGlow 3s ease-in-out infinite;
  }
`;

export default function Counter(){
    const [textHovered, setTextHovered] = useState(false);

    return(
        <>
            <style>{animationStyles}</style>
            <section className="w-full bg-gray-50">
            <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
                <div className="w-full max-w-6xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <div className="flex flex-col items-center justify-center text-center bg-blue-100 rounded-2xl py-8 px-4 hover:shadow-lg transition-shadow">
                            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-aiesec-blue">
                                <span><VisibilitySensor><CountUpComponent end={200}/></VisibilitySensor></span>
                                <span>+</span>
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Active Members</div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center bg-gray-100 rounded-2xl py-8 px-4 hover:shadow-lg transition-shadow">
                            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-aiesec-blue">
                                <span id="unicount"><CountUpComponent end={30}/></span>
                                <span>+</span>
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Local Partners</div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center bg-orange-100 rounded-2xl py-8 px-4 hover:shadow-lg transition-shadow">
                            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-aiesec-blue">
                                <span id="prjcount"><CountUpComponent end={10} /></span>
                                <span>+</span>
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Years of Impact</div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center bg-gray-200 rounded-2xl py-8 px-4 hover:shadow-lg transition-shadow">
                            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-aiesec-blue">
                                <span id="expcount"><CountUpComponent end={100}/></span>
                                <span>+</span>
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Global Exchanges</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center py-12 px-4">
                <div className="max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="md:text-6xl text-3xl font-bold mb-8 leading-tight">
                            <span className="inline-block text-aiesec-blue animate-pulse">
                                We Empower Students
                            </span>
                        </h2>
                        <p className="md:text-2xl text-lg text-aiesec-dark-grey mb-6">
                            to become global leaders through international experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="group relative bg-aiesec-blue rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                            <div className="text-4xl mb-3">🌍</div>
                            <h3 className="text-xl font-bold text-white mb-2">Global Mindset</h3>
                            <p className="text-gray-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Experience diverse cultures and perspectives from around the world
                            </p>
                        </div>

                        <div className="group relative bg-global-talent rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                            <div className="text-4xl mb-3">💡</div>
                            <h3 className="text-xl font-bold text-white mb-2">Leadership Skills</h3>
                            <p className="text-gray-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Develop critical leadership competencies through hands-on projects
                            </p>
                        </div>

                        <div className="group relative bg-global-volunteer rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                            <div className="text-4xl mb-3">🚀</div>
                            <h3 className="text-xl font-bold text-white mb-2">Personal Growth</h3>
                            <p className="text-gray-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Unlock your potential and become the best version of yourself
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <div className="relative rounded-2xl overflow-hidden h-96 flex flex-col items-center justify-center group cursor-pointer" style={{backgroundImage: `url(${banner1.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}} onMouseEnter={() => setTextHovered(true)} onMouseLeave={() => setTextHovered(false)}>
                            {/* Overlay for better text visibility */}
                            <div className={`absolute inset-0 transition-all duration-300 ${textHovered ? 'bg-black/50' : 'bg-black/30'}`}></div>
                            
                            {/* Text content with animation */}
                            <p className={`relative md:text-5xl text-3xl font-black text-white drop-shadow-lg tracking-wide text-center px-4 transition-all duration-300 ${textHovered ? 'scale-110 animate-text-glow' : 'animate-slide-in-up animate-text-glow'}`}>
                                From <span className="text-orange-300 font-black hover:text-orange-400 transition-colors">Peradeniya</span> to the <span className="text-blue-300 font-black hover:text-blue-400 transition-colors">World</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
