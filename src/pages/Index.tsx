import { Helmet } from 'react-helmet-async';
import AccessibilityButton from '@/components/AccessibilityButton';
import CookieConsent from '@/components/CookieConsent';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ToolsSection from '@/components/sections/ToolsSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import WhyNowSection from '@/components/sections/WhyNowSection';
import ProcessSection from '@/components/sections/ProcessSection';
import QualificationSection from '@/components/sections/QualificationSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EH Automation | אוטומציה עסקית ובינה מלאכותית</title>
        <meta 
          name="description" 
          content="אוטומציה עסקית מתקדמת לעסקים קטנים וסטארטאפים. חיבור מערכות, ייעול תהליכים ושילוב בינה מלאכותית להפחתת תלות בעובדים וצמיחה יציבה." 
        />
        <meta name="keywords" content="אוטומציה עסקית, חיבור מערכות, בינה מלאכותית, ייעול תהליכים, Make, Airtable" />
        <meta name="author" content="Elad Hanina - EH Automation" />
        <link rel="canonical" href="https://ehautomation.co.il" />
        <html lang="he" dir="rtl" />
      </Helmet>
      
      <main className="bg-background min-h-screen">
        <HeroSection />
        <AboutSection />
        <ProblemSection />
        <SolutionSection />
        <ToolsSection />
        <UseCasesSection />
        <WhyNowSection />
        <ProcessSection />
        <QualificationSection />
        <ContactSection />
        <Footer />
      </main>
      
      <AccessibilityButton />
      <CookieConsent />
    </>
  );
};

export default Index;
