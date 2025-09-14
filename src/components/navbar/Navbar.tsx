/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, FC } from "react";
import { motion } from "motion/react";
import { ProgressBarLink } from "@/context/progress-bar";

// Navigation component
const Navigation: FC = () => {
  return (
    <ul className="nav-ul text-black dark:text-white">
      <li className="nav-li">
        <a className="nav-link" href="#">
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#features">
          Features
        </a>
      </li>
    </ul>
  );
};

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Apply theme to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="relative inset-x-0 z-20 w-full backdrop-blur-lg text-black dark:text-white border-b border-gray-200">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Left: Logo */}
          <a href="#" className="text-xl font-bold transition-colors">
            DocMind
          </a>

          {/* Center: Navigation Links */}
          <nav className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2">
            <Navigation />
          </nav>

          {/* Right: Login + Theme Toggle + Mobile Toggle */}
          <div className="flex items-center gap-x-4">
            <ProgressBarLink href="/login">login</ProgressBarLink>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer sm:hidden focus:outline-none"
            >
              <img
                src={isOpen ? "/close.svg" : "/menu.svg"}
                className="w-6 h-6"
                alt="toggle"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <nav className="pb-5">
            <Navigation />
            <button className="mt-4 w-full bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition">
              <ProgressBarLink href="/login">login</ProgressBarLink>
            </button>
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
