
import HeroText from "./heroText";
import Spline from "@splinetool/react-spline";
import React from "react";

const Hero = () => {
    return (
        <section className="relative flex flex-col-reverse md:flex-row items-center justify-center md:justify-start min-h-screen overflow-hidden 
        bg-gradient-to-br  gap-4 -mt-3  md:gap-0">
            {/* Background Glow Blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] md:w-[300px] md:h-[400px] bg-[#ffb300] dark:bg-[#4effcd] rounded-full blur-[100px] opacity-50 dark:opacity-30 md:blur-[120px]" />
            <div className="absolute dark:bottom-[-100px] bottom-0 right-[100px] dark:right-[-100px] w-[350px] h-[350px] md:w-[300px] md:h-[400px] bg-[#61e8fd] dark:bg-[#61e8fd] rounded-full blur-[100px] opacity-70 dark:opacity-30  md:blur-[140px]" />

            {/* Spline 3D Model */}
            <div className="z-0 w-full h-[300px] md:w-[500px] md:h-[500px] pointer-events-none flex justify-center md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 ">
                <Spline scene="https://prod.spline.design/3c3rOBJxzYuK8lDA/scene.splinecode" />
            </div>
            {/* Hero Text */}
            <div className="z-10 px-6 md:px-12 w-full md:w-1/2 text-center md:text-left md:-mt-40">
                <HeroText />
            </div>

        </section>
    );
};

export default Hero;
