import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead, BreadcrumbSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';
import { useContactPopup } from '@/contexts/ContactPopupContext';

export interface IndustryPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    label: string;
    headline: string;
    subtext: string;
  };
  painPoints: {
    title: string;
    items: { title: string; description: string }[];
  };
  systems: {
    title: string;
    items: { title: string; description: string }[];
  };
  howWeHelp: {
    title: string;
    points: string[];
  };
  relatedSolutions: {
    title: string;
    links: { label: string; href: string }[];
  };
}

const IndustryPageLayout = ({ data }: { data: IndustryPageData }) => {
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
        { name: 'תעשיות', path: '/industries' },
        { name: data.hero.headline, path: `/${data.slug}` },
      ]} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="min-h-[45vh] flex items-center relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background py-20 md:py-28">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <Breadcrumbs items={[
                { label: 'בית', href: '/' },
                { label: 'תעשיות', href: '/industries' },
                { label: data.hero.headline },
              ]} />
              <p className="text-sm font-medium text-primary mb-3">{data.hero.label}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{data.hero.headline}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">{data.hero.subtext}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={openPopup} className="cta-gradient group">
                  שיחת אסטרטגיה
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <Link to="/industries" className="btn-outline">
                  כל התעשיות
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pain points */}
        <Section id="pain-points">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">{data.painPoints.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.painPoints.items.map((item, i) => (
                <div key={i} className="p-6 info-card rounded-xl">
                  <h3 className="text-lg font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Systems we build */}
        <Section id="systems" className="bg-muted/30">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">{data.systems.title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.systems.items.map((item, i) => (
                <div key={i} className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="font-mono text-sm font-bold text-primary">0{i + 1}</span>
                  </div>
                  <h3 className="text-base font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* How we help */}
        <Section id="how-we-help">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">{data.howWeHelp.title}</h2>
            <div className="space-y-3">
              {data.howWeHelp.points.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-4 info-card rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Related solutions */}
        <Section id="related" className="bg-muted/30">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">{data.relatedSolutions.title}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.relatedSolutions.links.map((link, i) => (
                <Link key={i} to={link.href} className="group p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 text-center">
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">{link.label}</span>
                  <ArrowLeft className="w-4 h-4 mx-auto mt-2 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-background to-primary-light/30">
          <div className="container text-center">
            <p className="text-sm font-medium text-primary mb-3">הצעד הבא</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">מוכנים לבנות מערכת שעובדת בשבילכם?</h2>
            <p className="text-lg text-muted-foreground mb-8">שיחת אפיון ללא עלות – נבין מה העסק צריך ונתחיל לבנות.</p>
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

export default IndustryPageLayout;
