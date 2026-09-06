import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ChatBot from "@/components/ChatBot/ChatBot";
import AccessibilityButton from "@/components/AccessibilityButton";
import CookieConsent from "@/components/CookieConsent";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, lazy, Suspense } from "react";
// Note: gsap + ScrollTrigger kept for Lenis sync only
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { ContactPopupProvider } from "@/contexts/ContactPopupContext";
import { EngagementProvider } from "@/contexts/EngagementContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ContactPopup from "@/components/ContactPopup";
import ErrorBoundary from "@/components/ErrorBoundary";
import IntroScreen, { INTRO_STORAGE_KEY } from "@/components/IntroScreen";
import CinematicLayer from "@/components/CinematicLayer";
import AmbientBackground from "@/components/AmbientBackground";
import Index from "./pages/Index";

// Lazy-loaded pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Blog = lazy(() => import("./pages/Blog"));
const AutomationProcesses = lazy(() => import("./pages/blog/AutomationProcesses"));
const AIAgentForBusiness = lazy(() => import("./pages/blog/AIAgentForBusiness"));
const HowToChooseCRM = lazy(() => import("./pages/blog/HowToChooseCRM"));
const BlogWhatsAppAutomation = lazy(() => import("./pages/blog/WhatsAppAutomation"));
const BlogLeadFollowUp = lazy(() => import("./pages/blog/LeadFollowUp"));
const BlogWhatsAppBotGuide = lazy(() => import("./pages/blog/WhatsAppBotGuide"));
const BlogAutomationToolsComparison = lazy(() => import("./pages/blog/AutomationToolsComparison"));
const BlogAppointmentReminderAutomation = lazy(() => import("./pages/blog/AppointmentReminderAutomation"));
const BlogAICustomerService = lazy(() => import("./pages/blog/AICustomerService"));
const BlogCRMWhatsAppIntegration = lazy(() => import("./pages/blog/CRMWhatsAppIntegration"));
const BlogMarketingAutomation = lazy(() => import("./pages/blog/MarketingAutomation"));
const BlogRealEstateAutomation = lazy(() => import("./pages/blog/RealEstateAutomation"));
const BlogAiForSmallBusiness = lazy(() => import("./pages/blog/AiForSmallBusiness"));
const BlogClinicAutomation = lazy(() => import("./pages/blog/ClinicAutomation"));
const BlogWebsiteChatbotGuide = lazy(() => import("./pages/blog/WebsiteChatbotGuide"));
const BlogRestaurantAutomation = lazy(() => import("./pages/blog/RestaurantAutomation"));
const BlogN8nGuideIsrael = lazy(() => import("./pages/blog/N8nGuideIsrael"));
const BlogAiAgentReplacesEmployee = lazy(() => import("./pages/blog/AiAgentReplacesEmployee"));
const BlogEventsManagementAutomation = lazy(() => import("./pages/blog/EventsManagementAutomation"));
const BlogAutomationRoiCalculator = lazy(() => import("./pages/blog/AutomationRoiCalculator"));
const BlogCourseSalesAutomation = lazy(() => import("./pages/blog/CourseSalesAutomation"));
const BlogWhatsappBusinessApiGuide = lazy(() => import("./pages/blog/WhatsappBusinessApiGuide"));
const BlogZapierCompleteGuide = lazy(() => import("./pages/blog/ZapierCompleteGuide"));
const BlogBusinessAutomationGuide2026 = lazy(() => import("./pages/blog/BusinessAutomationGuide2026"));
const BlogBase44IsraeliStartupGuide = lazy(() => import("./pages/blog/Base44IsraeliStartupGuide"));
const BlogAiAgentBusinessGuide = lazy(() => import("./pages/blog/AiAgentBusinessGuide"));
const BlogLovableAiWebsiteBuilderGuide = lazy(() => import("./pages/blog/LovableAiWebsiteBuilderGuide"));
const BlogWhatIsVibeCodingGuide = lazy(() => import("./pages/blog/WhatIsVibeCodingGuide"));
const BlogLovableVsBase44VsCustomDev = lazy(() => import("./pages/blog/LovableVsBase44VsCustomDev"));
const BlogBusinessProcessOptimization = lazy(() => import("./pages/blog/BusinessProcessOptimization"));
const BlogBlogContentAutomationGuide = lazy(() => import("./pages/blog/BlogContentAutomationGuide"));
const BlogAutomationSystemsComparison = lazy(() => import("./pages/blog/AutomationSystemsComparison"));
const BlogGeoGenerativeEngineOptimizationGuide = lazy(() => import("./pages/blog/GeoGenerativeEngineOptimizationGuide"));
const BlogBeautySalonAutomation = lazy(() => import("./pages/blog/BeautySalonAutomation"));
const BlogSystemsIntegrationGuide = lazy(() => import("./pages/blog/SystemsIntegrationGuide"));
const BlogAiContentWritingGoogleRules = lazy(() => import("./pages/blog/AiContentWritingGoogleRules"));
const BlogSupabaseVsBase44BackendGuide = lazy(() => import("./pages/blog/SupabaseVsBase44BackendGuide"));
const BlogLovableVsFreelancerCostComparison = lazy(() => import("./pages/blog/LovableVsFreelancerCostComparison"));
const BlogAutomationImplementerGuide = lazy(() => import("./pages/blog/AutomationImplementerGuide"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Portal = lazy(() => import("./pages/Portal"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));

// Solutions sub-pages
const SolutionAIAgents = lazy(() => import("./pages/solutions/AIAgentsSolution"));
const BusinessAutomation = lazy(() => import("./pages/solutions/BusinessAutomation"));
const WhatsAppAutomation = lazy(() => import("./pages/solutions/WhatsAppAutomation"));
const CRMAutomation = lazy(() => import("./pages/solutions/CRMAutomation"));
const WorkflowAutomation = lazy(() => import("./pages/solutions/WorkflowAutomation"));

// Solutions - web development
const WebDevelopment = lazy(() => import("./pages/solutions/WebDevelopment"));

// Legacy service pages
const Chatbots = lazy(() => import("./pages/services/Chatbots"));
const CRM = lazy(() => import("./pages/services/CRM"));
const Automation = lazy(() => import("./pages/services/Automation"));
const AIAgents = lazy(() => import("./pages/services/AIAgents"));

const queryClient = new QueryClient();

// Initialize Lenis smooth scroll — applies to the whole site (this instance
// isn't scoped to any one section/page). Higher duration = slower, more
// relaxed glide on every scroll everywhere, not just the stacking-cards section.
//
// `syncTouch` is deliberately left off (Lenis' default): that's what makes
// Lenis take over touch scrolling on mobile and replay it through JS, which
// fights the OS's native momentum scroll and is a common cause of scroll
// "freezing" on phones. Leaving it off means mobile keeps native scrolling —
// still just as smooth, without that risk — while this smoothing applies to
// mouse-wheel/trackpad scrolling everywhere on desktop.
const lenis = new Lenis({
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

gsap.registerPlugin(ScrollTrigger);

// Drive Lenis through GSAP's ticker so ScrollTrigger scrub stays in sync
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);

const pageVariants: import('framer-motion').Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } },
};

