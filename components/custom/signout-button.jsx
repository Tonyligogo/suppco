'use client';
import { signOutUser } from "@/actions/authActions";

export function SignOut() {
  return (
    <button className='cursor-pointer' onClick={async () => signOutUser()}>Sign out</button>
  )
}