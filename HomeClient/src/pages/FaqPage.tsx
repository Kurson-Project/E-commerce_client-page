import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqList from "@/data/faqData.json";

export default function FaqPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-indigo-50 dark:from-gray-950 dark:to-gray-900 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Here’s everything you need to know about Lumino’s platform.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
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
    </section>
  );
}