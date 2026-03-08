import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { BreadcrumbSchema } from '@/lib/seo';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const schemaItems = items.map((item) => ({
    name: item.label,
    path: item.href || '',
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronLeft className="w-3.5 h-3.5 flex-shrink-0" />}
              {item.href && i < items.length - 1 ? (
                <Link to={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
