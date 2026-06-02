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
import { useEffect, useState, useRef, lazy, Suspense } from "react";
// Note: gsap + ScrollTrigger kept for Lenis sync only
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { ContactPopupProvider } from "@/contexts/ContactPopupContext";
import { EngagementProvider, useEngagement } from "@/contexts/EngagementContext";
import ContactPopup from "@/components/ContactPopup";
import TimedCTAPopup from "@/components/TimedCTAPopup";
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
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

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

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.4,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 1.5,
});

gsap.registerPlugin(ScrollTrigger);

// Drive Lenis through GSAP's ticker so ScrollTrigger scrub stays in sync
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);

const LEAD_POPUP_DELAY_MS = 40_000; // 40s
const LEAD_POPUP_STORAGE_KEY = "timed_cta_dismissed";
const POPUP_ID_LEAD = "lead-form-popup";

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/chatbots" element={<Chatbots />} />
          <Route path="/services/crm" element={<CRM />} />
          <Route path="/services/automation" element={<Automation />} />
          <Route path="/services/ai-agents" element={<AIAgents />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};



/** Inner component that can use EngagementContext */
const AppInner = () => {
  const [isTimedPopupOpen, setIsTimedPopupOpen] = useState(false);
  const { isAnyPopupOpen, hasInteracted, registerPopup, unregisterPopup, wasShown, markShown } = useEngagement();
  const shownRef = useRef(false);

  // Popup 2: Lead form at 40s
  useEffect(() => {
    if (sessionStorage.getItem(LEAD_POPUP_STORAGE_KEY)) return;

    const timer = window.setTimeout(() => {
      if (shownRef.current) return;
      // If user already interacted or another popup is open, skip
      if (hasInteracted || isAnyPopupOpen) {
        // Retry once after 5s gap
        const retry = window.setTimeout(() => {
          if (!shownRef.current && !hasInteracted && !isAnyPopupOpen) {
            shownRef.current = true;
            setIsTimedPopupOpen(true);
            markShown(POPUP_ID_LEAD);
            registerPopup(POPUP_ID_LEAD);
          }
        }, 5000);
        return () => window.clearTimeout(retry);
      }

      shownRef.current = true;
      setIsTimedPopupOpen(true);
      markShown(POPUP_ID_LEAD);
      registerPopup(POPUP_ID_LEAD);
    }, LEAD_POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimedPopupClose = () => {
    setIsTimedPopupOpen(false);
    unregisterPopup(POPUP_ID_LEAD);
    sessionStorage.setItem(LEAD_POPUP_STORAGE_KEY, "true");
  };

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
          <Suspense fallback={
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '3px solid rgba(16,185,129,0.2)',
                borderTopColor: 'hsl(160,84%,39%)',
                animation: 'spin 0.7s linear infinite',
              }} />
            </div>
          }>
            <RoutesWithTransition />
          </Suspense>
        </div>
      </ErrorBoundary>
      <ChatBot />
      <AccessibilityButton />
      <CookieConsent />
      <ContactPopup />
      <TimedCTAPopup isOpen={isTimedPopupOpen} onClose={handleTimedPopupClose} />
    </BrowserRouter>
  );
};

// Detect if this load is a genuine browser refresh (F5 / reload button)
// vs a regular navigation between pages
const isPageReload = (): boolean => {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === 'reload';
};

const App = () => {
  const reload   = isPageReload();
  const hasPlayed = !!sessionStorage.getItem(INTRO_STORAGE_KEY);

  // Show intro on: first visit this session OR genuine browser refresh
  const [showIntro, setShowIntro] = useState(reload || !hasPlayed);
  const [introDone, setIntroDone] = useState(!reload && hasPlayed);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    setShowIntro(false);
    setIntroDone(true);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
