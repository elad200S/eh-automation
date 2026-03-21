import { SEOHead, OrganizationSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';

import HeroSection from '@/components/sections/HeroSection';
import ValuePropositionSection from '@/components/sections/ValuePropositionSection';
import SolutionsOverviewSection from '@/components/sections/SolutionsOverviewSection';
import ProcessSection from '@/components/sections/ProcessSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import ToolsSection from '@/components/sections/ToolsSection';
import ProblemSection from '@/components/sections/ProblemSection';
import FAQSection from '@/components/sections/FAQSection';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <>
      <SEOHead
        title="EH Automation | סטודיו לאוטומציה עסקית ובינה מלאכותית"
        description="סטודיו לאוטומציה עסקית ובינה מלאכותית. סוכני AI, אוטומציית WhatsApp, תהליכי CRM ומערכות חכמות לעסקים קטנים, סוכנויות ויועצים."
        path="/"
      />
      <OrganizationSchema />
      
      <Navbar />
      <main className="bg-background min-h-screen">
        <HeroSection />
        <ValuePropositionSection />
        <SolutionsOverviewSection />
        <ProcessSection />
        <UseCasesSection />
        <ToolsSection />
        <ProblemSection />
        <FAQSection />
        <AboutSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </main>
      
      
      <AccessibilityButton />
      <CookieConsent />
    </>
  );
};

export default Index;
