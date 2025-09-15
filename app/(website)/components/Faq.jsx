import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function FAQSection() {
  return (
    <section className="w-full py-10 lg:py-20 bg-gray-50">
      <div className="container max-w-6xl my-0 flex flex-col md:flex-row gap-12 px-9">
        
        {/* Left Side Content */}
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="mb-6 lg:text-lg">
            We&apos;ve answered some of the most common questions suppliers and contractors ask about our platform.  
            Can&apos;t find what you&apos;re looking for? Reach out to our team anytime.
          </p>
          <Button>Contact Support</Button>
        </div>

        {/* Right Side Accordions */}
        <div className="flex-1 2xl:flex-2">
        <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base lg:text-lg font-semibold">How do suppliers list their products?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Suppliers can create an account, set up their branches, and upload products directly from their dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base lg:text-lg font-semibold">Can contractors buy from multiple suppliers?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Yes! Contractors can browse and purchase from any listed supplier, compare pricing, and manage orders in one place.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base lg:text-lg font-semibold">Is there a fee to join the platform?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Signing up is free for both suppliers and contractors. We only charge a small transaction fee on completed orders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base lg:text-lg font-semibold">How are deliveries handled?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Suppliers manage deliveries from their branches. Contractors can track status and expected delivery time inside the app.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base lg:text-lg font-semibold">Can suppliers manage employees?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Yes. Suppliers can invite employees, assign them roles, and manage multiple branches efficiently.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-base lg:text-lg font-semibold">Can contractors manage multiple sites?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Absolutely. Contractors can set up different sites, invite subcontractors, and manage materials for each project separately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-base lg:text-lg font-semibold">Is payment secure on the platform?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Yes, all payments are processed through secure, encrypted gateways to protect your financial data.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