const ADMIN_ROUTES = ['/login', '/portal', '/dashboard', '/auth'];

const NavbarWrapper = () => {
  const { pathname } = useLocation();
  if (ADMIN_ROUTES.some(r => pathname.startsWith(r))) return null;
  return <Navbar />;
};

const RoutesWithTransition = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.key} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/ai-agents" element={<SolutionAIAgents />} />
          <Route path="/solutions/business-automation" element={<BusinessAutomation />} />
          <Route path="/solutions/whatsapp-automation" element={<WhatsAppAutomation />} />
          <Route path="/solutions/crm-automation" element={<CRMAutomation />} />
          <Route path="/solutions/workflow-automation" element={<WorkflowAutomation />} />
          <Route path="/solutions/web-development" element={<WebDevelopment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/5-automation-processes" element={<AutomationProcesses />} />
          <Route path="/blog/ai-agent-for-business" element={<AIAgentForBusiness />} />
          <Route path="/blog/how-to-choose-crm" element={<HowToChooseCRM />} />
          <Route path="/blog/whatsapp-automation" element={<BlogWhatsAppAutomation />} />
          <Route path="/blog/lead-follow-up" element={<BlogLeadFollowUp />} />
          <Route path="/blog/whatsapp-bot-guide" element={<BlogWhatsAppBotGuide />} />
          <Route path="/blog/automation-tools-comparison" element={<BlogAutomationToolsComparison />} />
          <Route path="/blog/appointment-reminder-automation" element={<BlogAppointmentReminderAutomation />} />
          <Route path="/blog/ai-customer-service" element={<BlogAICustomerService />} />
          <Route path="/blog/crm-whatsapp-integration" element={<BlogCRMWhatsAppIntegration />} />
          <Route path="/blog/marketing-automation" element={<BlogMarketingAutomation />} />
          <Route path="/blog/real-estate-automation" element={<BlogRealEstateAutomation />} />
          <Route path="/blog/ai-for-small-business" element={<BlogAiForSmallBusiness />} />
          <Route path="/blog/clinic-automation" element={<BlogClinicAutomation />} />
          <Route path="/blog/website-chatbot-guide" element={<BlogWebsiteChatbotGuide />} />
          <Route path="/blog/restaurant-automation" element={<BlogRestaurantAutomation />} />
          <Route path="/blog/n8n-guide-israel" element={<BlogN8nGuideIsrael />} />
          <Route path="/blog/ai-agent-replaces-employee" element={<BlogAiAgentReplacesEmployee />} />
          <Route path="/blog/events-management-automation" element={<BlogEventsManagementAutomation />} />
          <Route path="/blog/automation-roi-calculator" element={<BlogAutomationRoiCalculator />} />
          <Route path="/blog/course-sales-automation" element={<BlogCourseSalesAutomation />} />
          <Route path="/blog/whatsapp-business-api-guide" element={<BlogWhatsappBusinessApiGuide />} />
          <Route path="/blog/zapier-complete-guide" element={<BlogZapierCompleteGuide />} />
          <Route path="/blog/business-automation-guide-2026" element={<BlogBusinessAutomationGuide2026 />} />
          <Route path="/blog/base44-israeli-startup-guide" element={<BlogBase44IsraeliStartupGuide />} />
          <Route path="/blog/ai-agent-business-guide" element={<BlogAiAgentBusinessGuide />} />
          <Route path="/blog/lovable-ai-website-builder-guide" element={<BlogLovableAiWebsiteBuilderGuide />} />
          <Route path="/blog/what-is-vibe-coding-guide" element={<BlogWhatIsVibeCodingGuide />} />
          <Route path="/blog/lovable-vs-base44-vs-custom-dev" element={<BlogLovableVsBase44VsCustomDev />} />
          <Route path="/blog/business-process-optimization" element={<BlogBusinessProcessOptimization />} />
          <Route path="/blog/blog-content-automation-guide" element={<BlogBlogContentAutomationGuide />} />
          <Route path="/blog/automation-systems-comparison" element={<BlogAutomationSystemsComparison />} />
          <Route path="/blog/geo-generative-engine-optimization-guide" element={<BlogGeoGenerativeEngineOptimizationGuide />} />
          <Route path="/blog/beauty-salon-automation" element={<BlogBeautySalonAutomation />} />
          <Route path="/blog/systems-integration-guide" element={<BlogSystemsIntegrationGuide />} />
          <Route path="/blog/ai-content-writing-google-rules" element={<BlogAiContentWritingGoogleRules />} />
          <Route path="/blog/supabase-vs-base44-backend-guide" element={<BlogSupabaseVsBase44BackendGuide />} />
          <Route path="/blog/lovable-vs-freelancer-cost-comparison" element={<BlogLovableVsFreelancerCostComparison />} />
          <Route path="/blog/automation-implementer-guide" element={<BlogAutomationImplementerGuide />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/chatbots" element={<Chatbots />} />
          <Route path="/services/crm" element={<CRM />} />
          <Route path="/services/automation" element={<Automation />} />
          <Route path="/services/ai-agents" element={<AIAgents />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};



/** Inner component that can use EngagementContext */
const AppInner = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <ErrorBoundary
        fallback={
          <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="max-w-md text-center space-y-4">
              <h1 className="text-2xl font-semibold text-foreground">משהו השתבש</h1>
              <p className="text-muted-foreground">אירעה תקלה בטעינת הדף. נסו לרענן או לחזור לדף הבית.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => window.location.reload()} className="cta-gradient">רענון</button>
                <a href="/" className="btn-outline">דף הבית</a>
              </div>
            </div>
          </div>
        }
      >
        <AmbientBackground />
        <CinematicLayer />
        <NavbarWrapper />
        <div>
          <Suspense fallback={<DelayedLoading />}>
            <RoutesWithTransition />
          </Suspense>
        </div>
      </ErrorBoundary>
      <ChatBot />
      <AccessibilityButton />
      <CookieConsent />
      <ContactPopup />
    </BrowserRouter>
  );
};

