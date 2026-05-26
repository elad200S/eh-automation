import { lazy, Suspense } from 'react';
import { SEOHead, OrganizationSchema } from '@/lib/seo';
import ParticleField from '@/components/ParticleField';
import ScrollOrb from '@/components/ScrollOrb';
import SpotlightCursor from '@/components/CustomCursor';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';

const ProcessSection = lazy(() => import('@/components/sections/ProcessSection'));

const DemoVideoSection = lazy(() => import('@/components/sections/DemoVideoSection'));
const AutomationShowcaseSection = lazy(() => import('@/components/sections/AutomationShowcaseSection'));
const ToolsSection = lazy(() => import('@/components/sections/ToolsSection'));
const AutomationAnimation = lazy(() => import('@/components/sections/AutomationAnimation'));
const SolutionsOverviewSection = lazy(() => import('@/components/sections/SolutionsOverviewSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));
const Footer = lazy(() => import('@/components/sections/Footer'));

const Index = () => {
  return (
    <>
      <SEOHead
        title="EH Automation | אוטומציות ו-AI לעסקים"
        description="מערכות אוטומציה מותאמות אישית לניהול לידים, מעקב אחרי לקוחות, וחיסכון בעבודה ידנית — כדי שהעסק יעבוד בצורה חלקה וברורה."
        path="/"
      />
      <OrganizationSchema />
      
      <ParticleField />
      <ScrollOrb />
      <SpotlightCursor />
      <main className="relative z-10 bg-transparent min-h-screen">
        <HeroSection />
        <ProblemSection />
        <Suspense fallback={null}>
          <ProcessSection />
          <AutomationSolutionsSection />
          <DemoVideoSection />
          <AutomationShowcaseSection />
          <ToolsSection />
          <AutomationAnimation />
          <SolutionsOverviewSection />
          <AboutSection />
          <FAQSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
