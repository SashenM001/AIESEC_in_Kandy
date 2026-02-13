import React, { useEffect, useState } from "react"
import Image from "next/image";
import { getExperienceStories } from "../../lib/firestore";
import image1 from "@public/assets/images/testimonials/EP 1 GT.jpeg";
import image2 from "@public/assets/images/testimonials/ep 1 gt2.jpeg";
import image3 from "@public/assets/images/testimonials/ep 2 gt 2.jpeg";
import image4 from "@public/assets/images/testimonials/ep2 gt .jpeg";

// Hardcoded fallback data
const fallbackSlides = [
    {
        title: 'Outgoing Global Talent',
        content: "I'm truly grateful for the wonderful opportunity to undertake an internship at Manipal University, India. This experience means a lot to me, both personally and professionally. ",
        imageUrl: null,
        _localImg: image1,
    },
    {
        title: 'Sudarshan Krishnan',
        content: "This internship is not just a step in my academic journey, but one of the best opportunities of my life, helping me grow, learn, and build a strong foundation for my future career. I'm excited to gain new skills, embrace new challenges, and represent my country with pride.Thank you once again for opening this door to a brighter future. AIESEC in Kandy 🇱🇰 🤝 🇮🇳",
        imageUrl: null,
        _localImg: image2,
    },
    {
        title: 'Noha Salem',
        content: "My experience in Sri Lanka has been truly special.It's my first time traveling abroad, and this country made it unforgettable.Sri Lanka feels safe, warm, and welcoming — the people are genuinely kind and generous.For the first time, I felt deeply connected to a place in a way I had never experienced before,and despite being far from home, I never felt like a stranger here.",
        imageUrl: null,
        _localImg: image3,
    },
    {
        title: 'Incoming Global Talent ',
        content: "Moving between different cities and landscapes felt like a journey within a journey, each place offering its own charm, culture, and traditions.Of course, like any real experience, there were small challenges along the way — but nothing that couldn't be handled or learned from.Overall, it's a trip filled with growth, discovery, and beautiful moments I'll always carry with me.",
        imageUrl: null,
        _localImg: image4,
    },
];

const Carousel = () => {
    const [slides, setSlides] = useState(fallbackSlides);
    const [current, setCurrent] = useState(0);

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

    // Split slides into left and right columns
    const leftSlides = slides.filter((_, i) => i % 2 === 0);
    const rightSlides = slides.filter((_, i) => i % 2 === 1);

    const [currentLeft, setCurrentLeft] = useState(0);
    const [currentRight, setCurrentRight] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLeft((prev) => (prev + 1) % (leftSlides.length || 1));
            setCurrentRight((prev) => (prev + 1) % (rightSlides.length || 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [leftSlides.length, rightSlides.length]);

    const leftSlide = leftSlides[currentLeft];
    const rightSlide = rightSlides[currentRight];

    return (
        <div className="w-screen flex justify-center mt-10">
            <div className="xl:w-3/4 overflow-hidden w-full mx-10">
                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-6 md:gap-8">
                    {/* Left Side */}
                    {leftSlide && (
                        <div className="flex flex-col">
                            <div className="relative h-80 mb-4">
                                {leftSlide.imageUrl ? (
                                    <img
                                        src={leftSlide.imageUrl}
                                        alt={leftSlide.title || "Experience"}
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                ) : leftSlide._localImg ? (
                                    <Image
                                        src={leftSlide._localImg}
                                        alt={leftSlide.title || "Experience"}
                                        width={300}
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-lg bg-aiesec-light-grey flex items-center justify-center text-aiesec-dark-grey">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-lg">
                                <h2 className="font-semibold text-sm md:text-base text-center">{leftSlide.name || leftSlide.title}</h2>
                                <p className="text-xs md:text-sm text-center mt-2">{leftSlide.content}</p>
                            </div>
                        </div>
                    )}

                    {/* Right Side */}
                    {rightSlide && (
                        <div className="flex flex-col">
                            <div className="relative h-80 mb-4">
                                {rightSlide.imageUrl ? (
                                    <img
                                        src={rightSlide.imageUrl}
                                        alt={rightSlide.title || "Experience"}
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                ) : rightSlide._localImg ? (
                                    <Image
                                        src={rightSlide._localImg}
                                        alt={rightSlide.title || "Experience"}
                                        width={300}
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-lg bg-aiesec-light-grey flex items-center justify-center text-aiesec-dark-grey">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-lg">
                                <h2 className="font-semibold text-sm md:text-base text-center">{rightSlide.name || rightSlide.title}</h2>
                                <p className="text-xs md:text-sm text-center mt-2">{rightSlide.content}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-6 gap-6">
                    {/* Left Indicators */}
                    <div className="flex gap-2">
                        {leftSlides.map((_, index) => (
                            <span
                                key={`left-${index}`}
                                onClick={() => setCurrentLeft(index)}
                                className={`w-3 h-3 cursor-pointer rounded-full transition-colors ${index === currentLeft ? "bg-aiesec-blue" : "bg-aiesec-mid-grey"
                                    }`}
                            />
                        ))}
                    </div>
                    {/* Right Indicators */}
                    <div className="flex gap-2">
                        {rightSlides.map((_, index) => (
                            <span
                                key={`right-${index}`}
                                onClick={() => setCurrentRight(index)}
                                className={`w-3 h-3 cursor-pointer rounded-full transition-colors ${index === currentRight ? "bg-aiesec-blue" : "bg-aiesec-mid-grey"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel;