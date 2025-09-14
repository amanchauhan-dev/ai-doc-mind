/* eslint-disable @next/next/no-img-element */
import React from "react";

interface FeatureCardProps {
    icon: string;       // path to icon image
    title: string;
    description: string;

}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <>
            <div className="feature-card flex flex-col items-center text-center p-6 rounded-2xl shadow-md transition-transform hover:scale-105">

                {/* Icon */}
                <div className="icon w-16 h-16 mb-4 flex items-center justify-center">
                    <img src={icon} alt={title} className="w-16 h-16 object-contain" />
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-2">{title}</h2>

                {/* Description */}
                <p className="text-gray-600 mb-4">{description}</p>
            </div>
        </>
    );
};

export default FeatureCard;
