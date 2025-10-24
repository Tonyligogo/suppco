"use client"

import { Menu} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 h-18 z-50 w-full bg-gray-900 text-gray-300">
      <div className="px-4 xl:mx-auto xl:max-w-[80vw]">
        <div className="flex items-center justify-between py-3">
          {/* Left side (logo) */}
          <a href="/" className="flex items-center gap-1">
            <span className="text-3xl text-white font-semibold">Suppco</span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-6">
            <li>
              <a href="/suppliers" className="hover:text-white">
                Suppliers
              </a>
            </li>
            <li>
              <a href="/contractors" className="hover:text-white">
                Contractors
              </a>
            </li>
          </ul>

              <Link href="/login" className="hidden lg:block hover:text-white">
                Login
              </Link>

          {/* Mobile Menu (hamburger) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6 text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="px-4">
                <SheetTitle className='sr-only'>Sidebar</SheetTitle>
                <div className="flex flex-col gap-6 mt-8 text-lg">
                <a href="/">
                  <span className="text-3xl text-gray-900 font-semibold">Suppco</span>
                </a>
                  <a href="/suppliers">Suppliers</a>
                  <a href="/contractors">Contractors</a>
                  <a href="/login">Login</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
