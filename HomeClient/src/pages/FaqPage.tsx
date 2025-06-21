import { FadeIn } from "@/components/templates/animated/FadeMotion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqList from "@/data/faqData.json";
import { CreditCard, Search, Settings, UserPlus } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-7 h-7" />,
    title: "Create a Free Account",
    desc: "Sign up instantly and access all digital products and AI features.",
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: "Explore & Choose Products",
    desc: "Browse by category, price, popularity, and AI compatibility.",
  },
  {
    icon: <Settings className="w-7 h-7" />,
    title: "Customize Platform Details",
    desc: "Enter your website or AI agent name, branding, and preferences before checkout.",
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    title: "One-Time Payment, Lifetime Access",
    desc: "Pay securely and get full access with official licenses.",
  },
  {
    icon: <Settings className="w-7 h-7" />,
    title: "Use & Get Support",
    desc: "Enjoy instant downloads, lifetime updates, and expert assistance.",
  },
];


export default function FaqPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-white to-indigo-50 dark:from-gray-950 dark:to-gray-900 py-24 px-res-xxl">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Here’s everything you need to know about Lumino’s platform.
        </p>
      </div>

      <section className="py-10">
        <div className="w-full">
          <FadeIn>
            <h1 className="text-2xl font-bold text-secondary">
              How Lumino Works
            </h1>
            <p className="text-muted-foreground">
              Just four simple steps to build and deploy your digital solution fast and securely.
            </p>
          </FadeIn>
          <hr className="my-4" />
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <FadeIn delay={idx * 0.2} direction="center" key={idx} className="flex flex-col items-center text-center">
                <div className="text-primary mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqList.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl">
            <AccordionTrigger className="text-left px-5 py-4 text-lg font-medium text-gray-900 dark:text-white">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 text-gray-700 dark:text-gray-300 text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </article>
  );
}