'use client';

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { User, Building2, MapPin, Menu, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const settingsSections = [
  {
    id: "account",
    label: "Account",
    icon: User,
  },
  {
    id: "company", 
    label: "Company",
    icon: Building2,
  },
  {
    id: "branches",
    label: "Branches",
    icon: MapPin,
  },
];

export const SettingsLayoutContext = React.createContext(null);

export function useSettingsLayout() {
  const context = React.useContext(SettingsLayoutContext);
  if (!context) {
    throw new Error("useSettingsLayout must be used within SettingsLayoutProvider");
  }
  return context;
}

export function SettingsLayout({ children }) {
  const [activeSection, setActiveSection] = useState("account");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const SidebarContent = () => (
    <>
        <div className="flex items-center gap-3 mt-1 mb-3 md:mb-6">
            <div className="bg-muted p-2 rounded-full">
                <Settings size={20}/>
            </div>
            <h3 className="font-semibold text-lg">Settings</h3>
        </div>
      <div className="space-y-1">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "primary" : "ghost"}
              className={cn(
                "w-full justify-start font-normal text-muted-foreground text-md cursor-pointer",
                activeSection === section.id && "bg-primary text-white"
              )}
              onClick={() => {
                setActiveSection(section.id);
                if (isMobile) setIsOpen(false);
              }}
            >
              <Icon className=" h-4 w-4" />
              {section.label}
            </Button>
          );
        })}
      </div>
    </>
  );

  return (
    <SettingsLayoutContext.Provider value={{ activeSection, setActiveSection }}>
      <div className="flex">
        {isMobile ? (
          <>
            {/* Mobile Sheet Sidebar */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <div className="w-[calc(100vw-36px)]">
                <div className="flex items-center gap-2 p-4 border-b">
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <h2 className="font-semibold text-lg">Settings</h2>
                </div>
                <div className="mt-2 md:mt-0 md:p-4 h-[88vh] overflow-y-auto">
                  {children}
                </div>
              </div>
              
              <SheetContent side="left" className="w-64 p-4 md:p-0">
                <SheetTitle className='sr-only'>Settings sidebar</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <>
            {/* Desktop Secondary Sidebar */}
            <div className="w-56 border-r pr-4">
              <SidebarContent />
            </div>

            {/* Desktop Main Content */}
            <div className="flex-1 p-4 overflow-auto">
              {children}
            </div>
          </>
        )}
      </div>
    </SettingsLayoutContext.Provider>
  );
}