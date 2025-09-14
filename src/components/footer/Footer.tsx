"use client";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#61e8fd] dark:from-[#4effcd] to-[#dd9d07] dark:to-[#61e8fd]  text-black">
      <div className="container py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        {/* Brand */}
        <span className="font-semibold text-lg ml-10">Ai DocMind</span>

        {/* Navigation */}
        <ul className="flex gap-6">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#features" className="hover:underline">Features</a></li>
          <li><a href="#workflow" className="hover:underline">Workflow</a></li>
        </ul>

        {/* Credits */}
        <span className="text-xs text-center md:text-right opacity-90 mr-5">
          © {new Date().getFullYear()} Ai DocMind · Built by{" "} <br />
          Aman Chauhan, Ashish Jha, <br />Tushar Behera &amp; Raghav Mandal
        </span>
      </div>
    </footer>

  );
}

export default Footer;
