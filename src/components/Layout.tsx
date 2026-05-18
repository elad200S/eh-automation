import { ReactNode } from 'react';
import Footer from '@/components/sections/Footer';

import AccessibilityButton from '@/components/AccessibilityButton';
import CookieConsent from '@/components/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="bg-background min-h-screen pt-16">
        {children}
      </main>
      <Footer />
      <AccessibilityButton />
      <CookieConsent />
    </>
  );
};

export default Layout;
