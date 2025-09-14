import Navbar from '@/components/navbar/Navbar';

import '@/app/globals.css'
import WorkFlow from '@/components/workFlow/workFlow';
import Footer from '@/components/footer/Footer';
import FeaturesSection from '@/components/features/FeaturesSection';
import Hero from '@/components/hero/hero';

export default function Page() {
    return (
        <>
            <section >
                <Navbar />
                <Hero />
                <FeaturesSection />
                <WorkFlow />
                <Footer />
            </section>
        </>
    );
}