const detectReload = (): boolean => {
  try {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === 'reload') return true;
    if (typeof performance.navigation !== 'undefined') {
      return (performance.navigation as { type: number }).type === 1;
    }
  } catch { /* ignore */ }
  return false;
};

const DelayedLoading = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050B0D' }}>
      <span style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontWeight: 400,
        fontSize: 'clamp(13px, 2vw, 22px)',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: '#4FE0C4',
        textShadow: '0 0 14px rgba(11,184,112,0.9), 0 0 30px rgba(11,184,112,0.4)',
        animation: 'eh-pulse 1.4s ease-in-out infinite',
      }}>
        loading
      </span>
    </div>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(() => {
    const skip = ['/login', '/portal', '/dashboard', '/auth'];
    return !skip.some(r => window.location.pathname.startsWith(r));
  });
  const [introDone, setIntroDone] = useState(() => {
    const skip = ['/login', '/portal', '/dashboard', '/auth'];
    return skip.some(r => window.location.pathname.startsWith(r));
  });

  const handleIntroVisible  = () => setIntroDone(true);
  const handleIntroComplete = () => setShowIntro(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <ContactPopupProvider>
          <EngagementProvider>
            <TooltipProvider>
              {showIntro && <IntroScreen onVisible={handleIntroVisible} onComplete={handleIntroComplete} />}
              <div style={{ opacity: introDone ? 1 : 0, transition: 'opacity 0.3s ease-out' }}>
                <Toaster />
                <Sonner />
                <AppInner />
              </div>
            </TooltipProvider>
          </EngagementProvider>
        </ContactPopupProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
