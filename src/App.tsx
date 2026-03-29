import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ChatBot from "@/components/ChatBot/ChatBot";
import AccessibilityButton from "@/components/AccessibilityButton";
import CookieConsent from "@/components/CookieConsent";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { ContactPopupProvider } from "@/contexts/ContactPopupContext";
import { EngagementProvider, useEngagement } from "@/contexts/EngagementContext";
import ContactPopup from "@/components/ContactPopup";
import TimedCTAPopup from "@/components/TimedCTAPopup";
import Index from "./pages/Index";

// Lazy-loaded pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Industries = lazy(() => import("./pages/Industries"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// Solutions sub-pages
const SolutionAIAgents = lazy(() => import("./pages/solutions/AIAgentsSolution"));
const BusinessAutomation = lazy(() => import("./pages/solutions/BusinessAutomation"));
const WhatsAppAutomation = lazy(() => import("./pages/solutions/WhatsAppAutomation"));
const CRMAutomation = lazy(() => import("./pages/solutions/CRMAutomation"));
const WorkflowAutomation = lazy(() => import("./pages/solutions/WorkflowAutomation"));

// Industries sub-pages
const Agencies = lazy(() => import("./pages/industries/Agencies"));
const Consultants = lazy(() => import("./pages/industries/Consultants"));
const Coaches = lazy(() => import("./pages/industries/Coaches"));
const RealEstate = lazy(() => import("./pages/industries/RealEstate"));
const Ecommerce = lazy(() => import("./pages/industries/Ecommerce"));

// Legacy service pages
const Chatbots = lazy(() => import("./pages/services/Chatbots"));
const CRM = lazy(() => import("./pages/services/CRM"));
const Automation = lazy(() => import("./pages/services/Automation"));
const AIAgents = lazy(() => import("./pages/services/AIAgents"));

const queryClient = new QueryClient();

const LEAD_POPUP_DELAY_MS = 40_000; // 40s
const LEAD_POPUP_STORAGE_KEY = "timed_cta_dismissed";
const POPUP_ID_LEAD = "lead-form-popup";

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
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Solutions */}
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/ai-agents" element={<SolutionAIAgents />} />
        <Route path="/solutions/business-automation" element={<BusinessAutomation />} />
        <Route path="/solutions/whatsapp-automation" element={<WhatsAppAutomation />} />
        <Route path="/solutions/crm-automation" element={<CRMAutomation />} />
        <Route path="/solutions/workflow-automation" element={<WorkflowAutomation />} />

        {/* Industries */}
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/agencies" element={<Agencies />} />
        <Route path="/industries/consultants" element={<Consultants />} />
        <Route path="/industries/coaches" element={<Coaches />} />
        <Route path="/industries/real-estate" element={<RealEstate />} />
        <Route path="/industries/ecommerce" element={<Ecommerce />} />

        {/* Top-level pages */}
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Legacy service pages */}
        <Route path="/services/chatbots" element={<Chatbots />} />
        <Route path="/services/crm" element={<CRM />} />
        <Route path="/services/automation" element={<Automation />} />
        <Route path="/services/ai-agents" element={<AIAgents />} />

        {/* Legal */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <ChatBot />
      <AccessibilityButton />
      <CookieConsent />
      <ContactPopup />
      <TimedCTAPopup isOpen={isTimedPopupOpen} onClose={handleTimedPopupClose} />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ContactPopupProvider>
          <EngagementProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppInner />
            </TooltipProvider>
          </EngagementProvider>
        </ContactPopupProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
