'use client';

import React from "react";
import { FlipWords } from "./flip-words";
import { motion } from "framer-motion";

const HeroText = () => {
    const words = [
        "Simplify",
        "Automate ",
        "Optimize",
        "Easy Access",
    ];

    const variants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="z-100 mt-0 md:mt-0 bg-clip-text rounded-3xl">
            {/* Desktop View */}
            <motion.div
                className="flex-col hidden md:flex items-start font-bold mb-5 gap-2"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-300"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Hello I am  <span className="text-neutral-900 dark:text-neutral-300">Ai DocMind</span>
                </motion.h1>

                <motion.div
                    className="flex flex-col items-start"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1, duration: 1 }}
                >
                    <p className="text-5xl font-extrabold text-neutral-900 dark:text-neutral-300">
                        Here i help you in
                        manages the files
                    </p>
                </motion.div>

                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.6, duration: 1 }}
                >
                    <FlipWords
                        words={words}
                        duration={2000}
                        className="text-6xl font-extrabold text-black dark:text-white p-0"
                    />
                </motion.div>

                <motion.p
                    className="text-4xl font-bold text-neutral-900 dark:text-neutral-300"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 2, duration: 1 }}
                >
                    Fast. Reliable. Intelligent.
                </motion.p>
            </motion.div>

            {/* Mobile View */}
            <div className="flex flex-col justify-center items-center md:hidden space-x-5">
                <motion.h1
                    className="text-2xl font-medium text-neutral-900 dark:text-neutral-300"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Welcome to <span className="text-neutral-900 dark:text-neutral-300">Ai DocMiner</span>
                </motion.h1>

                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1, duration: 1 }}
                >
                    <p className="text-4xl font-medium text-neutral-900 dark:text-neutral-300">
                        Ace your next test or interview
                    </p>
                </motion.div>

                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.6 }}
                >
                    <FlipWords
                        words={words}
                        duration={2000}
                        className="text-4xl font-extrabold text-black dark:text-white p-0"
                    />
                </motion.div>

                <motion.p
                    className="text-4xl font-medium text-neutral-900 dark:text-neutral-300"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 2, duration: 1 }}
                >
                    Search. Share. Paperless.
                </motion.p>
            </div>
        </div>
    );
};

export default HeroText;
