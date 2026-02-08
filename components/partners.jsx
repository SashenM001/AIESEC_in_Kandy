import React from "react";
import Image from "next/image";
import Link from "next/link";
import forestHealing from "@public/assets/images/partners/Forest Healing - Brand Strategy_edited.avif";
import blueRose from "@public/assets/images/partners/blue rose logo.jpeg";
import gateway from "@public/assets/images/partners/gatway.png";
import glendower from "@public/assets/images/partners/glendower logo.jpeg";
import greenAngels from "@public/assets/images/partners/green angels.jpeg";
import iesLogo from "@public/assets/images/partners/ies logo.jpeg";
import marvelSL from "@public/assets/images/partners/marvel SL logo.jpeg";
import pedroBarn from "@public/assets/images/partners/pedro barn.jpeg";
import sistersAtLaw from "@public/assets/images/partners/sistersAtLaw.jpeg";
import edukopathways from "@public/assets/images/partners/eduko pathways.png";

const Partners = () => {
  const partnerLogos = [
    { url: forestHealing, width: 100, name: "Forest Healing" },
    { url: blueRose, width: 100, name: "Blue Rose" },
    { url: gateway, width: 100, name: "Gateway" },
    { url: glendower, width: 100, name: "Glendower" },
    { url: greenAngels, width: 100, name: "Green Angels" },
    { url: iesLogo, width: 100, name: "IES Logo" },
    { url: marvelSL, width: 100, name: "Marvel SL" },
    { url: pedroBarn, width: 100, name: "Pedro Barn" },
    { url: edukopathways, width: 100, name: "Eduko Pathways" },
    { url: sistersAtLaw, width: 100, name: "Sisters at Law" },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 bg-white">
      <div id="partners" className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12">Our Partners</h2>
        <div className="flex justify-center items-center flex-wrap gap-8 sm:gap-10 mb-12">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center transition-transform hover:scale-110">
              <Image
                src={logo.url}
                alt={logo.name}
                className="h-14 sm:h-16 object-contain"
                width={logo.width}
                height={70}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center pb-6">
        <Link
          href="https://docs.google.com/presentation/d/e/2PACX-1vTjo_b7Zoq6nioUmy86OQ69YuQnsv_PKMsUYR8l1cets-jIKR0SatPo5wyG3azhNvsaYIyF6r_2PI4X/pub?start=false&loop=false&delayms=3000"
          target="_blank"
        >
          <button className="text-white bg-aiesec-blue px-8 sm:px-12 py-3 font-semibold rounded-full hover:bg-blue-800 transition-colors text-sm sm:text-base">
            Partner with AIESEC
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Partners;
