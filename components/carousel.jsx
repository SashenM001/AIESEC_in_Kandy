"use client";
import React from "react";
import Image from "next/image";
import Carousel from "./Micro_components/EPcarousel";
import CarouselMobile from "./Micro_components/EPCarouselMobile";
import logo from "@public/aiesecwhite.png";

function EPCarousel() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 bg-gray-50">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 pb-12">
        Experience Stories
      </h2>
      <div className="lg:block hidden">
        <Carousel />
      </div> 
      <div className="lg:hidden block mt-10 mb-0">
        <CarouselMobile />
      </div>
      
    </section>
  );
}

export default EPCarousel;
