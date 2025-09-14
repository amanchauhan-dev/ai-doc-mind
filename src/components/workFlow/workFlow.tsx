import React from "react";
import { ArrowRight } from "lucide-react"; // clean arrow icon
import WorkFlowCard from "./workFlowCard";

const WorkFlow: React.FC = () => {
    return (
        <section className="features py-16 shadow-md relative overflow-hidden">
            <div className="text-center text-2xl font-extrabold mb-10">
                Smart Work-flow
            </div>

            {/* Background Glow Blob */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] md:w-[350px] md:h-[400px] bg-[#ffb300] dark:bg-[#4effcd] rounded-full blur-[120px] opacity-50 dark:opacity-30 pointer-events-none" />

            {/* Workflow grid */}
            <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center relative z-10">
                {/* Step 1 */}
                <div className="relative flex flex-col items-center">
                    <WorkFlowCard
                        icon="/work-flow/upload.jpg"
                        title="Upload File"
                        description="Upload files through the simple UI that makes it easy."
                    />
                    {/* Arrow for desktop */}
                    <div className="hidden md:block absolute top-1/2 right-[-30px] transform -translate-y-1/2">
                        <ArrowRight size={40} className="text-gray-400" />
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col items-center">
                    <WorkFlowCard
                        icon="/work-flow/search.jpg"
                        title="Search File"
                        description="Ai DocMind helps you search efficiently with smart AI."
                    />
                    {/* Arrow for desktop */}
                    <div className="hidden md:block absolute top-1/2 right-[-30px] transform -translate-y-1/2">
                        <ArrowRight size={40} className="text-gray-400" />
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                    <WorkFlowCard
                        icon="/work-flow/download.jpg"
                        title="Download File"
                        description="A simple UI makes downloading files effortless."
                    />
                    {/* No arrow after the last card */}
                </div>
            </div>
        </section>
    );
};

export default WorkFlow;
