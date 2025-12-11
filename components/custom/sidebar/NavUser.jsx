"use client";
import { useUserInfo } from "@/hooks/(user)/useUserManagement"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { SignOut } from "../signout-button";
import { useSession } from "next-auth/react";

const NavUser = ({isMobile, tenant, userId}) => { 
  const { data: session, status } = useSession();
  const user = session?.user;
  if(!user && status !== 'loading'){
    return null;
  }
       return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className=" bg-muted w-full hover:bg-muted hover:cursor-pointer"
            >
              <div className="text-sm">
                <span className="truncate font-medium text-black">
                  {user?.email}
                </span>
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
                  <span className="truncate font-medium">{user?.username}</span>
                  <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/${tenant}/${userId}/settings/account`}
                  className="flex gap-2 items-center"
                >
                  <CircleUser color="black" />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default NavUser