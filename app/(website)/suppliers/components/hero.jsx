"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
// Note: You might want a different background image for contractors
import HeroBg from "@/public/supplier-warehouse.jpg"; 
import Link from "next/link";
import { usePathname } from 'next/navigation'; // Import usePathname

// --- Hero Data Configuration ---
const heroContent = {
  supplier: {
    titleTag: "Suppliers",
    h1: <>Reach More Contractors. <br className="hidden md:block" /> Grow Your Business.</>,
    p: "Showcase your products, manage branches, and sell directly to vetted contractors—all from one powerful platform.",
    buttonText: "Start Supplying Today",
    boxTitle: "Join as a Supplier Today!",
    boxP: "Secure your exclusive spot and gain instant access to active contractors by filling out our quick questionnaire to begin the registration process.",
    boxLinkText: "Complete the Questionnaire",
    ctaLink: "/supplier-google-form-link" // Update with your actual form link
  },
  contractor: {
    titleTag: "Contractors",
    h1: <>Find Any Material, Instantly.</>,
    p: "Access a centralized network of trusted suppliers. Compare pricing, generate instant invoices, and manage orders for all your job sites.",
    buttonText: "Find Materials Now",
    boxTitle: "Ready to Start Building?",
    boxP: "Create your free account today to browse the largest local inventory, compare quotes, and streamline your material procurement process.",
    boxLinkText: "Register for Free",
    ctaLink: "/contractor-registration-link" // Update with your contractor registration link
  }
};

export default function HeroSection() {
  const pathname = usePathname();
  
  // Determine if the user is a supplier or contractor based on the URL path
  const isSupplierPage = pathname.includes('/suppliers');
  const isContractorPage = pathname.includes('/contractors');
  
  // Select content based on the path. Default to supplier if path doesn't match a known type.
  const context = isContractorPage ? 'contractor' : 'supplier';
  const content = heroContent[context];
  
  // Optional: You could conditionally change the background image source here
  // const backgroundImage = isContractorPage ? ContractorHeroBg : SupplierHeroBg;

  return (
    <section className="relative pt-20 w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HeroBg} // Consider using a conditional image source here
          alt="Construction materials background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/90" />
      </div>

      {/* Content */}
      <section className="container text-white">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          <div className="flex-1">
            
            {/* H1 Title Tag (e.g., Suppliers or Contractors) */}
            <h1 className="text-4xl font-bold text-gray-100 mb-4 border-b-4 border-primary inline-block">
              {content.titleTag}
            </h1>
            
            {/* Main Dynamic Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {content.h1}
            </h1>
            
            {/* Dynamic Paragraph */}
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              {content.p}
            </p>
            
            {/* Primary CTA Button */}
            <Link href={content.ctaLink}>
              <Button size="lg" className="bg-primary text-white font-semibold px-8 py-6 text-lg">
                {content.buttonText}
              </Button>
            </Link>
          </div>
          
          {/* Right Side Box Content (Lead Capture/CTA Box) */}
          <div className="lg:max-w-1/3 bg-primary rounded-lg text-gray-200 p-8">
            <h1 className="text-xl md:text-3xl font-bold mb-4">{content.boxTitle}</h1>
            <p className="md:text-lg">{content.boxP}</p>
            
            {/* Secondary CTA Link */}
            <Link href={content.ctaLink} className="bg-gray-200 block w-fit mt-8 font-semibold text-primary py-3 px-6 rounded">
              {content.boxLinkText}
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}