import React from 'react'
import HeroSection from '../suppliers/components/hero'
import Features from '../suppliers/components/Features'
import HowItWorks from '../components/HowItWorks'
import Link from 'next/link'
import FAQSection from '../components/Faq'
// these components are mostly shared those in suppliers components which have been made dynamic
const Contractors = () => {
  return (
    <div>
      <HeroSection/>
      <Features/>
      <HowItWorks/>
      {/* CTA */}
      <div className="container py-16 px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Ready to buy?
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Our entire suite of features comes standard and it&apos;s free to get started.
        </p>
        <Link href='#' className="bg-primary text-white block w-fit mx-auto font-semibold px-8 py-3 rounded-md text-lg">
            Join us now!
          </Link>
          <div className="mt-2 text-center flex justify-center items-center gap-1">
            <span>Not a contractor?</span>
            <Link href='/suppliers' className="underline">Suppliers</Link>
          </div>
        </div>
        {/* end of CTA */}
        <FAQSection/>
    </div>
  )
}

export default Contractors