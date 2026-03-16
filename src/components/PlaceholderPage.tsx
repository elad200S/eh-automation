import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { useContactPopup } from '@/contexts/ContactPopupContext';

interface PlaceholderPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  description: string;
  showCTA?: boolean;
}

const PlaceholderPage = ({ title, metaTitle, metaDescription, headline, description, showCTA = true }: PlaceholderPageProps) => {
  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <html lang="he" dir="rtl" />
      </Helmet>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary mb-3">{title}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {headline}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>
            {showCTA && (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                שיחת אסטרטגיה
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Content placeholder */}
      <section className="pb-20">
        <div className="container">
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground text-sm">תוכן מלא יתווסף בקרוב</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PlaceholderPage;
