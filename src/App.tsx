import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ChatBot from "@/components/ChatBot/ChatBot";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Solutions sub-pages
import SolutionAIAgents from "./pages/solutions/AIAgentsSolution";
import BusinessAutomation from "./pages/solutions/BusinessAutomation";
import WhatsAppAutomation from "./pages/solutions/WhatsAppAutomation";
import CRMAutomation from "./pages/solutions/CRMAutomation";
import WorkflowAutomation from "./pages/solutions/WorkflowAutomation";

// Industries sub-pages
import Agencies from "./pages/industries/Agencies";
import Consultants from "./pages/industries/Consultants";
import Coaches from "./pages/industries/Coaches";
import RealEstate from "./pages/industries/RealEstate";
import Ecommerce from "./pages/industries/Ecommerce";

// Legacy service pages
import Chatbots from "./pages/services/Chatbots";
import CRM from "./pages/services/CRM";
import Automation from "./pages/services/Automation";
import AIAgents from "./pages/services/AIAgents";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
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
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
