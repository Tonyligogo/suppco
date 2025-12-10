'use client';

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CircleQuestionMark,
  Menu,
  Settings,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { getMenuItems } from "@/lib/SidebarMenus";
import SidebarSkeleton from "./SidebarSkeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import NavUser from "./NavUser";

const Sidebar = () => {
  const pathname = usePathname();
  const { userId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const tenant = pathname.split("/")[2];
  const isMobile = useIsMobile();

  useEffect(() => {
    const items = getMenuItems(tenant);
    setMenuItems(items);
    setLoading(false);
  }, [tenant]);

  if (loading) {
    return <SidebarSkeleton itemCount={6} />;
  }

  const SidebarComponent = (
    <div className="bg-[#fefefe] flex-none border-r relative px-4 md:py-4 h-full w-[230px] flex flex-col justify-between gap-4 overflow-auto">
      <div>
        <span className="font-bold text-3xl">Suppco</span>
        <div className="mt-4">
          {/* <span className="text-muted-foreground text-sm">Main Menu</span> */}
          <nav className="w-full">
            <ul>
              {menuItems.map((item) => {
                const href = `/dashboard/${tenant}/${userId}${item.href}`;
                console.log("Generated href:", href);
                const newItem = {
                  ...item,
                  href,
                };
                return (
                  <SidebarItem
                    key={item.title}
                    item={newItem}
                    selected={pathname === href}
                  />
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <div>
        <ul>
          <SidebarItem
            key="settings"
            item={{
              title: "Settings",
              href: `/dashboard/${tenant}/${userId}/settings`,
              icon: Settings,
            }}
            selected={pathname.includes("/settings")}
          />
          <SidebarItem
            key="contact"
            item={{
              title: "Contact us",
              href: "/contact",
              icon: CircleQuestionMark,
            }}
            selected={pathname === "/contact"}
          />
        </ul>
        <NavUser isMobile={isMobile} tenant={tenant} userId={userId}/>
      </div>
    </div>
  );
  return (
    <div>
      <div className="md:hidden fixed">
        <Sheet>
          <SheetTrigger asChild className="absolute left-[90vw] top-3">
            <Button variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-fit h-full">
            <SheetHeader className="p-0 px-2">
              <SheetTitle className="sr-only">Menu</SheetTitle>
            </SheetHeader>
            {SidebarComponent}
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block h-full">{SidebarComponent}</div>
    </div>
  );
};

export default Sidebar;
