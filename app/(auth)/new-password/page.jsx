'use client';

import { passwordReset, requestPasswordReset } from '@/app/api/auth/accounts';
import LoadingComponent from '@/components/custom/loading-component';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const NewPassword = () => {
    const [password,setPassword] = useState('');
    const [code,setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {code, password}
            await passwordReset(data);
            toast.success('Password reset successfully.')
            router.replace('/login')
        } catch (error) {
            toast.error('Failed to reset password. Please try again!')
        } finally{
            setLoading(false);
        }
    }
    return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center ">
          <a href="/" className="font-bold text-3xl">
            Suppco
          </a>
          <p className="mt-3 text-xl font-semibold text-muted-foreground">
            Set up a new password
          </p>
          <p className="text-muted-foreground">Please check your email for a password reset code</p>
        </div>
        <div className="border rounded-lg p-6">
          <form className='space-y-4'>
          <div className="space-y-2">
              <Label htmlFor="code" className="font-normal text-lg">
                Code
              </Label>
              <Input id="code" type="tel" placeholder="Enter reset code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-normal text-lg">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>

<Button
            type="submit"
            className="bg-primary/80 hover:bg-primary cursor-pointer w-full rounded-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
                      <>
                        <LoadingComponent/>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
          </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
              <Link
                href="/forgot-password"
                className="font-medium text-primary hover:underline"
              >
                Back
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPassword