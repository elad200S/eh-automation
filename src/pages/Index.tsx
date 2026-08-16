import { lazy, Suspense } from 'react';
import { SEOHead, OrganizationSchema } from '@/lib/seo';
import ParticleField from '@/components/ParticleField';
import ScrollOrb from '@/components/ScrollOrb';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import CinematicReveal from '@/components/CinematicReveal';

const ProcessSection = lazy(() => import('@/components/sections/ProcessSection'));
const DemoVideoSection = lazy(() => import('@/components/sections/DemoVideoSection'));
const AutomationShowcaseSection = lazy(() => import('@/components/sections/AutomationShowcaseSection'));
const ToolsSection = lazy(() => import('@/components/sections/ToolsSection'));
const AutomationAnimation = lazy(() => import('@/components/sections/AutomationAnimation'));
const SolutionsOverviewSection = lazy(() => import('@/components/sections/SolutionsOverviewSection'));
const StickyStackingCardsSection = lazy(() => import('@/components/sections/StickyStackingCardsSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));
const Footer = lazy(() => import('@/components/sections/Footer'));

const Index = () => {
  return (
    <>
      <SEOHead
        title="HEY Digital | פתרונות אוטומציה ופיתוח לעסקים"
        description="אפיון, פיתוח והטמעת מערכות אוטומציה מתקדמות לעסקים, אינטגרציות CRM וייעול תהליכי עבודה."
        path="/"
      />
      <OrganizationSchema />

      <ParticleField />
      <ScrollOrb />
      <main className="relative z-10 bg-transparent min-h-screen">

        {/* Hero — has its own entrance animation */}
        <HeroSection />

        <CinematicReveal index={1}><ProblemSection /></CinematicReveal>

        <Suspense fallback={null}>
          <CinematicReveal index={2}><ProcessSection /></CinematicReveal>
          <CinematicReveal index={3}><DemoVideoSection /></CinematicReveal>
          <AutomationShowcaseSection />
          <CinematicReveal index={5}><ToolsSection /></CinematicReveal>
          <CinematicReveal index={6}><AutomationAnimation /></CinematicReveal>
          <CinematicReveal index={7}><SolutionsOverviewSection /></CinematicReveal>

          {/* Not wrapped in CinematicReveal on purpose — its transform would break the sticky/fixed positioning below */}
          <StickyStackingCardsSection />

          <CinematicReveal index={8}><AboutSection /></CinematicReveal>
          <CinematicReveal index={9}><FAQSection /></CinematicReveal>
          <CinematicReveal index={10}><ContactSection /></CinematicReveal>
          <Footer />
        </Suspense>

      </main>
    </>
  );
};

export default Index;
