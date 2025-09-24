import CTA from '@/components/Home/CTA';
import FAQ from '@/components/Home/FAQ';
import FeatureHighlights from '@/components/Home/FeatureHighlights';
import Footer from '@/components/Home/Footer';
import Hero from '@/components/Home/Intro';
import Pricing from '@/components/Home/Pricing';
import Testimonials from '@/components/Home/Testimonials';
import WorkflowShowcase from '@/components/Home/WorkflowShowcase';

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <Hero />
      <FeatureHighlights />
      <WorkflowShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
