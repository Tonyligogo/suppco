import React from 'react'
import HowItWorksSuppliers from './components/HowItWorks'
import SupplierFaq from './components/Faq'
import SupplierCTA from './components/CTA'
import HeroSection from './components/hero'
import Features from './components/Features'

const Suppliers = () => {
  return (
    <div>
        <HeroSection/>
        <Features/>
        <HowItWorksSuppliers/>
        <SupplierCTA/>
        <SupplierFaq/>
    </div>
  )
}

export default Suppliers