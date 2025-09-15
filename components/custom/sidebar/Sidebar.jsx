'use client';

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CircleQuestionMark, CircleUser, EllipsisVertical, Home, LogOut, Menu, Settings, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Logo from '@/public/logo.png'
import { usePathname, useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';
import SidebarItem from './SidebarItem';
import { getMenuItems } from '@/lib/SidebarMenus';
import SidebarSkeleton from './SidebarSkeleton';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
      const items = getMenuItems('supplier');
      setMenuItems(items);
      setLoading(false);
  }, []);

  if (loading) {
    return <SidebarSkeleton itemCount={6} />;
  }
  // if(!loading && !menuItems.length > 0){
  //   return router.replace('/login')
  // }

    const SidebarComponent = (
        <div className='bg-[#fefefe] flex-none border-r relative px-4 md:py-4 h-full w-[250px] flex flex-col justify-between gap-4 overflow-auto'>
          <div>
                  <div className='flex gap-2 items-center'>
                  <Image src={Logo} alt='Suppco' width={100} height={50} />
                    <span className='font-semibold text-2xl'>Suppco</span>
                  </div>
                  <div className='mt-4'>
                    <span className='text-muted-foreground text-sm'>Main Menu</span>
                    <nav className="w-full">
        <ul>
          {menuItems.map((item)=>(
            <SidebarItem
            key={item.title}
            item={item}
            selected={pathname === item.href}
            />
          ))}
        </ul>
      </nav>
                  </div>
          </div>
          <div>
            <ul>
          <SidebarItem
            key='settings'
            item={{
              title:'Settings',
              href:'/settings',
              icon: Settings
            }}
            selected={pathname === '/settings'}
            />
          <SidebarItem
            key='contact'
            item={{
              title:'Contact us',
              href:'/contcat',
              icon: CircleQuestionMark
            }}
            selected={pathname === '/contact'}
            />
            </ul>
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className=" bg-muted w-full hover:bg-muted hover:cursor-pointer"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-black">Your name here</span>
                <span className="text-muted-foreground truncate text-xs">email@gmail.com</span>
              </div>
              <EllipsisVertical className="ml-auto size-4 text-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Your name here</span>
                  <span className="text-muted-foreground truncate text-xs">
                    email@gmail.com
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href='/supplier/account' className='flex gap-2 items-center' >
                  <CircleUser color='black' />
                    Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            <LogOut color='black' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        </div>
    )
  return (
    <div>
      <div className="md:hidden fixed">
      <Sheet>
        <SheetTrigger asChild className="absolute left-[90vw] top-3">
          <Button variant="ghost"><Menu/></Button>
        </SheetTrigger>
        <SheetContent side='left' className="p-0 w-fit h-full">
        <SheetHeader className='p-0 px-2'>
      <SheetTitle className="sr-only">Menu</SheetTitle>
    </SheetHeader>
          {SidebarComponent}
        </SheetContent>
      </Sheet>
      </div>
      <div className="hidden md:block h-full">
        {SidebarComponent}
      </div>
    </div>
  )
}

export default Sidebar