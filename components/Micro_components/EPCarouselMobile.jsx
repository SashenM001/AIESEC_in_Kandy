import React, { useEffect, useState } from "react"
import Image from "next/image";
import image1 from "@public/assets/images/testimonials/EP 1 GT.jpeg";
import image3 from "@public/assets/images/testimonials/ep 2 gt 2.jpeg";

const CarouselMobile = () => {
    const slides = [
        {
            id: 1,
            img1: image1,
            title1: 'Project On The Map - Prabashi Wanigasinghe',
            content1: "Volunteering in a foreign country taught me self-reliance and boosted my self-confidence. Despite the language barrier with Egyptians, I made an effort to learn some Arabic and successfully navigated the exchange experience",
        },
        {
            id: 2,
            img1: image3,
            title1: 'My Eye-Opening Time Spent on Exchange in India',
            content1: "There is both anticipation and apprehension associated with taking part in an exchange programme. My trip to India was motivated by my interest in both making a positive contribution to the SDGs and seeing a new culture.",
        },

    ]

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + slides.length) % slides.lenght);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [currentSlide]);

    return (
        <div className=" w-screen flex justify-center h-auto">
            <div className=" w-5/6 h-auto">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`w-full ${index === currentSlide ? "block" : "hidden"
                            } transition-transform duration-300 transform ${index === currentSlide ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-full mb-4">
                                <Image src={slide.img1} width={250} height={400} className="w-full rounded-lg object-cover" />
                            </div>
                            <div className="w-full pt-4 pb-6 px-4 bg-white rounded-2xl shadow-aiesec-mid-grey shadow-2xl">
                                <h2 className="text-global-talent font-semibold text-center">{slide.title1}</h2>
                                <p className="text-center w-full mt-2">{slide.content1}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className=" absolute bottom-0 left-0 right-0 flex justify-center mt-20">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 mx-2 cursor-pointer rounded-full ${index === currentSlide ? "bg-aiesec-blue" : " bg-aiesec-mid-grey"
                                }`}
                        >
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CarouselMobile;