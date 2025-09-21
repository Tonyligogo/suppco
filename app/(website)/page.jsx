import Hero from './components/Hero'
import CallToAction1 from './components/CallToAction1'
import Suppliers from './components/Suppliers'
import Contractors from './components/Contractors'
import FAQSection from './components/Faq'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'

const LandingPage = () => {
  return (
    <main className='relative overflow-x-hidden'>
      <Hero/>
      <CallToAction1/>
      <Suppliers/>
      <Contractors/>
      <HowItWorks/>
      <Testimonials/>
      <FAQSection/>
    </main>
  )
}

export default LandingPage