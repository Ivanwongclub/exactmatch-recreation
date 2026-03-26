import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

const PlaceholderPage = ({ title, subtitle }: PlaceholderPageProps) => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-32 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="border-l-4 border-accent pl-6">
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-primary-foreground/65 font-sans text-lg md:text-xl">
                  {subtitle}
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="max-w-2xl">
              <p className="text-foreground/70 font-sans text-lg leading-relaxed mb-8">
                This page is currently being prepared. Please check back soon or
                contact us for more information.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-7 py-3 bg-primary text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-primary/90 transition-colors"
                >
                  BACK TO HOME
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-7 py-3 border border-foreground/20 text-foreground font-sans text-sm font-semibold tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default PlaceholderPage;
