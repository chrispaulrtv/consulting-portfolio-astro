import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    document.documentElement.classList.toggle("dark");
    setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full cursor-pointer"
    >
      {/* icon crossfades + rotates instead of teleporting */}
      <span className="relative block h-5 w-5">
        <AnimatePresence initial={false}>
          <motion.span
            key={theme}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, rotate: -70, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.7 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
