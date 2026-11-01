import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import { useIsDark, useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import StationScene, {
  type StationHotspotId,
} from "./three/StationScene";
import StationPanel from "./StationPanel";
import MotionProvider from "./MotionProvider";
import { LinkedinIcon } from "./ui/brand-icons";

export default function HeroSection({ locale = "es" }: { locale?: Locale }) {
  const t = content[locale];
  const info = t.personalInfo;
  const lines = t.ui.agentLines;

  const [active, setActive] = useState<StationHotspotId | null>(null);
  const [agentMessage, setAgentMessage] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const timeoutRef = useRef<number | undefined>(undefined);

  const isDark = useIsDark();
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const say = useCallback((line: string, ms = 4200) => {
    window.clearTimeout(timeoutRef.current);
    setAgentMessage(line);
    timeoutRef.current = window.setTimeout(() => setAgentMessage(null), ms);
  }, []);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleSelect = useCallback(
    (id: StationHotspotId | null) => {
      setActive(id);
      setHintVisible(false);
      if (id) say(lines[id]);
      else setAgentMessage(null);
    },
    [say, lines]
  );

  return (
    <MotionProvider>
    <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-10 md:px-8 md:pb-16 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12">
        {/* ——— Copy column ——— */}
        <motion.div
          initial={{ opacity: 0, transform: "translateY(18px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {t.ui.hero.available}
          </motion.p>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            {info.name}
          </h1>
          <p className="mt-2 font-display text-lg font-medium text-muted-foreground md:text-xl">
            {info.role}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-accent" />
              {info.location}
            </span>
          </div>

          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
            {info.heroDescription}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.a
              href={`mailto:${info.email}`}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform duration-150 ease-out hover:-translate-y-0.5"
            >
              <Mail size={15} />
              {t.ui.hero.ctaPrimary}
            </motion.a>
            <motion.a
              href={info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              <LinkedinIcon size={15} />
              LinkedIn
            </motion.a>
          </div>
        </motion.div>

        {/* ——— 3D station viewport ——— */}
        <motion.div
          initial={{ opacity: 0, transform: "scale(0.97)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/70 bg-surface/50 shadow-[0_24px_70px_-32px_color-mix(in_oklab,var(--accent)_40%,transparent)] md:aspect-[5/4]"
        >
          <StationScene
            active={active}
            onSelect={handleSelect}
            isDark={isDark}
            reduced={reduced}
            isMobile={isMobile}
            agentMessage={agentMessage}
            onAgentClick={() => say(lines.idle, 3800)}
            locale={locale}
          />

          {/* hint bar */}
          <AnimatePresence>
            {hintVisible && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: reduced ? 0 : 1.6, duration: 0.4 } }}
                exit={{ opacity: 0, y: 8, transition: { duration: 0.22, ease: "easeIn" } }}
                className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
                  <Sparkles size={11} className="text-accent" />
                  {t.ui.hero.hint}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* hotspot panel */}
          <AnimatePresence mode="wait">
            <StationPanel
              active={active}
              onClose={() => handleSelect(null)}
              locale={locale}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
    </MotionProvider>
  );
}
