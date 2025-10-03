"use client";

import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { contactInfo, navItems } from "@/lib/contact";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const GlobalNavbar = () => {
  return (
    <ResizableNavbar>
      <NavBody>
        <div className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-foreground">
          <div className="size-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
          <span className="font-medium">{contactInfo.name}</span>
        </div>
        <NavItems items={navItems} />
        <AnimatedThemeToggler
          className="ml-4 p-1 hover:cursor-pointer rounded-full bg-muted dark:bg-muted hover:bg-muted/80 dark:hover:bg-muted/60 transition-colors"
          aria-label="Toggle theme"
        />
      </NavBody>
    </ResizableNavbar>
  );
};

export default GlobalNavbar;
