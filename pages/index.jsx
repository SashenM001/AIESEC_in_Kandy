import Nav from "@components/Nav";
import HomeVideo from "@components/homevideo";
import Counter from "@components/CounterSection";
import About from "@components/About";
import EPCarousel from "@components/carousel";
import Partners from "@components/partners";
import FnQ from "@components/FnQ";
import NewsAndEvents from "@components/NewsAndEvents";
import Footer from "@components/Footer";
import HtmlHead from "@components/HtmlHead";
import SplashScreen from "@components/SplashScreen";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";


const MainPage = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);

  return (
    <>
      <HtmlHead title={"AIESEC in University of Peradeniya"}
        description={"AIESEC is a global platform for young people to explore and develop their leadership potential."} />

      {isLoading && isHome ? (
        <SplashScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <div className=" overflow-hidden">
          <Nav />
          <HomeVideo />
          <Counter />
          <About />
          <NewsAndEvents />
          <EPCarousel />
          <Partners />
          <FnQ />
          <Footer />
        </div>
      )}


    </>
  )
}


MainPage.displayName = 'Home Page';

export default MainPage;