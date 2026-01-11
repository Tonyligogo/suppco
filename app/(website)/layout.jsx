import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const WebsiteLayout = ({children}) => {
  return (
    <div className='relative overflow-x-hidden'>
        <Navbar/>
        <div>
        {children}  
        </div>
        <Footer/>
    </div>
  )
}

export default WebsiteLayout