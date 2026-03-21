import { SEOHead, OrganizationSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';

import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ProcessSection from '@/components/sections/ProcessSection';
import WhatYouGetSection from '@/components/sections/WhatYouGetSection';
import AutomationAnimation from '@/components/sections/AutomationAnimation';
import SolutionsOverviewSection from '@/components/sections/SolutionsOverviewSection';
import ToolsSection from '@/components/sections/ToolsSection';
import FAQSection from '@/components/sections/FAQSection';
import AboutSection from '@/components/sections/AboutSection';

import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <>
      <SEOHead
        title="EH Automation | מערכות אוטומציה ו-AI לעסקים"
        description="פתרונות מותאמים אישית לניהול לידים, מעקב אחרי לקוחות, ואוטומציה של תהליכים — כדי שתוכל להתמקד בצמיחה של העסק."
        path="/"
      />
      <OrganizationSchema />
      
      <Navbar />
      <main className="bg-background min-h-screen">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <AutomationAnimation />
        <WhatYouGetSection />
        <SolutionsOverviewSection />
        <ToolsSection />
        <FAQSection />
        <AboutSection />
        
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
