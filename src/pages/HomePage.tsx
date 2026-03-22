import { HeroSection } from '@/components/home/HeroSection';
import { BrandStripSection } from '@/components/home/BrandStripSection';
import { ValuePropsSection } from '@/components/home/ValuePropsSection';
import { MetricsSection } from '@/components/home/MetricsSection';
import { ProjectsShowcaseSection } from '@/components/home/ProjectsShowcaseSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { EventsSpotlightSection } from '@/components/home/EventsSpotlightSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

export function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <BrandStripSection />
      <ValuePropsSection />
      <MetricsSection />
      <ProjectsShowcaseSection />
      <ProcessSection />
      <EventsSpotlightSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
