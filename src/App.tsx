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

// Initialize Lenis smooth scroll — heavier duration for cinematic feel
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 1.5,
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
        <Navbar />
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

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroDone(true);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <ContactPopupProvider>
          <EngagementProvider>
            <TooltipProvider>
              {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
              <div style={{ opacity: introDone ? 1 : 0, transition: 'opacity 0.6s ease-out' }}>
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
