"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button>
      <SunIcon onClick={toggleTheme} className="hidden dark:block" />
      <MoonIcon onClick={toggleTheme} className="block dark:hidden" />
    </button>
  );
};

export default ToggleTheme;
