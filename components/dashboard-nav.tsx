"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Home,
  Menu,
  Clock,
  FilePlus,
  FileStack,
  ChevronDown,
  ChevronRight,
  Package,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { href: "/home", label: "Dashboard", icon: Home },
  { 
    label: "Talenta Timesheet", 
    icon: Clock,
    subItems: [
      { href: "/talenta-timesheet/summarize", label: "Summarize Timesheet" },
      { href: "/talenta-timesheet/generate-pdf", label: "Generate PDF Timesheets" },
      { href: "/talenta-timesheet/merge-pdf", label: "Merge PDF Timesheets" },
    ]
  },
  { 
    label: "Jira Timesheet", 
    icon: CheckSquare,
    subItems: [
      { href: "/jira-timesheet/generator", label: "Timesheets Report Generator" },
      { href: "/jira-timesheet/upload", label: "Timesheets Jira Upload" },
    ]
  },
  { href: "/pharmacy-delivery", label: "Auto Reconcile Pharmacy Delivery", icon: Package },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "Talenta Timesheet": true, // Open by default
    "Jira Timesheet": false,
  });

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900 text-white">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center justify-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold tracking-wider">FAITH</h1>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              
              if ('subItems' in item) {
                const isOpen = openMenus[item.label];
                const hasActiveChild = item.subItems?.some(sub => pathname === sub.href);
                
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={cn(
                        "w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors",
                        hasActiveChild
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      )}
                    >
                      <div className="flex items-center">
                        <Icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.subItems?.map((subItem) => {
                          const isActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "flex items-center px-2 py-2 text-sm rounded-md transition-colors",
                                isActive
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wider mx-auto">F.A.I.T.H</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-gray-900 text-white border-gray-800">
            <nav className="mt-8 flex flex-col space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                
                if ('subItems' in item) {
                  const isOpen = openMenus[item.label];
                  const hasActiveChild = item.subItems?.some(sub => pathname === sub.href);
                  
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors",
                          hasActiveChild
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        )}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </div>
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.subItems?.map((subItem) => {
                            const isActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={cn(
                                  "flex items-center px-2 py-2 text-sm rounded-md transition-colors",
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                )}
                              >
                                {subItem.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </header>
  );
}
