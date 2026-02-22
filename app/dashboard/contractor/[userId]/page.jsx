'use client'
import { useAuth } from '@/providers/AuthContextProvider'
import React from 'react'

const Contractor = () => {
  const {authData} = useAuth()
  console.log('My auth data', authData)
  return (
    <div>Contractor</div>
  )
}

export default Contractor