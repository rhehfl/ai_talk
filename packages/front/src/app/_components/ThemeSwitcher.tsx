"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Toggle Dark Mode"
      >
        {theme === "dark" ? (
          <FiSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FiMoon className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </div>
  );
}
