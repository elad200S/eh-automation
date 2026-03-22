import { SEOHead, OrganizationSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ToolsSection from '@/components/sections/ToolsSection';
import AboutSection from '@/components/sections/AboutSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <>
      <SEOHead
        title="EH Automation | אוטומציות ו-AI לעסקים"
        description="מערכות אוטומציה מותאמות אישית לניהול לידים, מעקב אחרי לקוחות, וחיסכון בעבודה ידנית — כדי שהעסק יעבוד בצורה חלקה וברורה."
        path="/"
      />
      <OrganizationSchema />
      
      <Navbar />
      <main className="bg-background min-h-screen">
        <HeroSection />
        <ProblemSection />
        <ProcessSection />
        <ToolsSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
