import ThemeToggle from "./ui/theme-toggle";
import { content, type Locale } from "@/lib/content";
import { useState } from "react";
import { Menu, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MotionProvider from "./MotionProvider";

export default function GlassHeader({ locale = "es" }: { locale?: Locale }) {
  const t = content[locale];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const otherLocale = locale === "es" ? "/en/" : "/";

  return (
    <MotionProvider>
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <motion.a href={locale === "es" ? "/" : "/en/"} className="font-display text-[15px] font-bold tracking-tight">
          {t.personalInfo.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-[13px] font-medium md:flex">
          {t.ui.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative text-foreground/75 transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${t.personalInfo.email}`}
            className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 hover:border-accent hover:text-accent md:inline-flex"
          >
            <Mail size={13} />
            {t.ui.contactBtn}
          </a>
          <a
            href={otherLocale}
            hrefLang={locale === "es" ? "en" : "es"}
            aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
            className="rounded-md border border-border px-2 py-1.5 font-display text-[12px] font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            {t.ui.langSwitch}
          </a>
          <ThemeToggle />
          <button
            className="p-2 text-foreground md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="border-t border-border/40 bg-background/95 px-5 py-4 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <nav className="flex flex-col gap-4 text-sm font-medium">
              {t.ui.nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="py-1"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </MotionProvider>
  );
}
