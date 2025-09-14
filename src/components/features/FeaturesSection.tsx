import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="features relative py-16 shadow-2xl overflow-hidden" >
            {/* Background Glow Blob (top-right corner) */}
            <div className="absolute top-[-90px] right-[-65px] w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-[#61e8fd] rounded-full blur-[140px] opacity-50 dark:opacity-50 pointer-events-none" />

            <div className="text-center text-2xl font-extrabold mb-10">
                Features Provided by-us
            </div>

            <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                <FeatureCard
                    icon="/feature/icon_1.png"
                    title="AI & Performance"
                    description="AI-Powered Efficiency: Turbocharge Your Document Management with Speed and Precision."
                />
                <FeatureCard
                    icon="/feature/quick.png"
                    title="Quick Access"
                    description="Instant Access with enterprise-grade encryption and access control."
                />
                <FeatureCard
                    icon="/feature/security.png"
                    title="Security"
                    description="Unparalleled Security for Total Peace of Mind with encryption and access control."
                />
            </div>
        </section>
    );
};

export default FeaturesSection;
