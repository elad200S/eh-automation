import { ArrowLeft, CheckCircle2, Users, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEOHead, BreadcrumbSchema, FAQSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';
import { useContactPopup } from '@/contexts/ContactPopupContext';

export interface SolutionPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    label: string;
    headline: string;
    subtext: string;
  };
  whoIsItFor: {
    title: string;
    audiences: string[];
  };
  problems: {
    title: string;
    items: { title: string; description: string }[];
  };
  useCases: {
    title: string;
    cases: { title: string; description: string }[];
  };
  whatWeDeliver: {
    title: string;
    items: string[];
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

const SolutionPageLayout = ({ data }: { data: SolutionPageData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openPopup } = useContactPopup();

  return (
    <>
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        path={`/${data.slug}`}
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'פתרונות', path: '/solutions' },
        { name: data.hero.headline, path: `/${data.slug}` },
      ]} />
      <FAQSchema items={data.faq.items} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="min-h-[50vh] flex items-center relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background py-20 md:py-28">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <Breadcrumbs items={[
                { label: 'בית', href: '/' },
                { label: 'פתרונות', href: '/solutions' },
                { label: data.hero.headline },
              ]} />
              <p className="text-sm font-medium text-primary mb-3">{data.hero.label}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{data.hero.headline}</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">{data.hero.subtext}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={openPopup} className="cta-gradient group">
                  שיחת אסטרטגיה
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <Link to="/solutions" className="btn-outline">
                  כל הפתרונות
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <Section id="audience">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{data.whoIsItFor.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.whoIsItFor.audiences.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl info-card">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Problems it solves */}
        <Section id="problems" className="bg-muted/30">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{data.problems.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.problems.items.map((item, i) => (
                <div key={i} className="p-6 info-card rounded-xl">
                  <h3 className="text-lg font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Use cases */}
        <Section id="use-cases">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{data.useCases.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {data.useCases.cases.map((c, i) => (
                <div key={i} className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="font-mono text-sm font-bold text-primary">0{i + 1}</span>
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* What we deliver */}
        <Section id="deliverables" className="bg-muted/30">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">{data.whatWeDeliver.title}</h2>
            <div className="space-y-3">
              {data.whatWeDeliver.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 info-card rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Process */}
        <Section id="process">
          <div className="max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10 text-center">{data.process.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {data.process.steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{step.label}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" className="bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center">{data.faq.title}</h2>
            <div className="space-y-3">
              {data.faq.items.map((item, i) => (
                <div key={i} className={cn('bg-card rounded-xl border border-border overflow-hidden transition-all', openFaq === i && 'border-primary/30')}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-right">
                    <span className="text-base font-medium text-foreground">{item.question}</span>
                    <ChevronDown className={cn('w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300', openFaq === i && 'rotate-180')} />
                  </button>
                  <div className={cn('overflow-hidden transition-all duration-300', openFaq === i ? 'max-h-60' : 'max-h-0')}>
                    <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-b from-background to-primary-light/30">
          <div className="container text-center">
            <p className="text-sm font-medium text-primary mb-3">הצעד הבא</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">מוכנים להתחיל?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">שיחת אפיון ראשונית ללא עלות. נבין מה העסק צריך ונתאים פתרון מדויק.</p>
            <button onClick={openPopup} className="cta-gradient group">
              שיחת אסטרטגיה
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default SolutionPageLayout;
