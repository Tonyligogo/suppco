import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CallToAction1 from './components/CallToAction1'
import Suppliers from './components/Suppliers'
import Contractors from './components/Contractors'
import FAQSection from './components/Faq'
import Footer from './components/Footer'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'

const LandingPage = () => {
  return (
    <main className='relative overflow-x-hidden'>
      <div>
        <Navbar/>
      </div>
      <Hero/>
      <CallToAction1/>
      <Suppliers/>
      <Contractors/>
      <HowItWorks/>
      <Testimonials/>
      <FAQSection/>
      <Footer/>
    </main>
  )
}

export default LandingPage