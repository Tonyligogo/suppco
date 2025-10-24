import { ChevronRight, HardHat, Headset, ToolCase } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CallToAction1 = () => {
  return (
    <section className='container'>
        <div className='max-w-3xl mx-auto text-center mb-10 lg:mb-20'>
            <p className='font-semibold lg:text-lg'>One Platform for Supply Chain</p>
            <p className='text-3xl lg:text-5xl font-bold my-6 leading-snug'>The Leading Digital Construction Supply Chain Network.</p>
            <p className='lg:text-lg'>Empowering construction companies and contractors with streamlined procurement, and end-to-end supply chain visibility—everything you need in one place.</p>
        </div>
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10'>
            <div className='flex flex-col justify-between text-center gap-6 border rounded-xl p-6'>
                <div>
                    <span className="size-16 lg:size-20 bg-primary rounded-full grid place-content-center mx-auto text-white mb-4"> <ToolCase className='size-8 lg:size-10' /> </span>
                    <p className='text-xl lg:text-2xl font-semibold mb-4' >Suppliers</p>
                    <p>Showcase your materials and assets to thousands of contactors in minutes.</p>
                </div>
                <Link href='/suppliers' className='py-2 bg-primary text-white rounded-md flex items-center justify-center lg:text-lg font-normal gap-3 '>Read more <ChevronRight size={24} color='#fff' /> </Link>
            </div>
            <div className='flex flex-col justify-between text-center gap-6 border rounded-xl p-6'>
                <div>
                <span className="size-16 lg:size-20 bg-primary rounded-full grid place-content-center mx-auto text-white mb-4"> <HardHat className='size-8 lg:size-10' /> </span>
                    <p className='text-xl lg:text-2xl font-semibold mb-4' >Contractors</p>
                    <p>Get your building materials from verified supppliers, from anywhere you are.</p>
                </div>
                <Link href='/contractors' className='py-2 bg-primary text-white rounded-md flex items-center justify-center lg:text-lg font-normal gap-3 '>Read more <ChevronRight size={24} color='#fff' /> </Link>
            </div>
            <div className='flex flex-col justify-between text-center gap-6 border rounded-xl p-6'>
                <div>
                <span className="size-16 lg:size-20 bg-primary rounded-full grid place-content-center mx-auto text-white mb-4"> <Headset className='size-8 lg:size-10' /> </span>
                    <p className='text-xl lg:text-2xl font-semibold mb-4' >Talk to Us</p>
                    <p>Our support team is available to help you with anything you need, 24/7.</p>
                </div>
                <Link href='#' className='py-2 bg-primary text-white rounded-md flex items-center justify-center lg:text-lg font-normal gap-3 '>Contact Us <ChevronRight size={24} color='#fff' /> </Link>
            </div>
        </div>
    </section>
  )
}

export default CallToAction1