import React, { useEffect, useState } from "react"
import Image from "next/image";
import { getExperienceStories } from "../../lib/firestore";
import image1 from "@public/assets/images/testimonials/EP 1 GT.jpeg";
import image3 from "@public/assets/images/testimonials/ep 2 gt 2.jpeg";

// Hardcoded fallback data
const fallbackSlides = [
    {
        title: 'Project On The Map - Prabashi Wanigasinghe',
        content: "Volunteering in a foreign country taught me self-reliance and boosted my self-confidence. Despite the language barrier with Egyptians, I made an effort to learn some Arabic and successfully navigated the exchange experience",
        imageUrl: null,
        _localImg: image1,
    },
    {
        title: 'My Eye-Opening Time Spent on Exchange in India',
        content: "There is both anticipation and apprehension associated with taking part in an exchange programme. My trip to India was motivated by my interest in both making a positive contribution to the SDGs and seeing a new culture.",
        imageUrl: null,
        _localImg: image3,
    },
];

const CarouselMobile = () => {
    const [slides, setSlides] = useState(fallbackSlides);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        async function loadStories() {
            try {
                const data = await getExperienceStories();
                if (data && data.length > 0) {
                    setSlides(data);
                }
            } catch (err) {
                console.error("Failed to load experience stories:", err);
            }
        }
        loadStories();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length, currentSlide]);

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
                                {slide.imageUrl ? (
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.title || "Experience"}
                                        className="w-full rounded-lg object-cover"
                                        style={{ maxHeight: 400 }}
                                    />
                                ) : slide._localImg ? (
                                    <Image src={slide._localImg} width={250} height={400} className="w-full rounded-lg object-cover" alt={slide.title || "Experience"} />
                                ) : (
                                    <div className="w-full h-64 rounded-lg bg-aiesec-light-grey flex items-center justify-center text-aiesec-dark-grey">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="w-full pt-4 pb-6 px-4 bg-white rounded-2xl shadow-aiesec-mid-grey shadow-2xl">
                                <h2 className="text-global-talent font-semibold text-center">{slide.name || slide.title}</h2>
                                <p className="text-center w-full mt-2">{slide.content}</p>
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