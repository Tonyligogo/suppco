import { ArrowLeft, UserRound } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Avatar from '@/public/avatar.jpg'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const Account = () => {
  return (
    <div className='h-[100svh] flex flex-col justify-between'>
        <div>
            <div className='flex items-center justify-between'>
                <button className='bg-white'>
                <ArrowLeft />
                </button>
                <h1 className='text-2xl font-semibold'>Account</h1>
                <p></p>
            </div>
            <div className='rounded-full overflow-hidden w-fit mx-auto mt-8'>
                <Image src={Avatar} alt='avatar' width={150} height={150} />
            </div>
            <div className='mt-2 mb-5'>
                <p className='text-lg font-semibold text-center'>Your name here</p>
                <p className='text-muted-foreground text-center'>email@gmail.com</p>
            </div>
            <Separator/>
            <div>
                <CustomContainer label='Full name' value='Anthony Ligogo' />
                    <CustomContainer label='Email' value='ligogo@gmail.com' />
                    <CustomContainer label='Phone number' value='0710507872' />
                <div className='flex gap-4'>
                    <CustomContainer label='Gender' value='Male' />
                    <CustomContainer label='Birthday' value='05-01-2001' />
                </div>
            </div>
        </div>
        <Button className='w-full mt-10'>Save</Button>
    </div>
  )
}

export default Account

const CustomContainer = ({label, value}) => {
    return (
        <div className='border px-4 py-2 rounded-xl mt-5 w-full'>
            <p className='text-muted-foreground text-sm'>{label}</p>
            <p>{value}</p>
        </div>
    )
}