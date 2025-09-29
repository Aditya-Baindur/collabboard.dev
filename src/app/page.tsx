import CTA from '@/components/Home/CTA';
import EmailSignup from '@/components/Home/EmailSignup';
import FAQ from '@/components/Home/FAQ';
import FeatureHighlights from '@/components/Home/FeatureHighlights';
import Footer from '@/components/Home/Footer';
import Hero from '@/components/Home/Intro';
import LibraryShowcase from '@/components/Home/LibraryShowcase';
import Pricing from '@/components/Home/Pricing';
import Testimonials from '@/components/Home/Testimonials';

export default function Home() {
  return (
    <div className="bg-company-bg text-slate-900">
      <Hero />
      <FeatureHighlights />
      <EmailSignup />
      <LibraryShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
