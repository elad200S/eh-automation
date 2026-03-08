import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import AccessibilityButton from '@/components/AccessibilityButton';
import CookieConsent from '@/components/CookieConsent';
import ChatBot from '@/components/ChatBot/ChatBot';
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
      <Helmet>
        <title>EH Automation | סטודיו לאוטומציה עסקית ובינה מלאכותית</title>
        <meta 
          name="description" 
          content="סטודיו לאוטומציה עסקית ובינה מלאכותית. סוכני AI, אוטומציית WhatsApp, תהליכי CRM ומערכות חכמות לעסקים קטנים, סוכנויות ויועצים." 
        />
        <meta name="keywords" content="אוטומציה עסקית, סוכני AI, אוטומציית WhatsApp, CRM, Make, Airtable, בינה מלאכותית" />
        <meta name="author" content="Elad Hanina - EH Automation" />
        <link rel="canonical" href="https://ehautomation.co.il" />
        <html lang="he" dir="rtl" />
      </Helmet>
      
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* 1. Hero */}
        <HeroSection />
        {/* 2. Value proposition / what we do */}
        <ValuePropositionSection />
        {/* 3. Solutions overview with links */}
        <SolutionsOverviewSection />
        {/* 4. How it works */}
        <ProcessSection />
        {/* 5. Automation use cases */}
        <UseCasesSection />
        {/* 6. Tools and platforms */}
        <ToolsSection />
        {/* 7. Business pain points */}
        <ProblemSection />
        {/* 8. FAQ */}
        <FAQSection />
        {/* 9. About the founder */}
        <AboutSection />
        {/* 10. CTA section */}
        <CTASection />
        {/* 11. Contact form */}
        <ContactSection />
        <Footer />
      </main>
      
      <ChatBot />
      <AccessibilityButton />
      <CookieConsent />
    </>
  );
};

export default Index;
