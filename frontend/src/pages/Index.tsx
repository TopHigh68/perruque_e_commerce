import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { TrustBadges } from '@/components/home/TrustBadges';
import { FeaturedWigs } from '@/components/home/FeaturedWigs';
import { Transformations } from '@/components/home/Transformations';
import { Benefits } from '@/components/home/Benefits';
import { CareGuide } from '@/components/home/CareGuide';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { CallToAction } from '@/components/home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <FeaturedWigs />
        <Transformations />
        <Benefits />
        <CareGuide />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
