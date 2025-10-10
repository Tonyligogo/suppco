"use client"; // REQUIRED to use the usePathname hook

import { usePathname } from 'next/navigation'; // Import the hook
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// --- FAQ DATA ---
// Categorize each question as 'supplier', 'contractor', or 'all'
const allFaqs = [
  // SUPPLIER-SPECIFIC QUESTIONS (Relevant to the /suppliers page)
  {
    value: "item-1",
    trigger: "How do suppliers list their products?",
    content: "Suppliers can create an account, set up their branches, and upload products directly from their dashboard.",
    category: "supplier"
  },
  {
    value: "item-4",
    trigger: "How are deliveries handled?",
    content: "Suppliers manage deliveries from their branches. Contractors can track status and expected delivery time inside the app.",
    category: "supplier"
  },
  {
    value: "item-5",
    trigger: "Can suppliers manage employees and branches?",
    content: "Yes. Suppliers can invite employees, assign them roles, and manage multiple branches efficiently from the dashboard.",
    category: "supplier"
  },
  {
    value: "item-8",
    trigger: "How do you ensure contractors placing orders are legitimate?",
    content: "We verify and vet all contractor accounts through a process that includes checking company registration and relevant trade licenses. This ensures you only deal with serious, qualified buyers.",
    category: "supplier"
  },

  {
    value: "item-10",
    trigger: "What if I need to update pricing or stock levels quickly?",
    content: "Our supplier dashboard provides a real-time, easy-to-use interface for instant inventory and pricing updates. This means you can react quickly to material scarcity or demand spikes.",
    category: "supplier"
  },
  
  // CONTRACTOR-SPECIFIC QUESTIONS (Relevant to a potential /contractors page)
  {
    value: "item-6",
    trigger: "Can contractors manage materials for multiple sites?",
    content: "Absolutely. Contractors can set up different sites, invite subcontractors, and manage materials for each project separately.",
    category: "contractor"
  },
  {
    value: "item-2",
    trigger: "Can contractors buy from multiple suppliers?",
    content: "Yes! Contractors can browse and purchase from any listed supplier, compare pricing, and manage orders in one place.",
    category: "contractor"
  },
  {
    value: "item-11",
    trigger: "At what point do I pay for the materials?",
    content: "Payment is securely held in **escrow** upon placing the order and is released to the supplier only *after* you confirm successful receipt and acceptance of the materials at your job site.",
    category: "contractor"
  },
  {
    value: "item-12",
    trigger: "Is delivery guaranteed if the supplier offers it?",
    content: "Yes. When a supplier confirms delivery, the transaction is protected by our platform policy. Failure to deliver the confirmed order will result in a **full refund** from the escrow account.",
    category: "contractor"
  },
  {
    value: "item-13",
    trigger: "What is the policy for damaged or substandard materials?",
    content: "Our platform offers a clear dispute resolution process. If materials are damaged or substandard upon delivery, you must report the issue immediately. We facilitate a **guaranteed refund or replacement** as long as the claim meets our policy criteria.",
    category: "contractor"
  },
  
  // GENERAL QUESTIONS (Relevant to all pages, especially the root / page)
  {
    value: "item-3",
    trigger: "Is there a fee to join the platform?",
    content: "Signing up is free for both suppliers and contractors. We only charge a small transaction fee on completed orders.",
    category: "all"
  },
  {
    value: "item-7",
    trigger: "Is payment secure on the platform?",
    content: "Yes, all payments are processed through secure, encrypted gateways to protect your financial data.",
    category: "all"
  },
  {
    value: "item-9",
    trigger: "When and how are the transaction fees charged?",
    content: "The transaction fee is automatically deducted from the contractor's total order value before the remaining balance is paid out to the supplier. There are no monthly subscription fees.",
    category: "all"
  },
];


export default function FAQSection() {
  const pathname = usePathname();

  // Determine the user's current context based on the URL path
  const getContext = (path) => {
    if (path.includes('/suppliers')) return 'supplier';
    if (path.includes('/contractors')) return 'contractor';
    return 'all'; // Default or root path
  };

  const context = getContext(pathname);
  
  // Filter the FAQs based on the determined context
  const filteredFaqs = allFaqs.filter(faq => {
    if (context === 'all') {
      return true; // Show all on the root path
    }
    // On /suppliers, show 'supplier' and 'all' categories
    if (context === 'supplier') {
      return faq.category === 'supplier' || faq.category === 'all';
    }
    // On /contractors, show 'contractor' and 'all' categories
    if (context === 'contractor') {
      return faq.category === 'contractor' || faq.category === 'all';
    }
    return false;
  });


  return (
    <section className="w-full py-10 lg:py-20 bg-gray-50">
      <div className="container my-0 flex flex-col md:flex-row md:justify-between gap-12 px-4 lg:px-9">
        
        {/* Left Side Content */}
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {/* Context-aware title */}
            {context === 'supplier' ? "Supplier FAQs" : 
             context === 'contractor' ? "Contractor FAQs" : 
             "Frequently Asked Questions"}
          </h2>
          <p className="mb-6 lg:text-lg">
            {context === 'supplier' ? 
             "Everything suppliers need to know about listing materials, payments, and managing orders." :
             context === 'contractor' ?
             "Key questions for contractors on ordering, tracking, and managing project sites." :
             "We've answered some of the most common questions about our platform."}
            Can't find what you're looking for? Reach out to our team anytime.
          </p>
          <Button size='lg' className='font-semibold text-lg'>Contact Support</Button>
        </div>

        {/* Right Side Accordions */}
        <div className="flex-1 ">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-2">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger className="text-base lg:text-lg font-semibold">{faq.trigger}</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600">
                    {faq.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-lg text-gray-700">No specific FAQs found for this section. Please check the general questions.</p>
          )}
        </div>
      </div>
    </section>
  );
}