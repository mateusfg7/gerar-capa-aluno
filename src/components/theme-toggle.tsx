"use client";

import * as React from "react";
import { Moon, Sun, Computer, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  function handleSetTheme() {
    if (!theme) {
      setTheme("system");
    } else if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  }

  return (
    <Button
      title="Mudar tema de cores"
      variant="ghost"
      size="icon"
      onClick={handleSetTheme}
    >
      <Sun
        data-active={theme === "light"}
        className="h-[1.2rem] w-[1.2rem] hidden data-[active='true']:block"
      />
      <Moon
        data-active={theme === "dark"}
        className="h-[1.2rem] w-[1.2rem] hidden data-[active='true']:block"
      />
      <Monitor
        data-active={theme === "system" || !theme}
        className="h-[1.2rem] w-[1.2rem] hidden data-[active='true']:block"
      />

      <span className="sr-only">Mudar thema</span>
    </Button>
  );
}
