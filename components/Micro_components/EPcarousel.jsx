import React, { useEffect, useState } from "react"
import Image from "next/image";
import image1 from "@public/assets/images/testimonials/EP 1 GT.jpeg";
import image2 from "@public/assets/images/testimonials/ep 1 gt2.jpeg";
import image3 from "@public/assets/images/testimonials/ep 2 gt 2.jpeg";
import image4 from "@public/assets/images/testimonials/ep2 gt .jpeg";

const Carousel = () => {
    const ep1Images = [image1, image2];
    const ep2Images = [image3, image4];
    const slides = [
        {
            id: 1,
            title: 'Outgoing Global Talent',
            content: "I’m truly grateful for the wonderful opportunity to undertake an internship at Manipal University, India. This experience means a lot to me, both personally and professionally. "
        },
        {
            id: 2,
            title: 'The Most Remarkable Occasion',
            content: "This internship is not just a step in my academic journey, but one of the best opportunities of my life, helping me grow, learn, and build a strong foundation for my future career. I’m excited to gain new skills, embrace new challenges, and represent my country with pride.Thank you once again for opening this door to a brighter future. AIESEC in Kandy 🇱🇰 🤝 🇮🇳"
        },
        {
            id: 3,
            title: 'Noha Salem',
            content: "My experience in Sri Lanka has been truly special.It’s my first time traveling abroad, and this country made it unforgettable.Sri Lanka feels safe, warm, and welcoming — the people are genuinely kind and generous.For the first time, I felt deeply connected to a place in a way I had never experienced before,and despite being far from home, I never felt like a stranger here."
        },
        {
            id: 4,
            title: 'Incoming Global Talent ',
            content: "Moving between different cities and landscapes felt like a journey within a journey, each place offering its own charm, culture, and traditions.Of course, like any real experience, there were small challenges along the way — but nothing that couldn’t be handled or learned from.Overall, it’s a trip filled with growth, discovery, and beautiful moments I’ll always carry with me."
        }

    ]

    const [currentEp1, setCurrentEp1] = useState(0);
    const [currentEp2, setCurrentEp2] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentEp1((prev) => (prev + 1) % ep1Images.length);
            setCurrentEp2((prev) => (prev + 1) % ep2Images.length);
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="w-screen flex justify-center mt-10">
            <div className="xl:w-3/4 overflow-hidden w-full mx-10">
                {/* Two Column Layout - EP1 on Left, EP2 on Right */}
                <div className="grid grid-cols-2 gap-6 md:gap-8">
                    {/* EP1 Left Side */}
                    <div className="flex flex-col">
                        <div className="relative h-80 mb-4">
                            <Image
                                src={ep1Images[currentEp1]}
                                alt="EP 1"
                                width={300}
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-lg">
                            <h2 className="font-semibold text-sm md:text-base text-center">{slides[currentEp1].title}</h2>
                            <p className="text-xs md:text-sm text-center mt-2">{slides[currentEp1].content}</p>
                        </div>
                    </div>

                    {/* EP2 Right Side */}
                    <div className="flex flex-col">
                        <div className="relative h-80 mb-4">
                            <Image
                                src={ep2Images[currentEp2]}
                                alt="EP 2"
                                width={300}
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-lg">
                            <h2 className="font-semibold text-sm md:text-base text-center">{slides[currentEp2 + 2]?.title || slides[2].title}</h2>
                            <p className="text-xs md:text-sm text-center mt-2">{slides[currentEp2 + 2]?.content || slides[2].content}</p>
                        </div>
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-6 gap-6">
                    {/* EP1 Indicators */}
                    <div className="flex gap-2">
                        {ep1Images.map((_, index) => (
                            <span
                                key={`ep1-${index}`}
                                onClick={() => setCurrentEp1(index)}
                                className={`w-3 h-3 cursor-pointer rounded-full transition-colors ${index === currentEp1 ? "bg-aiesec-blue" : "bg-aiesec-mid-grey"
                                    }`}
                            />
                        ))}
                    </div>
                    {/* EP2 Indicators */}
                    <div className="flex gap-2">
                        {ep2Images.map((_, index) => (
                            <span
                                key={`ep2-${index}`}
                                onClick={() => setCurrentEp2(index)}
                                className={`w-3 h-3 cursor-pointer rounded-full transition-colors ${index === currentEp2 ? "bg-aiesec-blue" : "bg-aiesec-mid-grey"
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