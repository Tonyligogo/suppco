'use client';
import { signOutUser } from "@/actions/authActions";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <button className='cursor-pointer flex items-center gap-2' onClick={async () => signOutUser()}><LogOut color="black" /> Sign out</button>
  )
}