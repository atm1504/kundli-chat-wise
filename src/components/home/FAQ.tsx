import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is the Kundli generation really free?</AccordionTrigger>
            <AccordionContent>
              Yes. Generating your Kundli and initial insights is free. Only follow‑up AI chat messages use daily credits.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do daily credits work?</AccordionTrigger>
            <AccordionContent>
              You receive 10 free credits every day. Each AI chat question uses 1 credit. Credits refresh daily.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data private?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Your data is stored securely and is never shared. You can delete your history anytime.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
