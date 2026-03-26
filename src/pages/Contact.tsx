import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone must be under 30 characters")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(150, "Company name must be under 150 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be under 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const contactChannels = [
  {
    icon: Mail,
    label: "Email",
    value: "info@king-armour.com",
    href: "mailto:info@king-armour.com",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: "+852 2111 2222",
    href: "tel:+85221112222",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Hong Kong SAR",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 2 business days",
    href: undefined,
  },
];

const presenceLocations = [
  "Hong Kong",
  "Singapore",
  "Vietnam",
  "Cambodia",
  "Canada",
  "United Kingdom",
];

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    // No backend endpoint configured — show honest fallback
    // When a backend is available, replace this with actual submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("error");
  };

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  return (
    <Layout>
      <SEOHead
        title="Contact Us"
        description="Begin a confidential conversation with King Armour Family Office. Reach us by email, phone, or through our enquiry form."
      />
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-32 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="title-accent">
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                Contact Us
              </h1>
              <p className="text-primary-foreground/65 font-sans text-lg md:text-xl max-w-2xl">
                Begin a confidential conversation about what matters most to
                your family.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form — 3 cols */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground font-sans mb-8">
                  All enquiries are treated with the strictest confidence.
                </p>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-accent/10 rounded-lg p-8 text-center"
                  >
                    <CheckCircle className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">
                      Message Received
                    </h3>
                    <p className="text-muted-foreground font-sans mb-6">
                      Thank you for reaching out. A member of our team will
                      respond within two business days.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-accent font-sans text-sm font-medium tracking-wider hover:text-accent/80 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 rounded-lg p-8"
                  >
                    <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-4" />
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2 text-center">
                      Unable to Send Message
                    </h3>
                    <p className="text-muted-foreground font-sans mb-6 text-center max-w-md mx-auto">
                      Our online form is not yet connected to a delivery
                      service. Please contact us directly using one of the
                      methods below.
                    </p>
                    <div className="flex flex-col items-center gap-3 mb-6">
                      <a
                        href="mailto:info@king-armour.com"
                        className="inline-flex items-center gap-2 text-accent font-sans text-sm font-medium tracking-wider hover:text-accent/80 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        info@king-armour.com
                      </a>
                      <a
                        href="tel:+85221112222"
                        className="inline-flex items-center gap-2 text-accent font-sans text-sm font-medium tracking-wider hover:text-accent/80 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        +852 2111 2222
                      </a>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={resetForm}
                        className="text-muted-foreground font-sans text-sm font-medium tracking-wider hover:text-foreground transition-colors"
                      >
                        ← Back to Form
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-sans text-sm font-medium text-foreground mb-1.5"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-destructive font-sans text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-sans text-sm font-medium text-foreground mb-1.5"
                      >
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={255}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-destructive font-sans text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone + Company row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-sans text-sm font-medium text-foreground mb-1.5"
                        >
                          Phone <span className="text-muted-foreground text-xs">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={30}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                          placeholder="+852 …"
                        />
                        {errors.phone && (
                          <p className="text-destructive font-sans text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block font-sans text-sm font-medium text-foreground mb-1.5"
                        >
                          Company / Family Office{" "}
                          <span className="text-muted-foreground text-xs">(optional)</span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          maxLength={150}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                          placeholder="Organisation name"
                        />
                        {errors.company && (
                          <p className="text-destructive font-sans text-xs mt-1">{errors.company}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-sans text-sm font-medium text-foreground mb-1.5"
                      >
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={2000}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow resize-y"
                        placeholder="How can we assist you?"
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message ? (
                          <p className="text-destructive font-sans text-xs">{errors.message}</p>
                        ) : (
                          <span />
                        )}
                        <span className="text-muted-foreground font-sans text-xs">
                          {formData.message.length}/2000
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3 bg-primary text-primary-foreground font-sans text-sm font-semibold tracking-wider rounded hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          SENDING…
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar — 2 cols */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15}>
                {/* Contact Channels */}
                <h3 className="font-sans text-lg font-semibold text-foreground mb-6">
                  Direct Contact
                </h3>
                <div className="space-y-5 mb-12">
                  {contactChannels.map((channel) => (
                    <div key={channel.label} className="flex items-start gap-3">
                      <channel.icon className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-sans text-xs text-muted-foreground tracking-wider uppercase mb-0.5">
                          {channel.label}
                        </p>
                        {channel.href ? (
                          <a
                            href={channel.href}
                            className="font-sans text-foreground text-sm hover:text-accent transition-colors"
                          >
                            {channel.value}
                          </a>
                        ) : (
                          <p className="font-sans text-foreground text-sm">
                            {channel.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Global Presence */}
                <h3 className="font-sans text-lg font-semibold text-foreground mb-4">
                  Global Presence
                </h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
                  Through the Sunwah Group network, King Armour maintains
                  operational relationships across key markets:
                </p>
                <div className="flex flex-wrap gap-2 mb-12">
                  {presenceLocations.map((loc) => (
                    <span
                      key={loc}
                      className="inline-block bg-accent/10 text-foreground font-sans text-xs font-medium tracking-wider px-3 py-1.5 rounded"
                    >
                      {loc}
                    </span>
                  ))}
                </div>

                {/* Trust Note */}
                <div className="bg-primary rounded-lg p-6">
                  <h4 className="font-sans text-sm font-semibold text-primary-foreground mb-2 tracking-wider">
                    CONFIDENTIALITY
                  </h4>
                  <p className="font-sans text-primary-foreground/70 text-sm leading-relaxed">
                    All enquiries are handled with absolute discretion. We do
                    not share your information with third parties. Read our{" "}
                    <Link
                      to="/privacy"
                      className="text-accent hover:text-accent/80 transition-colors underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
