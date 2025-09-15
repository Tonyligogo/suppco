"use client"

import Image from "next/image"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "@/public/logo.png" // update with your actual logo path

export default function Navbar() {
  return (
    <nav className="fixed top-0 h-18 z-50 w-full border-b bg-white">
      <div className="px-4 xl:mx-auto xl:max-w-[80vw]">
        <div className="flex items-center justify-between py-3">
          {/* Left side (logo) */}
          <a href="/" className="flex items-center gap-1">
            <Image
              src={Logo}
              alt="Suppco logo"
              width={130}
              height={50}
              className="object-cover"
            />
            <span className="text-3xl font-semibold">Suppco</span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-6 text-lg">
            <li>
              <a href="#supplier" className="hover:text-gray-600">
                Be a supplier
              </a>
            </li>
            <li>
              <a href="#contractor" className="hover:text-gray-600">
                Be a contractor
              </a>
            </li>
            <li>
              <a href="#benefits" className="hover:text-gray-600">
                Benefits
              </a>
            </li>
          </ul>

          {/* Right side (desktop) */}
          <ul className="hidden lg:flex items-center gap-6 text-lg">
            <li>
              <Button>Get started</Button>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <span className="font-semibold">0710507872</span>
            </li>
            <li>
              <a href="#login" className="hover:text-gray-600">
                Login
              </a>
            </li>
          </ul>

          {/* Mobile Menu (hamburger) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="px-4">
                <SheetTitle className='sr-only'>Sidebar</SheetTitle>
                <div className="flex flex-col gap-6 mt-8 text-lg">
                  <a href="#supplier">Be a supplier</a>
                  <a href="#contractor">Be a contractor</a>
                  <a href="#benefits">Benefits</a>
                  <a href="#login">Login</a>
                  <Button className="w-full">Get started</Button>
                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span className="font-semibold">0710507872</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
