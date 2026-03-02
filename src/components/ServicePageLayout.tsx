import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';
import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface ServicePageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    subtext: string;
  };
  results: {
    title: string;
    items: string[];
  };
  deliverables: {
    title: string;
    content: string;
  };
  useCases: {
    title: string;
    scenarios: { title: string; description: string }[];
  };
  integrations: {
    title: string;
    platforms: string[];
  };
  process: {
    title: string;
    steps: { label: string; description: string }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
}

const ctaLabel = 'קבעו שיחת אסטרטגיה';

const ServicePageLayout = ({ data }: { data: ServicePageData }) => {
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`https://ehautomation.co.il/${data.slug}`} />
        <html lang="he" dir="rtl" />
      </Helmet>

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Section 1 – Hero */}
        <section className="min-h-[50vh] flex items-center relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background py-20 md:py-28">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                {data.hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                {data.hero.subtext}
              </p>
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-primary via-primary to-primary/80 text-primary-foreground rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              >
                {ctaLabel}
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Section 2 – תוצאות עסקיות */}
        <Section id="results">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {data.results.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {data.results.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 3 – מה אנחנו בונים בפועל */}
        <Section id="deliverables" className="bg-muted/30">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {data.deliverables.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-line">
            {data.deliverables.content}
          </p>
        </Section>

        {/* Section 4 – תרחישי שימוש */}
        <Section id="use-cases">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {data.useCases.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.useCases.scenarios.map((sc, i) => (
              <div key={i} className="interactive-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">{sc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{sc.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 5 – חיבורים ומערכות נתמכות */}
        <Section id="integrations" className="bg-muted/30">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {data.integrations.title}
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.integrations.platforms.map((p, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </Section>

        {/* Section 6 – תהליך עבודה */}
        <Section id="process">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            {data.process.title}
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {data.process.steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{step.label}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {i < data.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 -left-2 w-4 text-border">
                    <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Section 7 – שאלות נפוצות */}
        <Section id="faq" className="bg-muted/30">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {data.faq.title}
          </h2>
          <div className="max-w-2xl">
            <Accordion type="single" collapsible>
              {data.faq.items.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-right text-foreground">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-right">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* Section 8 – Final CTA */}
        <section className="py-20 bg-gradient-to-b from-background to-primary-light/30">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              בואו נדבר על איך לייעל את העסק שלכם
            </p>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-primary via-primary to-primary/80 text-primary-foreground rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {ctaLabel}
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServicePageLayout;
