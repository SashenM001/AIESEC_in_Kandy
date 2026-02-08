import React from "react";


function HomeVideo() {

  return (
    <section id="home" className="relative w-screen overflow-hidden">
      <div className="w-screen z-0 sm:mt-0 mt-20">
        <video src={require("@public/assets/images/landing/top-banner.mp4")} muted autoPlay loop className="w-full h-auto object-cover" />
      </div>
    </section>
  );
}

export default HomeVideo;
